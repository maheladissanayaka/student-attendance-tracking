"use client";

import React, { useState } from "react";
import AttendanceFilters from "./_components/AttendanceFilters";
import AttendanceGrid from "./_components/AttendanceGrid";
import GlobalApi from "@/app/api/_services/GlobalApi";
import { searchStudents } from "./_components/AttendanceSearch";

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [month, setMonth] = useState("");
  const [gradeId, setGradeId] = useState(null);
  const [topStudents, setTopStudents] = useState([]);

  const loadTopAttendance = async () => {
    if (!month || !gradeId) return;
    const res = await GlobalApi.GetAttendanceByMonthGrade(month, gradeId);
    setTopStudents(res.data);
  };

  const handleSearch = async ({ month, gradeId }) => {
    setMonth(month);
    const numericGradeId = Number(gradeId);
    setGradeId(numericGradeId);
    const res = await GlobalApi.GetAllStudents();
    const filtered = searchStudents(res.data, numericGradeId);
    setStudents(filtered);
    setTopStudents([]); 
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 bg-transparent transition-colors duration-300">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        Attendance Marking
      </h2>

      <AttendanceFilters onSearch={handleSearch} />

      {students.length > 0 && month && gradeId && (
        <AttendanceGrid
          students={students}
          month={month}
          gradeId={gradeId}
          onSaved={loadTopAttendance}
        />
      )}

      {topStudents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
            Most Attended Students
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <table className="w-full md:w-1/2 border-collapse bg-white dark:bg-slate-900">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="border dark:border-slate-800 p-2 text-sm text-left text-slate-600 dark:text-slate-300">Student</th>
                  <th className="border dark:border-slate-800 p-2 text-sm text-slate-600 dark:text-slate-300">Attendance Count</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="border dark:border-slate-800 p-2 text-sm text-slate-700 dark:text-slate-200">{s.studentName}</td>
                    <td className="border dark:border-slate-800 p-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {s.attendanceCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;