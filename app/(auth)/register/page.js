"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, UserPlus, Github, Chrome, GraduationCap, AlertCircle } from "lucide-react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, title: "", description: "" });

  const register = async () => {
    if (!form.name || !form.email || !form.password) {
      setAlert({
        open: true,
        title: "Incomplete Form",
        description: "Please provide your full name, email address, and a secure password to register.",
      });
      return;
    }

    try {
      setLoading(true);
      await GlobalApi.RegisterNewUser(form);
      router.push("/login");
    } catch (err) {
      setAlert({
        open: true,
        title: "Registration Error",
        description: err.response?.data?.error || "We couldn't create your account. Please try a different email or check your connection.",
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
      <div className="absolute inset-0 bg-emerald-900/30 dark:bg-slate-950/60 backdrop-blur-[1px]"></div>

      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 relative z-10 border border-white/20 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-emerald-600 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100 tracking-tight">Join EduTrack</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">Start your academic journey today</p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input
              placeholder="Full name"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/50 dark:bg-slate-800 dark:text-slate-100"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/50 dark:bg-slate-800 dark:text-slate-100"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/50 dark:bg-slate-800 dark:text-slate-100"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            onClick={register}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 transition-all active:scale-95 disabled:opacity-70"
          >
            <UserPlus size={22} />
            {loading ? "Registering..." : "Create Account"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300 dark:border-slate-700"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/0 px-2 text-gray-500 dark:text-slate-400 font-bold backdrop-blur-sm">Or sign up with</span></div>
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
            Already have an account? 
            <Link href="/login" className="text-emerald-700 dark:text-emerald-400 font-extrabold ml-1 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Dialog open={alert.open} onOpenChange={(val) => setAlert({ ...alert, open: val })}>
        <DialogContent className="w-[90vw] sm:max-w-[425px] rounded-3xl border-none shadow-2xl dark:bg-slate-900">
          <DialogHeader className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
               <AlertCircle className="text-orange-600 dark:text-orange-500" size={28} />
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
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95"
            >
              Correct Details
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}