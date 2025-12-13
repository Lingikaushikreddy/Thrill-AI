import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, company, plan } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const lead = await prisma.lead.create({
            data: {
                email,
                name,
                company,
                plan: plan || 'starter'
            }
        });

        return NextResponse.json({ success: true, lead });
    } catch (error: any) {
        console.error('Request error:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'This email is already registered.' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: `Error: ${error.message || 'Unknown error'}` },
            { status: 500 }
        );
    }
}
