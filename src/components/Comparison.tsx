'use client';

import { Check, X } from 'lucide-react';
import { FadeIn } from './FadeIn';

const comparisonData = [
    { feature: "Setup Time", standard: "Weeks of configuration", thrill: "Instant (5 minutes)" },
    { feature: "Context Awareness", standard: "Zero (forgets instanty)", thrill: "Full History Retention" },
    { feature: "Channels", standard: "Siloed (WhatsApp only)", thrill: "Unified (Insta + WhatsApp)" },
    { feature: "Voice Capability", standard: "Robotic text-to-speech", thrill: "Human-level Emotion AI" },
    { feature: "Payment Native", standard: "Third-party links", thrill: "Integrated UPI & Receipts" },
];

export function Comparison() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-[#2D2520] mb-4">Why we are the <span className="text-[#FF6B6B]">Better Choice</span></h2>
                        <p className="text-[#5C5C5C]">Don't settle for dumb chatbots. Upgrade to an intelligent agent.</p>
                    </FadeIn>
                </div>

                <FadeIn>
                    <div className="bg-[#FFFDF7] rounded-[32px] border border-[#F5E6D3] overflow-hidden shadow-xl">
                        <div className="grid grid-cols-3 bg-[#FFF5EB] p-6 border-b border-[#F5E6D3]">
                            <div className="font-bold text-[#5C5C5C]">Feature</div>
                            <div className="font-bold text-[#5C5C5C] text-center">Standard Bots</div>
                            <div className="font-bold text-[#FF6B6B] text-center text-xl">Thrill AI</div>
                        </div>

                        {comparisonData.map((row, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-[#F5E6D3]/50 hover:bg-white transition-colors items-center">
                                <div className="font-medium text-[#2D2520]">{row.feature}</div>

                                <div className="text-center text-[#5C5C5C] flex items-center justify-center gap-2">
                                    <X className="w-5 h-5 text-gray-300" />
                                    <span className="opacity-70">{row.standard}</span>
                                </div>

                                <div className="text-center text-[#2D2520] font-bold flex items-center justify-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#FF6B6B] flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span>{row.thrill}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
