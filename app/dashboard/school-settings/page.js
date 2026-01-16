"use client";

import { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import SettingsCard from "../settings/_components/SettingsCard";
import AnnouncementForm from "./_components/AnnouncementForm";
import AttendanceRulesForm from "./_components/AttendanceRulesForm";
import { toast } from "react-toastify";

export default function SchoolSettingsPage() {
  const [announcements, setAnnouncements] = useState([]); // Initialized as array
  const [rules, setRules] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const annRes = await GlobalApi.GetAnnouncements();
      const rulesRes = await GlobalApi.GetAttendanceRules();

      // ✅ FIX: Ensure you are setting an array. 
      // If your API returns { data: [...] }, annRes.data is correct.
      // If your API returns { data: { data: [...] } }, use annRes.data.data.
      // The Array.isArray check provides a safety fallback.
      const fetchedData = annRes.data?.data || annRes.data; 
      setAnnouncements(Array.isArray(fetchedData) ? fetchedData : []);
      
      setRules(rulesRes.data);
    } catch (err) {
      console.error("Fetch failed", err);
      setAnnouncements([]); // Fallback on error
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 bg-transparent">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">School Management</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base mt-1">Configure global attendance rules and post public announcements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsCard title="Attendance Rules" description="Define how system calculates late entries and work days.">
          <AttendanceRulesForm initialData={rules} onSave={fetchData} />
        </SettingsCard>

        <SettingsCard title="Post Announcement" description="Updates will be visible to all Teachers and Admins.">
          <AnnouncementForm onSave={fetchData} />
        </SettingsCard>
      </div>

      <div id="announcements" className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Recent Announcements</h3>
        <div className="space-y-4">
          {/* ✅ SECONDARY FIX: Optional chaining ensures it won't crash if state is null */}
          {Array.isArray(announcements) && announcements.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border dark:border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-blue-600 dark:text-blue-400">{item.title}</h4>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
            </div>
          ))}
          
          {(!announcements || announcements.length === 0) && (
            <p className="text-sm italic text-gray-400">No announcements posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}