import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ATTENDANCE, STUDENTS, GRADES } from "@/utils/schema";
import { sql, eq, and } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const gradeId = searchParams.get("gradeId");

  /* ---------- TOTAL STUDENTS ---------- */
  const totalStudents = await db
    .select({ count: sql`COUNT(*)` })
    .from(STUDENTS)
    .where(gradeId ? eq(STUDENTS.gradeId, Number(gradeId)) : undefined);

  /* ---------- TOTAL GRADES ---------- */
  const totalGrades = await db
    .select({ count: sql`COUNT(*)` })
    .from(GRADES);

  /* ---------- PRESENT / ABSENT ---------- */
  const attendance = await db.execute(sql`
    SELECT
      SUM(CASE WHEN present = true THEN 1 ELSE 0 END) AS present,
      SUM(CASE WHEN present = false THEN 1 ELSE 0 END) AS absent
    FROM attendance
    ${month ? sql`WHERE month = ${month}` : sql``}
    ${gradeId ? sql`AND grade_id = ${Number(gradeId)}` : sql``}
  `);

  /* ---------- GRADE-WISE BAR CHART ---------- */
  const barData = await db.execute(sql`
    SELECT
      g.grade AS grade,
      SUM(CASE WHEN a.present = true THEN 1 ELSE 0 END) AS present,
      SUM(CASE WHEN a.present = false THEN 1 ELSE 0 END) AS absent
    FROM attendance a
    JOIN grades g ON g.id = a.grade_id
    ${month ? sql`WHERE a.month = ${month}` : sql``}
    ${gradeId ? sql`AND a.grade_id = ${Number(gradeId)}` : sql``}
    GROUP BY g.grade
  `);

  const p = Number(attendance[0][0].present || 0);
  const a = Number(attendance[0][0].absent || 0);
  const avg = p + a === 0 ? 0 : Math.round((p / (p + a)) * 100);

  return NextResponse.json({
    cards: {
      totalStudents: totalStudents[0].count,
      totalGrades: totalGrades[0].count,
      avgAttendance: `${avg}%`,
      absentRate: `${100 - avg}%`,
    },
    donut: { present: p, absent: a },
    bar: barData[0],
  });
}
