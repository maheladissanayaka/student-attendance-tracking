import { db } from "../../../utils/db";
import { GRADES } from "../../../utils/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const grades = await db.select().from(GRADES);
    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch grades" },
      { status: 500 }
    );
  }
}

// ADD THIS POST METHOD 👇
export async function POST(req) {
  try {
    const body = await req.json();

    // Insert new grade into the database
    const result = await db.insert(GRADES).values({
      grade: body.grade,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Class added successfully",
      data: result 
    });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create class" },
      { status: 500 }
    );
  }
}
