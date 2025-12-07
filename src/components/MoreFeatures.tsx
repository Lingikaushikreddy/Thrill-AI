'use client';

import { FadeIn } from './FadeIn';
import { Inbox, Users, CheckSquare, Sparkles, PieChart, FileText, Workflow, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { GetStartedModal } from './GetStartedModal';

const moreFeatures = [
    { icon: Inbox, title: "Unified Inbox", desc: "Manage all customer conversations from WhatsApp, Instagram, and other channels in one centralized, intelligent inbox." },
    { icon: Users, title: "Smart CRM", desc: "Automatically build comprehensive customer profiles with interaction history and engagement insights." },
    { icon: CheckSquare, title: "AI Task Manager", desc: "Intelligent task creation. AI automatically creates tasks from conversations and suggests priorities." },
    { icon: Sparkles, title: "AI Assistant for Owners", desc: "Your personal AI assistant that helps you manage your business and provides actionable insights." },
    { icon: PieChart, title: "Advanced Analytics", desc: "Real-time insights into conversations, conversions, revenue, and customer behavior patterns." },
    { icon: FileText, title: "Document Automation", desc: "Generate invoices, receipts, quotes, and business documents automatically with AI." },
    { icon: Workflow, title: "Workflow Automation", desc: "Create custom workflows, automate repetitive tasks, and streamline your operations." },
    { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade security with end-to-end encryption, compliance, and data privacy built-in." },
];

export function MoreFeatures() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-24 bg-[#FFFDF7] border-t border-[#F5E6D3]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <FadeIn>
                        <h2 className="text-4xl font-bold mb-4 text-[#2D2520]">And So Much More</h2>
                        <p className="text-xl text-[#5C5C5C]">Additional powerful features to supercharge your business operations</p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {moreFeatures.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.05} className="bg-white p-6 rounded-[24px] border border-[#F5E6D3]/50 hover:border-[#FF6B6B]/30 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF5EB] to-[#FFF] border border-[#F5E6D3] flex items-center justify-center mb-4 text-[#FF6B6B]">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-[#2D2520] mb-2">{item.title}</h3>
                            <p className="text-sm text-[#5C5C5C] leading-relaxed">{item.desc}</p>
                        </FadeIn>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <FadeIn>
                        <h3 className="text-3xl md:text-5xl font-bold text-[#2D2520] mb-6">
                            Your Business Runs on Conversations. <br />
                            <span className="text-[#FF6B6B]">So Does Thrill AI.</span>
                        </h3>
                        <p className="text-xl text-[#5C5C5C] max-w-2xl mx-auto mb-10">
                            Turn every inquiry into a response, every lead into follow-up, and every follow-up into revenue — all inside WhatsApp.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 bg-[#2D2520] text-white rounded-full font-bold text-lg hover:bg-[#FF6B6B] transition-colors shadow-lg"
                        >
                            Start Free Trial
                        </button>
                    </FadeIn>
                </div>

                <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </section>
    );
}
