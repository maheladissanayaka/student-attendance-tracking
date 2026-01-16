"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState({ open: false, title: "", description: "", type: "error" });

  const handleResetRequest = async () => {
    if (!email) {
      setAlert({
        open: true,
        title: "Missing Email",
        description: "Please enter your registered email address to receive a reset link.",
        type: "error"
      });
      return;
    }

    try {
      setLoading(true);
      // Logic: Call your GlobalApi.SendResetLink(email)
      const res = await GlobalApi.ForgotPassword({ email });
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setAlert({
        open: true,
        title: "Request Failed",
        description: err.response?.data?.error || "We couldn't find an account with that email.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 relative transition-colors duration-500"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')` }}
    >
      <div className="absolute inset-0 bg-blue-900/40 dark:bg-slate-950/60 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 relative z-10 border border-white/20 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
            <KeyRound className="text-white" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100 tracking-tight">Reset Password</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">
            {submitted ? "Check your inbox for instructions" : "Enter your email to receive a reset link"}
          </p>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Registered Email"
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white/50 dark:bg-slate-800 dark:text-slate-100"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleResetRequest}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-900/30 text-center">
            <CheckCircle2 className="text-green-600 mx-auto mb-2" size={40} />
            <p className="text-sm text-green-800 dark:text-green-400 font-medium">
              We've sent a recovery link to <strong>{email}</strong>. Please check your spam folder if you don't see it.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 font-bold hover:underline">
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>

      {/* Alert Dialog for Errors */}
      <Dialog open={alert.open} onOpenChange={(val) => setAlert({ ...alert, open: val })}>
        <DialogContent className="w-[90vw] sm:max-w-[425px] rounded-3xl border-none dark:bg-slate-900 shadow-2xl">
          <DialogHeader className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
               <AlertCircle className="text-red-600 dark:text-red-500" size={28} />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800 dark:text-slate-100">{alert.title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-slate-400 pt-2">{alert.description}</DialogDescription>
          </DialogHeader>
          <button onClick={() => setAlert({ ...alert, open: false })} className="w-full bg-gray-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl font-bold mt-4 transition-all">
            Try Again
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}