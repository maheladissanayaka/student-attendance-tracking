"use client";

import { useEffect, useState } from "react";
import GlobalApi from "@/app/api/_services/GlobalApi";
import DashboardHeader from "./_components/DashboardHeader";
import StatCard from "./_components/StatCard";
import AttendanceBarChart from "./_components/AttendanceBarChart";
import MonthlyAttendanceDonut from "./_components/MonthlyAttendanceDonut";

export default function DashboardPage() {
  const [month, setMonth] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, [month, gradeId]);

  const loadData = async () => {
    const res = await GlobalApi.GetDashboardStats(month, gradeId);
    setData(res.data);
  };

  if (!data) return null;

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6 bg-transparent transition-colors duration-300">
      <DashboardHeader
        onMonthChange={setMonth}
        onGradeChange={setGradeId}
      />

      {/* STAT CARDS: Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={data.cards.totalStudents} />
        <StatCard title="Total Class Rooms" value={data.cards.totalGrades} />
        <StatCard title="Avg Attendance" value={data.cards.avgAttendance} />
        <StatCard title="Absent Rate" value={data.cards.absentRate} />
      </div>

      {/* CHARTS Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="font-bold text-gray-800 dark:text-slate-100 mb-4 text-sm md:text-base">Grade-wise Attendance</h3>
          <div className="h-[300px] w-full">
            <AttendanceBarChart data={data.bar} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="font-bold text-gray-800 dark:text-slate-100 mb-4 text-sm md:text-base">Monthly Attendance</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <MonthlyAttendanceDonut data={data.donut} />
          </div>
        </div>
      </div>
    </div>
  );
}