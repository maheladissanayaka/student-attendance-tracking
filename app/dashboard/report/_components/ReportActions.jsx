"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MonthlyReportPdf, TopStudentsPdf } from "./ReportPdf";

export default function ReportActions({ monthlyData, topData, month }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {monthlyData.length > 0 && (
        <PDFDownloadLink
          document={<MonthlyReportPdf data={monthlyData} month={month} />}
          fileName={`Monthly-Attendance-${month}.pdf`}
          className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl text-center text-sm font-bold transition-all active:scale-95"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Monthly PDF")}
        </PDFDownloadLink>
      )}

      {topData.length > 0 && (
        <PDFDownloadLink
          document={<TopStudentsPdf data={topData} />}
          fileName={`Top-Students.pdf`}
          className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-center text-sm font-bold transition-all active:scale-95"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download Top Students PDF")}
        </PDFDownloadLink>
      )}
    </div>
  );
}