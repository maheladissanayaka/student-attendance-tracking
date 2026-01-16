import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await db.select().from(USERS).where(eq(USERS.email, email)).limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Generate Token & Expiry (1 Hour)
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); 

    // 2. Update User Record
    await db.update(USERS)
      .set({ resetToken: token, resetTokenExpiry: expiry })
      .where(eq(USERS.id, user[0].id));

    // 3. Setup Nodemailer (Example using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: '"EduTrack Admin" <no-reply@edutrack.com>',
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset it. This link expires in 1 hour.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}