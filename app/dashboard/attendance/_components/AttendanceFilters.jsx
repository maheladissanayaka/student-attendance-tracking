"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";

function AttendanceFilters({ onSearch }) {
  const [month, setMonth] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GlobalApi.GetAllGrades().then((res) => setGrades(res.data));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl w-full sm:w-auto outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-all"
      />

      <select
        value={gradeId}
        onChange={(e) => setGradeId(e.target.value)}
        className="border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl w-full sm:w-auto outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-all appearance-none cursor-pointer"
      >
        <option value="">Select Grade</option>
        {grades.map((g) => (
          <option key={g.id} value={g.id}>
            {g.grade}
          </option>
        ))}
      </select>

      <button
        onClick={() => onSearch({ month, gradeId })}
        disabled={!month || !gradeId}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white px-6 py-2 rounded-xl transition-all font-semibold shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
      >
        Search
      </button>
    </div>
  );
}

export default AttendanceFilters;