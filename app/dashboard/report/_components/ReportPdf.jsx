"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  header: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  table: { display: "table", width: "auto", borderWidth: 1, borderColor: "#000" },
  tableRow: { flexDirection: "row" },
  tableCol: { borderWidth: 1, borderColor: "#000", flexGrow: 1, padding: 4 },
  tableHeaderCol: { borderWidth: 1, borderColor: "#000", flexGrow: 1, padding: 4, fontWeight: "bold" },
});

export function MonthlyReportPdf({ data, month }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Monthly Attendance Report - {month}</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCol}>Student</Text>
            <Text style={styles.tableHeaderCol}>Days Present</Text>
          </View>

          {data.map((r, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCol}>{r.studentName}</Text>
              <Text style={styles.tableCol}>{r.attendanceCount}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export function TopStudentsPdf({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Top Attended Students</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCol}>Student</Text>
            <Text style={styles.tableHeaderCol}>Total Attendance</Text>
          </View>

          {data.map((r, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCol}>{r.studentName}</Text>
              <Text style={styles.tableCol}>{r.total}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
