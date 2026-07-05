import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, MessageCircle, Mail, Globe, Send } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { API_BASE, AVERO } from "@/lib/config";

const websiteTypes = [
  "Business Website", "Landing Page", "Ecommerce Website",
  "Portfolio Website", "3D Website", "Website Redesign", "AI Chatbot", "Other"
];
const budgets = ["₹2,999 Starter", "₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "Premium Custom"];
const timelines = ["Urgent / 48 Hours", "This Week", "This Month", "Not Sure"];

const initial = {
  full_name: "", phone: "", business_name: "", business_type: "",
  website_type: "", budget: "", timeline: "", message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const setField = (k) => (v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      toast.error("Please fill your name and phone number");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/enquiries`, form);
      setDone(true);
      setForm(initial);
      toast.success("Enquiry sent! Avero will contact you shortly.");
    } catch (err) {
      toast.error("Something went wrong. Please try WhatsApp instead.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Let&apos;s build your <span className="gradient-text">online presence</span>
          </h2>
          <p className="text-white/70 mt-4">
            Share a few details. We&apos;ll get back on WhatsApp/Call within an hour.
          </p>

          <div className="mt-8 space-y-3">
            <a href={`tel:+${AVERO.phoneRaw}`} data-testid="contact-call" className="glass rounded-xl p-4 flex items-center gap-3 card-lift">
              <Phone className="w-5 h-5 text-cyan-300" />
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/60">Call Now</div>
                <div className="font-semibold">{AVERO.phone}</div>
              </div>
            </a>
            <a href={AVERO.whatsapp} target="_blank" rel="noreferrer" data-testid="contact-whatsapp" className="glass rounded-xl p-4 flex items-center gap-3 card-lift">
              <MessageCircle className="w-5 h-5 text-emerald-300" />
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/60">WhatsApp Now</div>
                <div className="font-semibold">Chat with Avero</div>
              </div>
            </a>
            <a href={`mailto:${AVERO.email}`} data-testid="contact-email" className="glass rounded-xl p-4 flex items-center gap-3 card-lift">
              <Mail className="w-5 h-5 text-fuchsia-300" />
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/60">Email</div>
                <div className="font-semibold break-all">{AVERO.email}</div>
              </div>
            </a>
            <a href={AVERO.website} target="_blank" rel="noreferrer" data-testid="contact-website" className="glass rounded-xl p-4 flex items-center gap-3 card-lift">
              <Globe className="w-5 h-5 text-purple-300" />
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/60">Website</div>
                <div className="font-semibold">theavero.dev</div>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={submit} className="glass-strong rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4 relative overflow-hidden" data-testid="contact-form">
            <div className="spot-glow w-72 h-72 bg-purple-600 -top-10 -right-10" />
            {done ? (
              <div className="text-center py-14" data-testid="contact-success">
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 grid place-items-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold mt-4">Thank you!</h3>
                <p className="text-white/70 mt-2">Avero will contact you shortly to discuss your website.</p>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="btn-ghost rounded-full px-5 py-2.5 mt-6 text-sm"
                  data-testid="contact-send-another"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name*" name="full_name">
                    <input required data-testid="input-full-name" className="input-avero" value={form.full_name} onChange={update("full_name")} placeholder="Rohan Sharma" />
                  </Field>
                  <Field label="Phone Number*" name="phone">
                    <input required data-testid="input-phone" className="input-avero" value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" />
                  </Field>
                  <Field label="Business Name" name="business_name">
                    <input data-testid="input-business-name" className="input-avero" value={form.business_name} onChange={update("business_name")} placeholder="Sharma Enterprises" />
                  </Field>
                  <Field label="Business Type" name="business_type">
                    <input data-testid="input-business-type" className="input-avero" value={form.business_type} onChange={update("business_type")} placeholder="Salon / CA Firm / Ecommerce…" />
                  </Field>
                  <Field label="Website Needed For" name="website_type">
                    <Select value={form.website_type} onValueChange={setField("website_type")}>
                      <SelectTrigger data-testid="select-website-type" className="input-avero h-auto py-2.5 rounded-[10px] border-white/10 bg-white/[0.03] data-[placeholder]:text-white/40">
                        <SelectValue placeholder="Choose…" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b0d1a] border-white/10 text-white">
                        {websiteTypes.map((v) => (
                          <SelectItem key={v} value={v} className="text-white focus:bg-white/10 focus:text-white data-[state=checked]:bg-cyan-500/20">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Budget" name="budget">
                    <Select value={form.budget} onValueChange={setField("budget")}>
                      <SelectTrigger data-testid="select-budget" className="input-avero h-auto py-2.5 rounded-[10px] border-white/10 bg-white/[0.03] data-[placeholder]:text-white/40">
                        <SelectValue placeholder="Choose…" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b0d1a] border-white/10 text-white">
                        {budgets.map((v) => (
                          <SelectItem key={v} value={v} className="text-white focus:bg-white/10 focus:text-white data-[state=checked]:bg-cyan-500/20">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Timeline" name="timeline" full>
                    <Select value={form.timeline} onValueChange={setField("timeline")}>
                      <SelectTrigger data-testid="select-timeline" className="input-avero h-auto py-2.5 rounded-[10px] border-white/10 bg-white/[0.03] data-[placeholder]:text-white/40">
                        <SelectValue placeholder="Choose…" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b0d1a] border-white/10 text-white">
                        {timelines.map((v) => (
                          <SelectItem key={v} value={v} className="text-white focus:bg-white/10 focus:text-white data-[state=checked]:bg-cyan-500/20">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field label="Message" name="message">
                  <textarea data-testid="input-message" rows={4} className="input-avero" value={form.message} onChange={update("message")} placeholder="Tell us about your business and what you'd like your website to do…" />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit"
                  className="btn-glow rounded-full px-6 py-3.5 text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Sending…" : (<>Send Project Enquiry <Send className="w-4 h-4" /></>)}
                </button>
                <p className="text-[11px] text-white/40">By submitting, you agree to be contacted by Avero over Phone / WhatsApp / Email.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, children, full = false }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] uppercase tracking-widest text-white/60">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
