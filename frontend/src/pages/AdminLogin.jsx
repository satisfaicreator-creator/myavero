import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { API_BASE } from "@/lib/config";
import AveroLogo from "@/components/site/AveroLogo";

export default function AdminLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/admin/login`, form);
      localStorage.setItem("avero_admin_token", data.token);
      localStorage.setItem("avero_admin_email", data.email);
      toast.success("Welcome back");
      nav("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-10 relative overflow-hidden">
      <div className="spot-glow w-[500px] h-[500px] bg-purple-600 -top-32 -left-32" />
      <div className="spot-glow w-[500px] h-[500px] bg-blue-600 -bottom-32 -right-32" />

      <div className="w-full max-w-md glass-strong rounded-2xl p-8 relative z-10">
        <div className="flex justify-center"><AveroLogo /></div>
        <h1 className="font-heading text-2xl font-bold mt-6 text-center">Admin Login</h1>
        <p className="text-center text-white/60 text-sm mt-1">Access your enquiry dashboard.</p>

        <form onSubmit={submit} className="mt-6 space-y-3" data-testid="admin-login-form">
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-white/60">Email</span>
            <input
              required
              type="email"
              className="input-avero mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-testid="admin-email"
              placeholder="admin@theavero.dev"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-white/60">Password</span>
            <input
              required
              type="password"
              className="input-avero mt-1"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              data-testid="admin-password"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full rounded-full py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70"
            data-testid="admin-login-submit"
          >
            {loading ? "Signing in…" : (<>Login <LogIn className="w-4 h-4" /></>)}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-white/60 hover:text-white">← Back to site</a>
        </div>
      </div>
    </div>
  );
}
