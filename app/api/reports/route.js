import { db } from "@/utils/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const gradeId = searchParams.get("gradeId");
  const type = searchParams.get("type");

  if (type === "monthly") {
    const res = await db.execute(sql`
      SELECT s.name AS studentName, COUNT(a.id) attendanceCount
      FROM attendance a
      JOIN students s ON s.id = a.student_id
      WHERE a.month=${month} AND s.grade_id=${gradeId}
      GROUP BY s.name
    `);
    return NextResponse.json(res[0]);
  }

  if (type === "top") {
    const res = await db.execute(sql`
      SELECT s.name AS studentName, COUNT(a.id) total
      FROM attendance a
      JOIN students s ON s.id = a.student_id
      WHERE s.grade_id=${gradeId} AND a.present=true
      GROUP BY s.name
      ORDER BY total DESC
    `);
    return NextResponse.json(res[0]);
  }
}
