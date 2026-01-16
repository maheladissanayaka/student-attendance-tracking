import { NextResponse } from 'next/server';
import { db } from '@/utils/db'; // ✅ Update path to your actual db.js location
import { ANNOUNCEMENTS } from '@/utils/schema'; // ✅ Import your schema
import { desc } from 'drizzle-orm';

// GET: Fetch all announcements ordered by newest first
export async function GET() {
    try {
        const result = await db.select().from(ANNOUNCEMENTS)
            .orderBy(desc(ANNOUNCEMENTS.createdAt));
            
        return NextResponse.json({ data: result });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// POST: Save a new announcement
export async function POST(req) {
    try {
        const body = await req.json();
        const result = await db.insert(ANNOUNCEMENTS).values({
            title: body.title,
            body: body.body,
            date: body.date,
        });
        
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}