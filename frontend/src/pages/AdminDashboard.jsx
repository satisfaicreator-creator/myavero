import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LogOut, Inbox, RefreshCw, Phone, MessageCircle, Mail } from "lucide-react";
import { API_BASE, AVERO } from "@/lib/config";
import AveroLogo from "@/components/site/AveroLogo";

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "closed", label: "Closed" },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  const token = typeof window !== "undefined" ? localStorage.getItem("avero_admin_token") : null;

  useEffect(() => {
    if (!token) { nav("/admin/login"); return; }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const [e, s] = await Promise.all([
        axios.get(`${API_BASE}/admin/enquiries`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setEnquiries(Array.isArray(e.data) ? e.data : []);
      setStats(s.data && typeof s.data === "object" ? s.data : { total: 0, new: 0, contacted: 0, closed: 0 });
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("avero_admin_token");
        nav("/admin/login");
      } else {
        toast.error("Failed to load enquiries");
      }
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE}/admin/enquiries/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`Marked as ${status}`);
      load();
    } catch { toast.error("Update failed"); }
  };

  const logout = () => {
    localStorage.removeItem("avero_admin_token");
    localStorage.removeItem("avero_admin_email");
    nav("/admin/login");
  };

  const filtered = tab === "all" ? enquiries : (Array.isArray(enquiries) ? enquiries.filter((e) => e.status === tab) : []);

  return (
    <div className="min-h-screen" data-testid="admin-dashboard">
      <div className="border-b border-white/10 glass-strong sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <AveroLogo />
          <div className="flex items-center gap-2">
            <button onClick={load} className="btn-ghost rounded-full px-3 py-2 text-xs inline-flex items-center gap-2" data-testid="admin-refresh">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button onClick={logout} className="btn-ghost rounded-full px-3 py-2 text-xs inline-flex items-center gap-2" data-testid="admin-logout">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold">Enquiry Dashboard</h1>
        <p className="text-white/60 text-sm">Every lead. Every channel. One place.</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { l: "Total",     v: stats.total,     tint: "text-white",       key: "all"       },
            { l: "New",       v: stats.new,       tint: "text-cyan-300",    key: "new"       },
            { l: "Contacted", v: stats.contacted, tint: "text-fuchsia-300", key: "contacted" },
            { l: "Closed",    v: stats.closed,    tint: "text-purple-300",  key: "closed"    },
          ].map((s) => (
            <button
              key={s.l}
              onClick={() => setTab(s.key)}
              className={`glass rounded-xl p-4 text-left card-lift ${tab === s.key ? "ring-1 ring-cyan-400/40" : ""}`}
              data-testid={`stat-${s.key}`}
            >
              <div className="text-[10px] uppercase tracking-widest text-white/50">{s.l}</div>
              <div className={`font-heading font-black text-3xl mt-1 ${s.tint}`}>{s.v}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-xs ${tab === t.key ? "btn-glow" : "btn-ghost"}`}
              data-testid={`tab-${t.key}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-4 glass rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Inbox className="w-8 h-8 text-white/40 mx-auto" />
              <div className="text-white/60 mt-3 text-sm">No enquiries in this bucket yet.</div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((e) => (
                <div key={e.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4" data-testid={`enquiry-${e.id}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-heading font-bold">{e.full_name}</div>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-cyan-400/30 text-cyan-300">{e.website_type || "General"}</span>
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                        e.status === "new" ? "border-cyan-400/40 text-cyan-300"
                        : e.status === "contacted" ? "border-fuchsia-400/40 text-fuchsia-300"
                        : "border-purple-400/40 text-purple-300"
                      }`}>{e.status}</span>
                    </div>
                    <div className="text-sm text-white/70 mt-1">
                      {e.business_name || "—"} {e.business_type ? `· ${e.business_type}` : ""}
                    </div>
                    <div className="text-xs text-white/50 mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      <span>💰 {e.budget || "—"}</span>
                      <span>⏱ {e.timeline || "—"}</span>
                      <span>🗓 {new Date(e.created_at).toLocaleString()}</span>
                    </div>
                    {e.message && (
                      <div className="text-sm text-white/70 mt-3 rounded-lg bg-white/5 border border-white/10 p-3 max-w-2xl">
                        {e.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    <a href={`tel:${e.phone}`} className="btn-ghost rounded-full px-3 py-2 text-xs inline-flex items-center gap-2" data-testid={`enq-call-${e.id}`}>
                      <Phone className="w-3.5 h-3.5 text-cyan-300" /> {e.phone}
                    </a>
                    <a href={`https://wa.me/${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="btn-ghost rounded-full px-3 py-2 text-xs inline-flex items-center gap-2" data-testid={`enq-wa-${e.id}`}>
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-300" /> WhatsApp
                    </a>
                    <a href={`mailto:${AVERO.email}?subject=Follow-up for ${encodeURIComponent(e.full_name)}`} className="btn-ghost rounded-full px-3 py-2 text-xs inline-flex items-center gap-2" data-testid={`enq-email-${e.id}`}>
                      <Mail className="w-3.5 h-3.5 text-fuchsia-300" /> Email
                    </a>
                    <div className="flex gap-1">
                      {["new","contacted","closed"].filter(s => s !== e.status).map((s) => (
                        <button key={s} onClick={() => setStatus(e.id, s)} className="btn-ghost rounded-full px-2 py-1 text-[10px] uppercase tracking-widest" data-testid={`enq-set-${s}-${e.id}`}>
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
