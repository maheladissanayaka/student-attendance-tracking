// app/api/auth/reset-password/route.js
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { eq, and, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req) { // ✅ Must be uppercase POST
  try {
    const { token, newPassword } = await req.json();

    // 1. Find valid, non-expired token
    const user = await db.select().from(USERS).where(
      and(
        eq(USERS.resetToken, token),
        gt(USERS.resetTokenExpiry, new Date())
      )
    ).limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // 2. Hash new password and clear token
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(USERS)
      .set({ 
        password: hashedPassword, 
        resetToken: null, 
        resetTokenExpiry: null 
      })
      .where(eq(USERS.id, user[0].id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}