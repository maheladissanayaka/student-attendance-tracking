import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. ටෝකනය පරීක්ෂා කිරීම
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { currentPassword, newPassword } = await req.json();

    // 2. දත්තගබඩාවෙන් පරිශීලකයා ලබා ගැනීම
    const users = await db.select().from(USERS).where(eq(USERS.id, decoded.id));
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. වත්මන් මුරපදය නිවැරදි දැයි bcrypt මගින් පරීක්ෂා කිරීම
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "වත්මන් මුරපදය වැරදියි" }, { status: 400 });
    }

    // 4. නව මුරපදය Hash කිරීම
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. දත්තගබඩාව යාවත්කාලීන කිරීම
    await db.update(USERS)
      .set({ password: hashedPassword })
      .where(eq(USERS.id, decoded.id));

    return NextResponse.json({ success: true, message: "Password updated!" });

  } catch (err) {
    console.error("PWD_UPDATE_ERROR:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}