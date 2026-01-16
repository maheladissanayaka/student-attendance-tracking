"use client";

// ✅ FIXED: Added missing import
import React, { useRef } from "react";

export default function TopStudentsTable({ data }) {
  const tableRef = useRef();

  if (!data || data.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div ref={tableRef} className="p-1 md:p-6">
        <h3 className="px-4 pt-4 font-bold text-gray-800 dark:text-slate-100">Yearly Top Attended Students</h3>
        <div className="overflow-x-auto mt-4">
          <table className="w-full md:w-3/4 border-collapse mx-auto lg:mx-0">
            <thead className="bg-gray-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="border-b dark:border-slate-800 p-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Student</th>
                <th className="border-b dark:border-slate-800 p-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400">Total Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {data.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-700 dark:text-slate-200">{s.studentName}</td>
                  <td className="p-4 text-center text-sm font-black text-emerald-600 dark:text-emerald-400">{s.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}