import { db } from "../../../../utils/db";
import { GRADES } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const gradeId = Number(id);

    if (isNaN(gradeId)) {
      return NextResponse.json(
        { message: "Invalid grade id" },
        { status: 400 }
      );
    }

    await db.delete(GRADES).where(eq(GRADES.id, gradeId));

    return NextResponse.json({ message: "Grade deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const gradeId = Number(id);
    const body = await req.json();

    if (isNaN(gradeId)) {
      return NextResponse.json(
        { message: "Invalid grade id" },
        { status: 400 }
      );
    }

    await db
      .update(GRADES)
      .set({ grade: body.grade })
      .where(eq(GRADES.id, gradeId));

    return NextResponse.json({ message: "Grade updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}
