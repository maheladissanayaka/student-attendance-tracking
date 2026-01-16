import { NextResponse } from 'next/server';
import { db } from '@/utils/db'; 
import { SCHOOL_RULES } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    const result = await db.select().from(SCHOOL_RULES).limit(1);
    return NextResponse.json({ data: result[0] });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const existing = await db.select().from(SCHOOL_RULES).limit(1);
        
        let result;
        if (existing.length > 0) {
            result = await db.update(SCHOOL_RULES)
                .set({ lateThreshold: body.lateThreshold })
                .where(eq(SCHOOL_RULES.id, existing[0].id));
        } else {
            result = await db.insert(SCHOOL_RULES).values({
                lateThreshold: body.lateThreshold
            });
        }
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}