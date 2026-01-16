import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const result = await db.select().from(USERS).orderBy(desc(USERS.id));
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json();

        // 1. Check if user already exists
        const existingUser = await db.select().from(USERS).where(eq(USERS.email, email));
        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // 2. Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert into MySQL with default ACTIVE status
        await db.insert(USERS).values({
            name,
            email,
            password: hashedPassword,
            role: role || "TEACHER",
            status: "ACTIVE", // Default status for new staff
        });

        return NextResponse.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("REGISTRATION_ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}