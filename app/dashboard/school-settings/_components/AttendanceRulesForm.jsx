"use client";

import { useState } from "react";
import { Save, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { toast } from "react-toastify";

export default function AttendanceRulesForm({ initialData, onSave }) {
  const [lateTime, setLateTime] = useState(initialData?.lateThreshold || "08:30");

  const handleSave = async () => {
    try {
      await GlobalApi.UpdateAttendanceRules({ lateThreshold: lateTime });
      toast.success("Rules updated!");
      onSave();
    } catch (err) { toast.error("Failed to save rules."); }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Late Entry Threshold</label>
        <div className="relative">
          <Clock size={18} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="time" 
            value={lateTime}
            onChange={(e) => setLateTime(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
          />
        </div>
      </div>
      <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl font-bold transition-all">
        <Save size={18} className="mr-2" /> Save Rules
      </Button>
    </div>
  );
}