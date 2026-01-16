"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Lock, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleReset = async () => {
    if (newPassword.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    try {
      setLoading(true);
      const res = await GlobalApi.ResetPassword({ token, newPassword });
      if (res.data.success) {
        setStatus({ type: "success", message: "Password updated! Redirecting..." });
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.error || "Invalid link." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')` }}>
      <div className="absolute inset-0 bg-blue-900/40 dark:bg-slate-950/60 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative z-10 border border-white/20 dark:border-slate-800 text-center transition-all">
        <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ShieldCheck className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100 mb-2">New Password</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 font-medium">Create a secure password for your account.</p>

        {status.message && (
          <div className={`p-4 rounded-2xl mb-6 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in zoom-in ${status.type === "success" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
            {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.message}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Min. 6 characters"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none bg-white/50 dark:bg-slate-800 dark:text-slate-100"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleReset}
            disabled={loading || status.type === "success"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-500/20"
          >
            {loading ? "Updating..." : "Confirm New Password"}
          </button>
        </div>
      </div>
    </div>
  );
}