import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/utils/db"; // 👈 Database එක import කරන්න
import { USERS } from "@/utils/schema"; // 👈 Schema එක import කරන්න
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const users = await db
      .select({
        id: USERS.id,
        name: USERS.name,
        email: USERS.email,
        role: USERS.role,
        image: USERS.image, 
      })
      .from(USERS)
      .where(eq(USERS.id, decoded.id));

    const dbUser = users[0];

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Database එකේ ඇති අලුත්ම දත්ත response එක ලෙස යවන්න
    return NextResponse.json({
      user: dbUser,
    });

  } catch (err) {
    console.error("AUTH_ME_ERROR:", err.message);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}