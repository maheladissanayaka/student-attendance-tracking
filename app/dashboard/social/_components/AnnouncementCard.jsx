"use client";

import React from "react";
import { Calendar, Quote } from "lucide-react";

export default function AnnouncementCard({ data }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/30 group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        {/* Date Tag */}
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
          <Calendar size={12} className="text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            {data.date}
          </span>
        </div>
        
        <Quote size={24} className="text-gray-100 dark:text-slate-800 hidden md:block group-hover:text-blue-50 transition-colors" />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {data.title}
      </h3>

      <div className="relative">
        <p className="text-sm md:text-base text-gray-600 dark:text-slate-400 leading-relaxed">
          {data.body}
        </p>
      </div>
    </div>
  );
}