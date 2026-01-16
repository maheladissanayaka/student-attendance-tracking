import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { STUDENTS, GRADES } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();

    await db.insert(STUDENTS).values({
      name: body?.name,
      email: body?.email || null,
      studentId: body?.studentId,
      phone: body?.phone || null,
      address: body?.address || null,
      gradeId: Number(body?.gradeId), // 👈 VERY IMPORTANT
    });

    return NextResponse.json({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    console.error("❌ Student insert error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/* ---------------- GET STUDENTS ---------------- */
export async function GET() {
  try {
    const students = await db
      .select({
        id: STUDENTS.id,
        name: STUDENTS.name,
        email: STUDENTS.email,
        studentId: STUDENTS.studentId,
        phone: STUDENTS.phone,
        address: STUDENTS.address,
        grade: GRADES.grade,
        gradeId: STUDENTS.gradeId,
      })
      .from(STUDENTS)
      .leftJoin(GRADES, eq(STUDENTS.gradeId, GRADES.id))
      .orderBy(STUDENTS.id);

    return NextResponse.json(students);
  } catch (error) {
    console.error("❌ Fetch students error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

