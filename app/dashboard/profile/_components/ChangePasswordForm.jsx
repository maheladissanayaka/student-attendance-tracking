"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2, KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function ChangePasswordForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    
    if (!currentPassword || !newPassword || !confirmPassword) return toast.error("Please fill all fields.");
    if (newPassword !== confirmPassword) return toast.error("New passwords do not match.");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters.");

    setIsSaving(true);
    try {
      const res = await GlobalApi.UpdateUserPassword({ currentPassword, newPassword });
      if (res.data.success) {
        toast.success("Password Changed Successfully!");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) { 
      toast.error(error.response?.data?.error || "Update failed."); 
    } finally { 
      setIsSaving(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="flex justify-end mb-2">
          <button 
            type="button" 
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            {showPasswords ? <EyeOff size={14}/> : <Eye size={14}/>}
            {showPasswords ? "Hide Passwords" : "Show Passwords"}
          </button>
       </div>

       {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
         <div key={field} className="grid gap-2">
           <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase ml-1">
             {field.replace(/([A-Z])/g, ' $1')}
           </label>
           <Input
             name={field}
             type={showPasswords ? "text" : "password"}
             value={formData[field]}
             onChange={handleChange}
             disabled={isSaving}
             className="rounded-xl border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-700 h-12"
           />
         </div>
       ))}

       <Button 
         type="submit" 
         disabled={isSaving} 
         className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 rounded-xl py-6 font-bold shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95 transition-all mt-4"
       >
         {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2" size={18} />}
         Update Password
       </Button>
    </form>
  );
}