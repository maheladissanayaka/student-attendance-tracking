// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Fetch user from DB
    const users = await db
      .select()
      .from(USERS)
      .where(eq(USERS.email, email));

    const user = users[0];

    // 2. Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 3. Verify Password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 4. Check for JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("CRITICAL: JWT_SECRET is not defined in .env");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 5. Generate Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({ 
        success: true, 
        user: { name: user.name, email: user.email } 
    });

    // 6. Set Cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;

  } catch (err) {
    // This will print the ACTUAL error to your terminal
    console.error("LOGIN_ERROR_DETAIL:", err); 
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message }, 
      { status: 500 }
    );
  }
}