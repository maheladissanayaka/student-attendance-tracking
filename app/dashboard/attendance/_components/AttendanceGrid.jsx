"use client";

import { useEffect, useState } from "react";
import { addAttendance, saveAttendanceOnce } from "./AttendanceController";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { toast } from "react-toastify";

function getDaysInMonth(month) {
  const [year, m] = month.split("-");
  return new Date(year, m, 0).getDate();
}

function AttendanceGrid({ students, month, gradeId, onSaved }) {
  const days = getDaysInMonth(month);
  const [attendanceState, setAttendanceState] = useState({});

  useEffect(() => {
    async function loadExisting() {
      const res = await GlobalApi.GetExistingAttendance(month, gradeId);
      const map = {};
      res.data.forEach((a) => {
        if (a.present) {
          map[`${a.studentId}-${a.day}`] = true;
        }
      });
      setAttendanceState(map);
    }
    loadExisting();
  }, [month, gradeId]);

  const handleCheck = (studentId, day, checked) => {
    const key = `${studentId}-${day}`;
    setAttendanceState((prev) => ({ ...prev, [key]: checked }));
    addAttendance({ studentId, gradeId, day, month, present: checked });
  };

  const handleSave = async () => {
    const saved = await saveAttendanceOnce();
    if (saved) {
      toast.success("✅ Attendance saved successfully");
      onSaved(); 
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mt-4 transition-all">
        <table className="w-full border-collapse bg-white dark:bg-slate-900">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50">
            <tr>
              <th className="border-b dark:border-slate-800 border-r dark:border-r-slate-800 p-3 text-sm text-left sticky left-0 bg-slate-50 dark:bg-slate-800 z-10 text-slate-600 dark:text-slate-300">
                Student
              </th>
              {[...Array(days)].map((_, i) => (
                <th key={i} className="border-b dark:border-slate-800 p-2 text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                <td className="p-3 text-sm font-medium text-slate-700 dark:text-slate-200 sticky left-0 bg-white dark:bg-slate-900 group-hover:bg-blue-50/30 dark:group-hover:bg-slate-800 border-r dark:border-slate-800 z-10 transition-colors">
                  {s.name}
                </td>

                {[...Array(days)].map((_, d) => {
                  const key = `${s.id}-${d + 1}`;
                  return (
                    <td key={d} className="p-2 text-center border-l dark:border-slate-800/50">
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer accent-blue-600 dark:accent-blue-500 rounded transition-transform active:scale-125"
                        checked={attendanceState[key] || false}
                        onChange={(e) => handleCheck(s.id, d + 1, e.target.checked)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-100 dark:shadow-none active:scale-95"
        >
          Save Attendance
        </button>
      </div>
    </>
  );
}

export default AttendanceGrid;