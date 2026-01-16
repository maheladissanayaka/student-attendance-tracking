"use client";

import React, { useState } from "react";
// ✅ FIXED: Added missing import
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function LogoutButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post("/api/auth/logout");
      toast.success("✅ Logged out successfully");
      setOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("❌ Logout failed, try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile-friendly touch target: py-2.5 */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/40 transition active:scale-95"
      >
        <LogOut size={20} className="text-blue-700 dark:text-blue-400" />
        <span className="font-bold text-sm text-blue-700 dark:text-blue-400">Logout</span>
      </button>

      {/* Dark mode friendly Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[400px] rounded-3xl dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader className="space-y-3">
            <DialogTitle className="dark:text-slate-100">Confirm Logout</DialogTitle>
            <DialogDescription className="dark:text-slate-400 leading-relaxed">
              Are you sure you want to log out? You will be redirected to the login page.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex flex-row justify-end gap-3 mt-6">
            <button 
              onClick={() => setOpen(false)} 
              className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-sm font-bold transition hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button 
              onClick={handleLogout} 
              disabled={isLoggingOut}
              className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-100 dark:shadow-none transition active:scale-95 disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}