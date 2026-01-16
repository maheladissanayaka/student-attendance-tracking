"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function MonthlyAttendanceDonut({ data }) {
  const total = data.present + data.absent;

  const presentPercent = total === 0 ? 0 : Math.round((data.present / total) * 100);
  const absentPercent = total === 0 ? 0 : Math.round((data.absent / total) * 100);

  const chartData = [
    { name: "Present", value: data.present },
    { name: "Absent", value: data.absent },
  ];

  // Colors remain the same as they are high-contrast for both modes
  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="w-full h-full flex flex-col items-center bg-transparent transition-colors duration-300">
      <div className="w-full h-[240px] md:h-[260px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Optimization for Dark Mode */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400 uppercase font-bold">
            Attendance
          </p>
          <h2 className="text-xl md:text-2xl font-black text-green-600 dark:text-green-500">
            {presentPercent}%
          </h2>
        </div>
      </div>

      {/* Legend Optimization for Dark Mode */}
      <div className="w-full mt-4 space-y-2 text-xs md:text-sm px-2">
        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            Present
          </span>
          <span className="font-semibold text-gray-800 dark:text-slate-100">
            {data.present} ({presentPercent}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            Absent
          </span>
          <span className="font-semibold text-gray-800 dark:text-slate-100">
            {data.absent} ({absentPercent}%)
          </span>
        </div>
      </div>
    </div>
  );
}