import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ATTENDANCE } from "@/utils/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const month = searchParams.get("month");
  const gradeId = Number(searchParams.get("gradeId"));

  const data = await db
    .select()
    .from(ATTENDANCE)
    .where(
      and(
        eq(ATTENDANCE.month, month),
        eq(ATTENDANCE.gradeId, gradeId)
      )
    );

  return NextResponse.json(data);
}
