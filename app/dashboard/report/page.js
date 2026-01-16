"use client";

import { useState } from "react";
import ReportFilters from "./_components/ReportFilters";
import ReportActions from "./_components/ReportActions";
import MonthlyAttendanceTable from "./_components/MonthlyAttendanceTable";
import TopStudentsTable from "./_components/TopStudentsTable";
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function ReportsPage() {
  const [month, setMonth] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const [topStudents, setTopStudents] = useState([]);

  const loadMonthlyReport = async () => {
    if (!month || !gradeId) {
      alert("Please select grade and month");
      return;
    }
    const res = await GlobalApi.GetAttendanceByMonthGrade(month, gradeId);
    setMonthlyData(res.data);
    setTopStudents([]);
  };

  const loadTopStudents = async () => {
    if (!gradeId) {
      alert("Please select grade");
      return;
    }
    const res = await GlobalApi.GetTopStudentsByYear(gradeId);
    setTopStudents(res.data);
    setMonthlyData([]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        Attendance Reports
      </h1>

      <ReportFilters
        onMonthChange={setMonth}
        onGradeChange={setGradeId}
      />

      {/* Primary Action Buttons: Stacked on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={loadMonthlyReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
        >
          Show Monthly Report
        </button>

        <button
          onClick={loadTopStudents}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-green-100 dark:shadow-none active:scale-95"
        >
          Show Top Students
        </button>
      </div>

      <ReportActions
        monthlyData={monthlyData}
        topData={topStudents}
        month={month}
      />

      {/* Responsive Table Containers */}
      <div className="space-y-6">
        {monthlyData.length > 0 && (
          <MonthlyAttendanceTable data={monthlyData} />
        )}

        {topStudents.length > 0 && (
          <TopStudentsTable data={topStudents} />
        )}
      </div>
    </div>
  );
}