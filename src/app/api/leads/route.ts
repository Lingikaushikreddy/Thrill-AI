import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json(
            { error: 'Error creating lead' },
            { status: 500 }
        );
    }
}
