"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../../_context/AuthContext";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function UpdateProfileForm({ initialName, email, onUpdateSuccess }) {
  const [name, setName] = useState(initialName || "");
  const [isSaving, setIsSaving] = useState(false);
  const { refreshUser } = useAuth();

  useEffect(() => { setName(initialName); }, [initialName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name cannot be empty.");
    if (name === initialName) return toast.info("No changes to save.");

    setIsSaving(true);
    try {
      const res = await GlobalApi.UpdateUserProfile({ name });
      if (res.data.success) {
        onUpdateSuccess(name);
        await refreshUser();
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally { setIsSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Email Address</label>
        <Input
          value={email || ""}
          disabled
          className="bg-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 cursor-not-allowed h-12"
        />
        <p className="text-[10px] text-gray-400 dark:text-slate-500 italic">Email cannot be changed by staff.</p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Full Name</label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          disabled={isSaving}
          className="rounded-xl border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:ring-blue-500 h-12"
        />
      </div>

      <Button
        type="submit"
        disabled={isSaving || name === initialName}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-xl py-6 font-bold transition-all active:scale-95 mt-2"
      >
        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Profile Details"}
      </Button>
    </form>
  );
}