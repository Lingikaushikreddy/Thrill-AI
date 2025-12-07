'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { GetStartedModal } from './GetStartedModal';

const plans = [
    {
        name: "Starter",
        price: { monthly: "₹999", yearly: "₹9,999" },
        desc: "Launch quickly with essential automation for a single workspace.",
        features: [
            "Smart Chatbot on WhatsApp + Instagram",
            "100 customer conversations/month",
            "100 AI calling reminders/month",
            "25 business documents/month",
            "Automated payments and tracking",
            "Standard support",
            "Basic CRM sync",
            "Multi-language support"
        ],
        highlight: false
    },
    {
        name: "Growth",
        price: { monthly: "₹2,999", yearly: "₹29,999" },
        desc: "Scale your automations with deeper analytics and voice AI coverage.",
        features: [
            "Everything in Starter",
            "1,000 customer conversations/month",
            "200 AI calling reminders/month",
            "600 AI Telecaller calls (In/Out)",
            "100 business documents/month",
            "Priority support",
            "Advanced analytics suite",
            "Custom workflows & routing"
        ],
        highlight: true,
        tag: "Most Popular"
    },
    {
        name: "Enterprise",
        price: { monthly: "₹6,999", yearly: "₹69,999" },
        desc: "Designed for multi-brand, multi-region teams with advanced governance.",
        features: [
            "Everything in Growth",
            "10,000 customer conversations/month",
            "2,000 AI Telecaller calls/month",
            "Unlimited AI Calling Campaigns",
            "200 business documents/month",
            "Custom automation workflows",
            "Dedicated account manager",
            "SLA commitment (99.9%)"
        ],
        highlight: false,
        tag: "Best Value"
    }
];

export function Pricing() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('starter');

    const handleSelectPlan = (planName: string) => {
        setSelectedPlan(planName.toLowerCase());
        setIsModalOpen(true);
    };

    return (
        <section id="pricing" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-[#2D2520] mb-4">Pricing that scales with you</h2>
                        <p className="text-[#5C5C5C] mb-8">Transparent pricing across every stage. Switch plans anytime.</p>

                        <div className="inline-flex items-center p-1 bg-[#F5E6D3] rounded-full relative">
                            <button
                                onClick={() => setBilling('monthly')}
                                className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors ${billing === 'monthly' ? 'bg-white text-[#2D2520] shadow-sm' : 'text-[#5C5C5C]'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBilling('yearly')}
                                className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${billing === 'yearly' ? 'bg-white text-[#2D2520] shadow-sm' : 'text-[#5C5C5C]'}`}
                            >
                                Yearly <span className="text-[10px] bg-[#FF6B6B] text-white px-2 py-0.5 rounded-full">Save 20%</span>
                            </button>
                        </div>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            {plan.highlight && (
                                <div className="bg-[#FF6B6B] text-white text-center text-xs font-bold py-1 rounded-t-2xl uppercase tracking-wider relative -mb-4 pt-4 pb-6 z-0">
                                    {plan.tag}
                                </div>
                            )}

                            <div className={`relative bg-white p-8 rounded-[32px] border-2 transition-transform duration-300 hover:-translate-y-2 z-10 ${plan.highlight ? 'border-[#FF6B6B] shadow-2xl shadow-orange-500/10' : 'border-[#F5E6D3]'}`}>
                                <h3 className="text-2xl font-bold text-[#2D2520] mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-4">
                                    {/* Animate price change */}
                                    <motion.span
                                        key={billing}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-4xl font-bold text-[#2D2520]"
                                    >
                                        {plan.price[billing]}
                                    </motion.span>
                                    <span className="text-[#5C5C5C] mb-1">/{billing === 'monthly' ? 'month' : 'year'}</span>
                                </div>
                                <p className="text-[#5C5C5C] text-sm mb-8 min-h-[40px]">{plan.desc}</p>

                                <button
                                    onClick={() => handleSelectPlan(plan.name)}
                                    className={`w-full py-3 rounded-full font-bold mb-8 transition-colors ${plan.highlight ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFCC5C] text-white shadow-lg' : 'bg-[#FFFDF7] border border-[#F5E6D3] text-[#2D2520] hover:bg-[#FF6B6B] hover:text-white hover:border-transparent'}`}
                                >
                                    {billing === 'monthly' ? 'Start Free Trial' : 'Contact Sales'}
                                </button>

                                <ul className="space-y-4">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-[#5C5C5C]">
                                            <Check className="w-5 h-5 text-[#FF6B6B] shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <div className="mt-16 bg-[#2D2520] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B6B]/20 rounded-full blur-[80px]" />

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Need a custom rollout?</h3>
                        <p className="text-gray-300 max-w-md">From multi-brand setups to on-premise deployments, our enterprise success squad will co-design a plan.</p>
                    </div>

                    <button className="relative z-10 px-8 py-3 bg-white text-[#2D2520] rounded-full font-bold hover:bg-[#FFCC5C] transition-colors">
                        Talk to Solutions
                    </button>
                </div>

                <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plan={selectedPlan} />
            </div>
        </section>
    );
}
