"use client";

import { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { Megaphone } from "lucide-react";
import AnnouncementCard from "./_components/AnnouncementCard";

export default function SocialPage() {
  const [announcements, setAnnouncements] = useState([]); // Correctly initialized
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await GlobalApi.GetAnnouncements();
      
      /* ✅ FIX: Ensure res.data is an array. 
        If your Drizzle API returns { data: [...] }, use res.data.data.
        The Array.isArray check provides a safe fallback.
      */
      const fetchedData = res.data?.data || res.data;
      setAnnouncements(Array.isArray(fetchedData) ? fetchedData : []);
      
    } catch (err) {
      console.error("Failed to fetch announcements", err);
      setAnnouncements([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex items-center gap-4 border-b border-gray-100 dark:border-slate-800 pb-6">
          <div className="p-3 bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
            <Megaphone className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              School Feed
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 font-medium">
              Latest news and updates from the administration.
            </p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4 md:space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-slate-400 font-bold animate-pulse">Loading updates...</p>
            </div>
          ) : (
            /* ✅ Optional Chaining adds extra safety */
            announcements?.map((item) => (
              <AnnouncementCard key={item.id} data={item} />
            ))
          )}

          {!loading && announcements?.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-100 dark:border-slate-800">
              <p className="text-gray-400 dark:text-slate-500 font-medium italic">
                No announcements have been posted yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}