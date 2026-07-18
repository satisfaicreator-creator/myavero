from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict
from datetime import datetime, timezone, timedelta
from pathlib import Path
import os
import logging
import uuid
import asyncio
import json
import copy

import bcrypt
import jwt as pyjwt
import resend

from seed_blog import BLOG_POSTS
from responder import match_reply

# ---------------- Setup ----------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ.get("JWT_SECRET", "change_me")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMIN_RECIPIENT_EMAIL = os.environ.get("ADMIN_RECIPIENT_EMAIL", "")
ADMIN_EMAIL_DEFAULT = os.environ.get("ADMIN_EMAIL", "")
ADMIN_PASSWORD_DEFAULT = os.environ.get("ADMIN_PASSWORD", "")

resend.api_key = RESEND_API_KEY

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("avero")


class InMemoryCollection:
    def __init__(self, name: str):
        self.name = name
        self._docs = []

    def _matches(self, doc: dict, query: Optional[dict] = None) -> bool:
        query = query or {}
        for key, expected in query.items():
            if isinstance(expected, dict):
                if "$ne" in expected:
                    if doc.get(key) == expected["$ne"]:
                        return False
                else:
                    return False
            elif doc.get(key) != expected:
                return False
        return True

    def _project(self, doc: dict, projection: Optional[dict] = None) -> dict:
        if not projection:
            return copy.deepcopy(doc)
        result = copy.deepcopy(doc)
        for key, include in projection.items():
            if key == "_id" and include == 0:
                result.pop("_id", None)
            elif include == 0 and key in result:
                result.pop(key, None)
        return result

    def find(self, query: Optional[dict] = None, projection: Optional[dict] = None):
        return InMemoryCursor(self._docs, query or {}, projection or {})

    async def find_one(self, query: Optional[dict] = None, projection: Optional[dict] = None):
        for doc in self._docs:
            if self._matches(doc, query):
                return self._project(doc, projection)
        return None

    async def insert_one(self, doc: dict):
        self._docs.append(copy.deepcopy(doc))
        return type("InsertResult", (), {"inserted_id": None})()

    async def update_one(self, query: Optional[dict] = None, update: Optional[dict] = None, upsert: bool = False):
        update = update or {}
        values = update.get("$set", {})
        matched = False
        for doc in self._docs:
            if self._matches(doc, query):
                matched = True
                for key, value in values.items():
                    doc[key] = copy.deepcopy(value)
                break
        if not matched and upsert:
            new_doc = copy.deepcopy(query or {})
            new_doc.update(values)
            self._docs.append(new_doc)
        return type("UpdateResult", (), {"matched_count": 1 if matched else 0, "modified_count": 1 if matched else 0})()

    async def delete_many(self, query: Optional[dict] = None):
        remaining = []
        deleted = 0
        for doc in self._docs:
            if self._matches(doc, query):
                deleted += 1
            else:
                remaining.append(doc)
        self._docs = remaining
        return deleted

    async def count_documents(self, query: Optional[dict] = None):
        return sum(1 for doc in self._docs if self._matches(doc, query))


class InMemoryCursor:
    def __init__(self, docs: list, query: Optional[dict] = None, projection: Optional[dict] = None):
        self._docs = docs
        self._query = query or {}
        self._projection = projection or {}
        self._sort_field = None
        self._sort_desc = False

    def sort(self, field: str, direction: int = -1):
        self._sort_field = field
        self._sort_desc = direction == -1
        return self

    async def to_list(self, limit: int = 1000):
        filtered = []
        for doc in self._docs:
            if self._matches(doc):
                filtered.append(self._project(doc))
        if self._sort_field:
            filtered.sort(key=lambda item: item.get(self._sort_field, ""), reverse=self._sort_desc)
        return filtered[:limit]

    def _matches(self, doc: dict) -> bool:
        query = self._query
        for key, expected in query.items():
            if isinstance(expected, dict):
                if "$ne" in expected:
                    if doc.get(key) == expected["$ne"]:
                        return False
                else:
                    return False
            elif doc.get(key) != expected:
                return False
        return True

    def _project(self, doc: dict) -> dict:
        if not self._projection:
            return copy.deepcopy(doc)
        result = copy.deepcopy(doc)
        for key, include in self._projection.items():
            if key == "_id" and include == 0:
                result.pop("_id", None)
            elif include == 0 and key in result:
                result.pop(key, None)
        return result


