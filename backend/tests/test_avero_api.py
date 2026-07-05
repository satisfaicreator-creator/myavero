"""Backend API tests for Avero"""
import os
import json
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://growth-hub-380.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@theavero.dev"
ADMIN_PASSWORD = "Avero@2999"


@pytest.fixture(scope="session")
def state():
    return {}


# -------- Health --------
def test_root():
    r = requests.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# -------- Enquiries --------
def test_create_enquiry_full_payload(state):
    payload = {
        "full_name": "TEST_John Doe",
        "phone": "+91-9999999999",
        "business_name": "TEST Biz",
        "business_type": "Retail",
        "website_type": "Business",
        "budget": "₹5,000+",
        "timeline": "1 week",
        "message": "Please build a website",
    }
    r = requests.post(f"{API}/enquiries", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and "created_at" in data
    assert data["status"] == "new"
    assert data["full_name"] == payload["full_name"]
    state["enquiry_id"] = data["id"]


def test_create_enquiry_missing_required():
    r = requests.post(f"{API}/enquiries", json={"message": "no name"}, timeout=15)
    assert r.status_code == 422


# -------- Admin auth --------
def test_admin_login_wrong_password():
    r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=15)
    assert r.status_code == 401


def test_admin_login_success(state):
    r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data
    state["token"] = data["token"]


def test_admin_enquiries_requires_auth():
    r = requests.get(f"{API}/admin/enquiries", timeout=15)
    assert r.status_code == 401


def test_admin_enquiries_list(state):
    token = state["token"]
    r = requests.get(f"{API}/admin/enquiries", headers={"Authorization": f"Bearer {token}"}, timeout=15)
    assert r.status_code == 200
    docs = r.json()
    assert isinstance(docs, list)
    ids = [d.get("id") for d in docs]
    assert state["enquiry_id"] in ids


def test_admin_stats(state):
    token = state["token"]
    r = requests.get(f"{API}/admin/stats", headers={"Authorization": f"Bearer {token}"}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    for k in ("total", "new", "contacted", "closed"):
        assert k in data


def test_admin_patch_enquiry_status(state):
    token = state["token"]
    eid = state["enquiry_id"]
    r = requests.patch(
        f"{API}/admin/enquiries/{eid}",
        json={"status": "contacted"},
        headers={"Authorization": f"Bearer {token}"},
        timeout=15,
    )
    assert r.status_code == 200
    # verify via list
    r2 = requests.get(f"{API}/admin/enquiries", headers={"Authorization": f"Bearer {token}"}, timeout=15)
    docs = r2.json()
    match = [d for d in docs if d["id"] == eid]
    assert match and match[0]["status"] == "contacted"


# -------- Chat SSE --------
def test_chat_sse_stream():
    r = requests.post(
        f"{API}/chat",
        json={"message": "What is the starting price?"},
        stream=True,
        timeout=45,
    )
    assert r.status_code == 200
    assert "text/event-stream" in r.headers.get("content-type", "")
    got_session = False
    got_delta = False
    got_done = False
    for raw in r.iter_lines(decode_unicode=True):
        if not raw:
            continue
        if raw.startswith("data:"):
            payload = raw[5:].strip()
            try:
                evt = json.loads(payload)
            except Exception:
                continue
            t = evt.get("type")
            if t == "session":
                got_session = True
            elif t == "delta":
                got_delta = True
            elif t == "done":
                got_done = True
                break
            elif t == "error":
                pytest.fail(f"Chat error event: {evt.get('message')}")
    assert got_session, "no session event"
    assert got_delta, "no delta event"
    assert got_done, "no done event"
