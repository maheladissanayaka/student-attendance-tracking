"use client";

import { useState } from "react";
import { Send, Type, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { toast } from "react-toastify";

export default function AnnouncementForm({ onSave }) {
  const [data, setData] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!data.title || !data.body) return toast.warning("Complete all fields.");
    setLoading(true);
    try {
      await GlobalApi.PostAnnouncement({ ...data, date: new Date().toLocaleDateString() });
      toast.success("Announcement Posted!");
      setData({ title: "", body: "" });
      onSave();
    } catch (err) { toast.error("Submit failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <input 
        placeholder="Announcement Title"
        value={data.title}
        onChange={(e) => setData({...data, title: e.target.value})}
        className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
      />
      <textarea 
        placeholder="Type message here..."
        value={data.body}
        rows={3}
        onChange={(e) => setData({...data, body: e.target.value})}
        className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all resize-none"
      />
      <Button onClick={handleSubmit} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl font-bold transition-all">
        {loading ? "Sending..." : <><Send size={18} className="mr-2" /> Post Now</>}
      </Button>
    </div>
  );
}