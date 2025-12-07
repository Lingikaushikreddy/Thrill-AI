'use client';

import { VoiceReceptionist } from '@/components/VoiceReceptionist';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HospitalDemoPage() {
    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative">
            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <span className="text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full text-sm border border-teal-100">Live Demo</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                        Hospital <br /> Receptionist API
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Try speaking naturally. Ask to book an appointment, check availability for Cardiology, or report an emergency to see how the AI handles triage.
                    </p>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Try saying:</h3>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-center gap-2">"I need to see a heart doctor."</li>
                            <li className="flex items-center gap-2">"Book an appointment for tomorrow."</li>
                            <li className="flex items-center gap-2">"This is a medical emergency!"</li>
                        </ul>
                    </div>
                </div>

                {/* The Voice Agent Component */}
                <div className="flex justify-center">
                    <VoiceReceptionist />
                </div>
            </div>
        </main>
    );
}