class SafeCollection:
    def __init__(self, real_collection, fallback_collection):
        self._real = real_collection
        self._fallback = fallback_collection

    async def find_one(self, query: Optional[dict] = None, projection: Optional[dict] = None):
        if self._real is None:
            return await self._fallback.find_one(query, projection)
        try:
            return await self._real.find_one(query, projection)
        except Exception as exc:
            logger.warning("MongoDB unavailable for %s, using in-memory fallback: %s", self._fallback.name, exc)
            return await self._fallback.find_one(query, projection)

    def find(self, query: Optional[dict] = None, projection: Optional[dict] = None):
        real_cursor = self._real.find(query, projection) if self._real is not None else None
        return SafeCursor(real_cursor, self._fallback.find(query, projection))

    async def insert_one(self, doc: dict):
        try:
            return await self._real.insert_one(doc)
        except Exception as exc:
            logger.warning("MongoDB unavailable for %s, using in-memory fallback: %s", self._fallback.name, exc)
            return await self._fallback.insert_one(doc)

    async def update_one(self, query: Optional[dict] = None, update: Optional[dict] = None, upsert: bool = False):
        try:
            return await self._real.update_one(query, update, upsert=upsert)
        except Exception as exc:
            logger.warning("MongoDB unavailable for %s, using in-memory fallback: %s", self._fallback.name, exc)
            return await self._fallback.update_one(query, update, upsert=upsert)

    async def delete_many(self, query: Optional[dict] = None):
        try:
            return await self._real.delete_many(query)
        except Exception as exc:
            logger.warning("MongoDB unavailable for %s, using in-memory fallback: %s", self._fallback.name, exc)
            return await self._fallback.delete_many(query)

    async def count_documents(self, query: Optional[dict] = None):
        try:
            return await self._real.count_documents(query)
        except Exception as exc:
            logger.warning("MongoDB unavailable for %s, using in-memory fallback: %s", self._fallback.name, exc)
            return await self._fallback.count_documents(query)


class SafeCursor:
    def __init__(self, real_cursor, fallback_cursor):
        self._real = real_cursor
        self._fallback = fallback_cursor

    def sort(self, field: str, direction: int = -1):
        try:
            self._real.sort(field, direction)
        except Exception:
            self._fallback.sort(field, direction)
        return self

    async def to_list(self, limit: int = 1000):
        try:
            return await self._real.to_list(limit)
        except Exception as exc:
            logger.warning("MongoDB cursor unavailable, using in-memory fallback: %s", exc)
            return await self._fallback.to_list(limit)


class SafeDatabase:
    def __init__(self, db_name: str):
        self._db_name = db_name
        self._collections = {}

    def __getattr__(self, name: str):
        if name not in self._collections:
            fallback_collection = InMemoryCollection(name)
            self._collections[name] = SafeCollection(None, fallback_collection)
        return self._collections[name]


db = SafeDatabase(DB_NAME)

app = FastAPI(title="Avero API")
api = APIRouter(prefix="/api")

security = HTTPBearer(auto_error=False)


# ---------------- Models ----------------
class EnquiryCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    full_name: str = Field(..., min_length=1, max_length=120)
    phone: str = Field(..., min_length=5, max_length=30)
    business_name: Optional[str] = ""
    business_type: Optional[str] = ""
    website_type: Optional[str] = ""
    budget: Optional[str] = ""
    timeline: Optional[str] = ""
    message: Optional[str] = ""
    source: Optional[str] = "landing"


class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "new"


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class ChatIn(BaseModel):
    session_id: Optional[str] = None
    message: str


class SiteSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    starting_price: str = "₹3,999"
    original_price: str = "₹15,000"
    save_percent: int = 80
    slots_left: int = 6
    delivery: str = "48 Hours"
    offer_title: str = "Complete Business Website Package"
    offer_tagline: str = "Everything a modern business needs to look premium online — design, dev, hosting, SEO, AI chatbot & 48-hour delivery."
    guarantee_note: str = "100% money-back if we miss 48H*"
    announcement_items: List[str] = Field(default_factory=lambda: [
        "Launch Offer — Premium Website Starting at ₹3,999",
        "Website Delivery in 48 Hours",
        "Free Domain + Hosting Setup Available",
        "AI Chatbot + SEO-Ready Websites",
        "Trusted by Local Businesses, Salons, CA Firms & Ecommerce Brands",
    ])
    features: List[str] = Field(default_factory=lambda: [
        "Website Delivery in 48 Hours",
        "Premium Custom Design",
        "Mobile Responsive",
        "SEO Setup + Meta Tags",
        "AI Chatbot Integration",
        "WhatsApp & Call CTAs",
        "Lead Enquiry Forms",
        "Hosting Setup + SSL",
        "Domain Setup Assistance",
        "Secure & Fast",
        "Google Analytics Ready",
        "1-Month Maintenance",
        "Priority Support",
        "Launch-Day Assistance",
    ])
    sections: Dict[str, bool] = Field(default_factory=lambda: {
        "announcement": True,
        "meme": True,
        "problem": True,
        "services": True,
        "laptop3d": True,
        "delivery": True,
        "portfolio": True,
        "threed_showcase": True,
        "industries": True,
        "pricing": True,
        "why": True,
        "before_after": True,
        "lead_gen": True,
        "ai": True,
        "roadmap": True,
        "blog": True,
        "faq": True,
        "chatbot": True,
        "mobile_cta": True,
    })


