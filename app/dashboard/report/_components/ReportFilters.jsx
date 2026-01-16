"use client";

import { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function ReportFilters({ onMonthChange, onGradeChange }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GlobalApi.GetAllGrades().then((res) => {
      setGrades(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 items-start sm:items-center">
      <select
        className="w-full sm:w-auto border dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
        onChange={(e) => onGradeChange(e.target.value)}
      >
        <option value="">Select Grade</option>
        {grades.map((g) => (
          <option key={g.id} value={g.id}>
            {g.grade}
          </option>
        ))}
      </select>

      <input
        type="month"
        className="w-full sm:w-auto border dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
        onChange={(e) => onMonthChange(e.target.value)}
      />
    </div>
  );
}