"use client";

import React from "react";
import { Settings2 } from "lucide-react";

export default function SettingsHeader({ title, description }) {
  return (
    <div className="flex flex-col gap-1 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 dark:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none">
          <Settings2 className="text-white" size={24} />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
      </div>
      <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 font-medium ml-1">
        {description}
      </p>
    </div>
  );
}