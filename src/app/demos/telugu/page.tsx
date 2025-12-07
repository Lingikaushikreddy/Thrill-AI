'use client';

import { TeluguVoiceAgent } from '@/components/TeluguVoiceAgent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TeluguDemoPage() {
    return (
        <main className="min-h-screen bg-orange-50/50 flex items-center justify-center p-4 relative font-sans">
            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-orange-800/60 hover:text-orange-900 transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-orange-100">
                <ArrowLeft className="w-4 h-4" />
                Back home
            </Link>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <span className="text-orange-600 font-bold bg-orange-100 px-3 py-1 rounded-full text-sm border border-orange-200">తెలుగు డెమో (Telugu Demo)</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2D2520]">
                        హాస్పిటల్ రిసెప్షనిస్ట్ <br />
                        <span className="text-orange-600">AI ఏజెంట్</span>
                    </h1>
                    <p className="text-[#5C5C5C] text-lg leading-relaxed">
                        మాట్లాడి చూడండి! అపాయింట్‌మెంట్ బుక్ చేయడానికి లేదా ఎమర్జెన్సీ కోసం అడగండి.
                        (Try speaking! Ask for an appointment or emergency support.)
                    </p>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                        <h3 className="font-bold text-[#2D2520] mb-3 text-sm uppercase tracking-wide">ప్రయత్నించండి (Try saying):</h3>
                        <ul className="space-y-2 text-[#5C5C5C]">
                            <li className="flex items-center gap-2">"నాకు డాక్టర్ అపాయింట్‌మెంట్ కావాలి" (I want an appointment)</li>
                            <li className="flex items-center gap-2">"గుండె డాక్టర్ ఉన్నారు?" (Is a heart doctor available?)</li>
                            <li className="flex items-center gap-2 text-red-600 font-medium">"ఇది అత్యవసర పరిస్థితి!" (This is an emergency!)</li>
                        </ul>
                    </div>
                </div>

                {/* The Voice Agent Component */}
                <div className="flex justify-center">
                    <TeluguVoiceAgent />
                </div>
            </div>
        </main>
    );
}
