"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, Github, Chrome, School, AlertCircle } from "lucide-react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, title: "", description: "" });
  const router = useRouter();

  const login = async () => {
    if (!form.email || !form.password) {
      setAlert({
        open: true,
        title: "Missing Information",
        description: "Please enter both your email and password to access the portal.",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await GlobalApi.Login(form);
      if (res.data.success) {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (err) {
      setAlert({
        open: true,
        title: "Login Failed",
        description: err.response?.data?.error || "Invalid credentials. Please check your details and try again.",
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
            <School className="text-white" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100 tracking-tight">EduTrack Login</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">Portal for Students & Teachers</p>
        </div>

        <div className="space-y-4 md:space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white/50 dark:bg-slate-800 dark:text-slate-100"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white/50 dark:bg-slate-800 dark:text-slate-100"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" size="sm" className="text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 font-bold transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70"
          >
            <LogIn size={22} />
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="relative my-6 md:my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300 dark:border-slate-700"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/0 px-2 text-gray-500 dark:text-slate-400 font-bold backdrop-blur-sm">Or sync with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button className="flex items-center justify-center gap-2 border-2 border-gray-100 dark:border-slate-800 py-3 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors font-semibold text-gray-700 dark:text-slate-300">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-gray-100 dark:border-slate-800 py-3 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors font-semibold text-gray-700 dark:text-slate-300">
              <Github size={18} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-700 dark:text-slate-400 mt-6 md:mt-8 font-medium">
            Not registered yet? 
            <Link href="/register" className="text-blue-700 dark:text-blue-400 font-extrabold ml-1 hover:underline">
              Join the School
            </Link>
          </p>
        </div>
      </div>

      <Dialog open={alert.open} onOpenChange={(val) => setAlert({ ...alert, open: val })}>
        <DialogContent className="w-[90vw] sm:max-w-[425px] rounded-3xl border-none dark:bg-slate-900 shadow-2xl">
          <DialogHeader className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
               <AlertCircle className="text-red-600 dark:text-red-500" size={28} />
            </div>
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-100">
              {alert.title}
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-gray-500 dark:text-slate-400 pt-2">
              {alert.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setAlert({ ...alert, open: false })}
              className="w-full bg-gray-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95"
            >
              Try Again
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}