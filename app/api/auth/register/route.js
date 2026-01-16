// app/api/auth/register/route.js
import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    // 1. Parse and Validate Request Body
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email, and Password are required" }, 
        { status: 400 }
      );
    }

    // 2. Check Database Connection & Existing User
    // Added a more robust check for the user
    const existingUser = await db
      .select()
      .from(USERS)
      .where(eq(USERS.email, email))
      .limit(1); // Performance optimization

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" }, 
        { status: 400 }
      );
    }

    // 3. Hash Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Insert User
    // Note: Ensure your schema defines 'role' as a string/varchar
    await db.insert(USERS).values({
      name: name,
      email: email.toLowerCase(), // Normalize email to lowercase
      password: hashedPassword,
      role: "TEACHER", // Default role
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully" }, 
      { status: 201 }
    );

  } catch (err) {
    // CRITICAL: Log the actual error to your terminal for debugging
    console.error("REGISTRATION_API_ERROR:", err);

    return NextResponse.json(
      { 
        error: "Registration failed", 
        details: err.message // This helps identify if it's a DB connection issue
      }, 
      { status: 500 }
    );
  }
}