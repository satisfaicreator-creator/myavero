import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { API_BASE } from "@/lib/config";
import { DEFAULT_SETTINGS, useSettings } from "@/lib/settings";

export default function SettingsPanel({ token }) {
  const { refresh } = useSettings();
  const [form, setForm] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/admin/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({ ...DEFAULT_SETTINGS, ...(data || {}) });
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => {
    const v = e && e.target ? e.target.value : e;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const setListItem = (key, idx, value) => {
    setForm((f) => {
      const arr = [...(f[key] || [])];
      arr[idx] = value;
      return { ...f, [key]: arr };
    });
  };
  const addListItem = (key) => setForm((f) => ({ ...f, [key]: [...(f[key] || []), ""] }));
  const removeListItem = (key, idx) => setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        save_percent: Number(form.save_percent) || 0,
        slots_left: Number(form.slots_left) || 0,
        announcement_items: (form.announcement_items || []).filter((s) => s && s.trim()),
        features: (form.features || []).filter((s) => s && s.trim()),
      };
      const { data } = await axios.put(`${API_BASE}/admin/settings`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ ...DEFAULT_SETTINGS, ...(data || {}) });
      refresh();
      toast.success("Settings saved — live on site");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetDefaults = () => {
    if (window.confirm("Reset all fields to defaults? (You still need to click Save)")) {
      setForm(DEFAULT_SETTINGS);
    }
  };

  if (loading) return <div className="p-10 text-center text-white/60">Loading…</div>;

  return (
    <form onSubmit={save} className="mt-4 space-y-6" data-testid="admin-settings-form">
      {/* Pricing block */}
      <section className="glass rounded-2xl p-5">
        <header className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg">Pricing & Offer</h3>
          <button type="button" onClick={resetDefaults} className="btn-ghost rounded-full px-3 py-1.5 text-xs inline-flex items-center gap-2" data-testid="settings-reset">
            <RotateCcw className="w-3.5 h-3.5" /> Reset defaults
          </button>
        </header>
        <div className="grid sm:grid-cols-2 gap-3">
          <TextField label="Starting Price" testid="field-starting-price" value={form.starting_price} onChange={set("starting_price")} placeholder="₹2,999" />
          <TextField label="Original Price (strike)" testid="field-original-price" value={form.original_price} onChange={set("original_price")} placeholder="₹15,000" />
          <TextField label="Save %" type="number" testid="field-save-percent" value={form.save_percent} onChange={set("save_percent")} placeholder="80" />
          <TextField label="Slots Left This Week" type="number" testid="field-slots-left" value={form.slots_left} onChange={set("slots_left")} placeholder="6" />
          <TextField label="Delivery Time" testid="field-delivery" value={form.delivery} onChange={set("delivery")} placeholder="48 Hours" />
          <TextField label="Offer Title" testid="field-offer-title" value={form.offer_title} onChange={set("offer_title")} placeholder="Complete Business Website Package" full />
          <TextAreaField label="Offer Tagline" testid="field-offer-tagline" value={form.offer_tagline} onChange={set("offer_tagline")} full />
          <TextAreaField label="Guarantee Note" testid="field-guarantee" value={form.guarantee_note} onChange={set("guarantee_note")} full rows={2} />
        </div>
      </section>

      {/* Announcement bar */}
      <ListSection
        title="Announcement Marquee (Top Bar)"
        items={form.announcement_items}
        setItem={(i, v) => setListItem("announcement_items", i, v)}
        add={() => addListItem("announcement_items")}
        remove={(i) => removeListItem("announcement_items", i)}
        testidPrefix="announcement"
        placeholder="e.g. Free Domain + Hosting Setup Available"
      />

      {/* Features list */}
      <ListSection
        title="Everything-Included Features (Pricing Card)"
        items={form.features}
        setItem={(i, v) => setListItem("features", i, v)}
        add={() => addListItem("features")}
        remove={(i) => removeListItem("features", i)}
        testidPrefix="feature"
        placeholder="e.g. AI Chatbot Integration"
      />

      <div className="flex items-center justify-end gap-3 sticky bottom-0 py-3 bg-[#050816]/70 backdrop-blur border-t border-white/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <button type="submit" disabled={saving} className="btn-glow rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-70" data-testid="settings-save">
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save & Publish"}
        </button>
      </div>
    </form>
  );
}

function TextField({ label, value, onChange, placeholder, testid, type = "text", full = false }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] uppercase tracking-widest text-white/60">{label}</span>
      <input type={type} className="input-avero mt-1" value={value ?? ""} onChange={onChange} placeholder={placeholder} data-testid={testid} />
    </label>
  );
}

function TextAreaField({ label, value, onChange, testid, rows = 3, full }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] uppercase tracking-widest text-white/60">{label}</span>
      <textarea rows={rows} className="input-avero mt-1" value={value ?? ""} onChange={onChange} data-testid={testid} />
    </label>
  );
}

function ListSection({ title, items, setItem, add, remove, testidPrefix, placeholder }) {
  return (
    <section className="glass rounded-2xl p-5">
      <header className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg">{title}</h3>
        <button type="button" onClick={add} className="btn-ghost rounded-full px-3 py-1.5 text-xs inline-flex items-center gap-2" data-testid={`${testidPrefix}-add`}>
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </header>
      <div className="space-y-2">
        {(items || []).map((v, i) => (
          <div key={i} className="flex items-center gap-2" data-testid={`${testidPrefix}-item-${i}`}>
            <input
              className="input-avero flex-1"
              value={v}
              onChange={(e) => setItem(i, e.target.value)}
              placeholder={placeholder}
              data-testid={`${testidPrefix}-input-${i}`}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="btn-ghost rounded-full w-10 h-10 grid place-items-center shrink-0"
              aria-label="Remove"
              data-testid={`${testidPrefix}-remove-${i}`}
            >
              <Trash2 className="w-4 h-4 text-fuchsia-300" />
            </button>
          </div>
        ))}
        {(!items || items.length === 0) && (
          <div className="text-sm text-white/50 py-3">No items yet. Click Add to create one.</div>
        )}
      </div>
    </section>
  );
}
