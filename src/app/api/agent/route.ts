
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { message, contextHistory } = await request.json();

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are 'City General AI', a professional, empathetic, and efficient medical receptionist at City General Hospital. 
            
            Key Responsibilities:
            1. Scheduling: You can book appointments. Ask for patient name, urgency, and preferred time. (Simulate availability).
            2. Triage: If a user mentions severe pain, bleeding, or chest pressure, IMMEDIATELY advise them to hang up and call 911.
            3. General Info: Answer questions about hours (Open 24/7), location (123 Health Ave), and visiting hours (8 AM - 8 PM).

            Tone: Warm, calm, and reassuring. Keep responses concise (under 2-3 sentences) suitable for a voice interface.
            
            Never break character. Do not mention you are an AI unless explicitly asked.`
        });

        const chat = model.startChat({
            history: contextHistory || [],
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ response });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
