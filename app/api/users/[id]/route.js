import { db } from "@/utils/db";
import { USERS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        // ✅ Fix: Await params before accessing id
        const { id } = await params; 
        const data = await req.json();

        // Update MySQL using Drizzle ORM
        const result = await db.update(USERS)
            .set(data)
            .where(eq(USERS.id, id));
            
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("DB_UPDATE_ERROR:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        // ✅ Fix: Await params before accessing id
        const { id } = await params;
        await db.delete(USERS).where(eq(USERS.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}