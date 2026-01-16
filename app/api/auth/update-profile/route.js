import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name } = await req.json();

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    // Database එකෙහි නම Update කිරීම
    await db.update(USERS)
      .set({ name: name })
      .where(eq(USERS.id, decoded.id));

    return NextResponse.json({ success: true, message: "Name updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}