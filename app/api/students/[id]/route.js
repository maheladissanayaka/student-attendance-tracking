import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req, context) {
  try {
    const params = await context.params; // ✅ unwrap the promise
    console.log("Params received:", params);

    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid student ID" },
        { status: 400 }
      );
    }

    await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

    return NextResponse.json({ success: true, message: "Student deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params; // ✅ FIX HERE
    const studentId = Number(id);

    if (isNaN(studentId)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    await db
      .update(STUDENTS)
      .set({
        name: body?.name,
        email: body?.email,
        studentId: body?.studentId,
        phone: body?.phone,
        address: body?.address,
        gradeId: Number(body?.gradeId),
      })
      .where(eq(STUDENTS.id, studentId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}