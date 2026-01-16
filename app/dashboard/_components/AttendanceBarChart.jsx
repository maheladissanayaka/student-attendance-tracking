"use client";

import React from "react";
// ✅ FIXED: Added missing imports from recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AttendanceBarChart({ data }) {
  return (
    <div className="w-full h-full overflow-hidden transition-colors duration-300">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {/* Axis colors optimized for visibility in both light and dark modes */}
          <XAxis 
            dataKey="grade" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          
          {/* Tooltip styled with rounded corners for your modern dashboard design */}
          <Tooltip 
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              backgroundColor: 'white',
              color: '#1e293b'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
          />
          
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
          
          {/* Bar colors chosen for high contrast */}
          <Bar dataKey="present" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Present" />
          <Bar dataKey="absent" fill="#2dd4bf" radius={[4, 4, 0, 0]} name="Absent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}