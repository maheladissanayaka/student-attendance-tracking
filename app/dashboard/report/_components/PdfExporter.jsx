"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PdfExporter({ elementRef, filename }) {
  const [loading, setLoading] = useState(false);

  const exportPdf = async () => {
    if (!elementRef?.current) {
      alert("Table not found! Make sure you are in the browser.");
      return;
    }

    setLoading(true);

    try {
      // Wait a tick to ensure DOM and styles are ready
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename || "report.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert(
        "Failed to generate PDF. Check console and ensure you are in the browser."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={exportPdf}
      className="bg-gray-700 text-white px-3 py-1 rounded mb-2"
      disabled={loading}
    >
      {loading ? "Generating PDF..." : "Export PDF"}
    </button>
  );
}
