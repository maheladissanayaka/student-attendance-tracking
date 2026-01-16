import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

/* ---------- SAVE / UPDATE ATTENDANCE (FIXED) ---------- */
export async function POST(req) {
  try {
    const body = await req.json();
    // body = [{ studentId, gradeId, day, month, present }]

    await db
      .insert(ATTENDANCE)
      .values(body)
      .onDuplicateKeyUpdate({
        set: {
          present: sql`VALUES(present)`,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Attendance saved successfully",
    });
  } catch (error) {
    console.error("❌ Attendance save error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/* ---------- GET ATTENDANCE / MOST ATTENDED ---------- */
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const gradeId = searchParams.get("gradeId");
  const month = searchParams.get("month");

  // CASE 1: Fetch students for attendance grid
  if (gradeId && !month) {
    const students = await db
      .select({
        id: STUDENTS.id,
        name: STUDENTS.name,
        studentId: STUDENTS.studentId,
      })
      .from(STUDENTS)
      .where(eq(STUDENTS.gradeId, Number(gradeId)));

    return NextResponse.json(students);
  }

  // CASE 2: Fetch most attended students for summary table
  if (month && gradeId) {
    const result = await db.execute(sql`
      SELECT 
        s.name AS studentName,
        COUNT(a.id) AS attendanceCount
      FROM attendance a
      JOIN students s ON s.id = a.student_id
      WHERE a.month = ${month}
        AND s.grade_id = ${Number(gradeId)}
        AND a.present = true
      GROUP BY a.student_id, s.name
      ORDER BY attendanceCount DESC
      LIMIT 5
    `);

    return NextResponse.json(result[0]);
  }

  // Invalid request
  return NextResponse.json(
    { error: "Invalid query parameters" },
    { status: 400 }
  );
}