# ---------------- Auth ----------------
def make_token(email: str) -> str:
    payload = {"sub": email, "role": "admin", "exp": datetime.now(timezone.utc) + timedelta(days=7)}
    return pyjwt.encode(payload, JWT_SECRET, algorithm="HS256")


def require_admin(creds: HTTPAuthorizationCredentials = Depends(security)):
    if not creds or not creds.credentials:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        data = pyjwt.decode(creds.credentials, JWT_SECRET, algorithms=["HS256"])
        if data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Forbidden")
        return data
    except pyjwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")


async def seed_admin():
    if not ADMIN_EMAIL_DEFAULT or not ADMIN_PASSWORD_DEFAULT:
        return
    existing = await db.admins.find_one({"email": ADMIN_EMAIL_DEFAULT}, {"_id": 0})
    if not existing:
        hashed = bcrypt.hashpw(ADMIN_PASSWORD_DEFAULT.encode(), bcrypt.gensalt()).decode()
        await db.admins.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL_DEFAULT,
            "password_hash": hashed,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin: {ADMIN_EMAIL_DEFAULT}")
    else:
        # Rotate password on env-var change
        if not bcrypt.checkpw(ADMIN_PASSWORD_DEFAULT.encode(), existing["password_hash"].encode()):
            hashed = bcrypt.hashpw(ADMIN_PASSWORD_DEFAULT.encode(), bcrypt.gensalt()).decode()
            await db.admins.update_one(
                {"email": ADMIN_EMAIL_DEFAULT},
                {"$set": {"password_hash": hashed, "updated_at": datetime.now(timezone.utc).isoformat()}},
            )
            logger.info(f"Rotated admin password for {ADMIN_EMAIL_DEFAULT}")
    # Remove any stale admins whose email no longer matches
    await db.admins.delete_many({"email": {"$ne": ADMIN_EMAIL_DEFAULT}})


