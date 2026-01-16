"use client";

// ✅ FIXED: Added missing imports
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function DashboardHeader({ onMonthChange, onGradeChange }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GlobalApi.GetAllGrades().then((res) => setGrades(res.data));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
      {/* Dark mode friendly text */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100">
        Dashboard
      </h1>

      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
        {/* Dark mode friendly inputs */}
        <input
          type="month"
          className="border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 px-3 py-2 rounded-xl flex-1 sm:flex-none outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
          onChange={(e) => onMonthChange(e.target.value)}
        />

        <select
          className="border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 px-3 py-2 rounded-xl flex-1 sm:flex-none outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all appearance-none cursor-pointer"
          onChange={(e) => onGradeChange(e.target.value)}
        >
          <option value="">All Grades</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.grade}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}