# ---------------- Email ----------------
def _enquiry_email_html(e: Enquiry) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;background:#0b0d1a;color:#fff;padding:24px;border-radius:12px;max-width:640px;margin:auto">
      <h2 style="color:#22D3EE;margin:0 0 8px">🚀 New Avero Enquiry</h2>
      <p style="color:#A1A1AA;margin:0 0 20px">Received at {e.created_at}</p>
      <table style="width:100%;border-collapse:collapse;color:#fff">
        <tr><td style="padding:8px;border-bottom:1px solid #1f2340"><b>Name</b></td><td style="padding:8px;border-bottom:1px solid #1f2340">{e.full_name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #1f2340"><b>Phone</b></td><td style="padding:8px;border-bottom:1px solid #1f2340">{e.phone}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #1f2340"><b>Business</b></td><td style="padding:8px;border-bottom:1px solid #1f2340">{e.business_name} ({e.business_type})</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #1f2340"><b>Website Type</b></td><td style="padding:8px;border-bottom:1px solid #1f2340">{e.website_type}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #1f2340"><b>Budget</b></td><td style="padding:8px;border-bottom:1px solid #1f2340">{e.budget}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #1f2340"><b>Timeline</b></td><td style="padding:8px;border-bottom:1px solid #1f2340">{e.timeline}</td></tr>
        <tr><td style="padding:8px;vertical-align:top"><b>Message</b></td><td style="padding:8px">{(e.message or '').replace(chr(10),'<br>')}</td></tr>
      </table>
      <p style="color:#A1A1AA;margin-top:24px;font-size:12px">Sent by theavero.dev automated system.</p>
    </div>
    """


async def send_enquiry_email(e: Enquiry):
    if not RESEND_API_KEY or not ADMIN_RECIPIENT_EMAIL:
        logger.info("Resend not configured — skipping email")
        return
    params = {
        "from": f"Avero <{SENDER_EMAIL}>",
        "to": [ADMIN_RECIPIENT_EMAIL],
        "subject": f"New Enquiry — {e.full_name} ({e.website_type or 'General'})",
        "html": _enquiry_email_html(e),
        "reply_to": [ADMIN_RECIPIENT_EMAIL],
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Enquiry email sent to {ADMIN_RECIPIENT_EMAIL}")
    except Exception as ex:
        logger.error(f"Resend send failed: {ex}")


async def seed_blog():
    for post in BLOG_POSTS:
        await db.blog_posts.update_one(
            {"slug": post["slug"]},
            {"$set": post},
            upsert=True,
        )
    logger.info(f"Seeded {len(BLOG_POSTS)} blog posts")


async def seed_settings():
    existing = await db.settings.find_one({"key": "site"}, {"_id": 0})
    if existing:
        return
    defaults = SiteSettings().model_dump()
    await db.settings.insert_one({"key": "site", **defaults, "updated_at": datetime.now(timezone.utc).isoformat()})
    logger.info("Seeded default site settings")


async def get_settings_doc() -> dict:
    defaults = SiteSettings().model_dump()
    doc = await db.settings.find_one({"key": "site"}, {"_id": 0, "key": 0})
    if not doc:
        await seed_settings()
        doc = await db.settings.find_one({"key": "site"}, {"_id": 0, "key": 0}) or {}
    # Backfill any missing keys with defaults so old docs get new fields (e.g. `sections`) for free
    merged = {**defaults, **{k: v for k, v in (doc or {}).items() if v is not None}}
    # If nested `sections` doc is missing keys added later, top them up too
    if isinstance(merged.get("sections"), dict):
        merged["sections"] = {**defaults["sections"], **merged["sections"]}
    return merged


# ---------------- Public routes ----------------
@api.get("/")
async def root():
    return {"service": "avero", "status": "ok"}


@api.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    obj = Enquiry(**payload.model_dump())
    await db.enquiries.insert_one(obj.model_dump())
    # fire-and-forget email
    asyncio.create_task(send_enquiry_email(obj))
    return obj


@api.get("/blog")
async def list_blog():
    docs = await db.blog_posts.find({}, {"_id": 0, "body_html": 0}).sort("date", -1).to_list(50)
    return docs


@api.get("/blog/{slug}")
async def get_blog(slug: str):
    doc = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return doc


@api.get("/settings")
async def public_settings():
    return await get_settings_doc()


# ---------------- Admin routes ----------------
@api.post("/admin/login")
async def admin_login(payload: AdminLogin):
    admin = await db.admins.find_one({"email": payload.email}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not bcrypt.checkpw(payload.password.encode(), admin["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": make_token(admin["email"]), "email": admin["email"]}


@api.get("/admin/enquiries")
async def list_enquiries(_: dict = Depends(require_admin)):
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api.patch("/admin/enquiries/{enquiry_id}")
async def update_enquiry_status(enquiry_id: str, body: dict, _: dict = Depends(require_admin)):
    new_status = body.get("status", "new")
    res = await db.enquiries.update_one({"id": enquiry_id}, {"$set": {"status": new_status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}


@api.get("/admin/stats")
async def admin_stats(_: dict = Depends(require_admin)):
    total = await db.enquiries.count_documents({})
    new_count = await db.enquiries.count_documents({"status": "new"})
    contacted = await db.enquiries.count_documents({"status": "contacted"})
    closed = await db.enquiries.count_documents({"status": "closed"})
    return {"total": total, "new": new_count, "contacted": contacted, "closed": closed}


@api.get("/admin/settings")
async def admin_get_settings(_: dict = Depends(require_admin)):
    return await get_settings_doc()


@api.put("/admin/settings")
async def admin_update_settings(payload: SiteSettings, _: dict = Depends(require_admin)):
    data = payload.model_dump()
    data["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.settings.update_one({"key": "site"}, {"$set": data}, upsert=True)
    doc = await db.settings.find_one({"key": "site"}, {"_id": 0, "key": 0})
    return doc


# ---------------- Chatbot (SSE stream, rule-based — no external API cost) ----------------
@api.post("/chat")
async def chat_stream(body: ChatIn):
    session_id = body.session_id or str(uuid.uuid4())
    user_message = (body.message or "").strip()

    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "user",
        "content": user_message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    reply = match_reply(user_message)

    async def event_gen():
        yield f"data: {json.dumps({'type': 'session', 'session_id': session_id})}\n\n"
        # Stream word-by-word for the typing feel
        import re as _re
        tokens = _re.split(r"(\s+)", reply)
        for tok in tokens:
            yield f"data: {json.dumps({'type': 'delta', 'content': tok})}\n\n"
            await asyncio.sleep(0.025)
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

        try:
            await db.chat_messages.insert_one({
                "id": str(uuid.uuid4()),
                "session_id": session_id,
                "role": "assistant",
                "content": reply,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        except Exception as e:
            logger.error(f"Failed to persist assistant message: {e}")

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"},
    )


# ---------------- Mount ----------------
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await seed_admin()
    await seed_blog()


@app.on_event("shutdown")
async def on_shutdown():
    return None
