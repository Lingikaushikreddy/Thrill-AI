'use client';

import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

const resources = [
    {
        category: "Enterprise",
        title: "How SMEs Scale with AI on WhatsApp",
        desc: "Discover how businesses are leveraging AI-powered WhatsApp automation to grow faster.",
        color: "bg-blue-100 text-blue-700"
    },
    {
        category: "Technology",
        title: "The Future of Voice AI in India",
        desc: "Explore how voice AI is transforming customer engagement across Indian businesses.",
        color: "bg-purple-100 text-purple-700"
    },
    {
        category: "Payments",
        title: "UPI + AI: The New Growth Hack",
        desc: "Learn how combining UPI payments with AI creates seamless customer experiences.",
        color: "bg-green-100 text-green-700"
    }
];

export function Blog() {
    return (
        <section id="blog" className="py-24 bg-[#FFFDF7] border-t border-[#F5E6D3]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-[#2D2520]">Insights & Resources</h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <button className="hidden md:flex items-center gap-2 font-bold text-[#FF6B6B] hover:gap-3 transition-all">
                            View all articles <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {resources.map((post, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="group cursor-pointer">
                                <div className="aspect-[4/3] bg-gray-200 rounded-[24px] mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FFCC5C]/20 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${post.color}`}>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#2D2520] mb-3 group-hover:text-[#FF6B6B] transition-colors">{post.title}</h3>
                                <p className="text-[#5C5C5C] leading-relaxed mb-4">{post.desc}</p>
                                <span className="font-bold text-[#2D2520] underline decoration-[#FF6B6B] decoration-2 underline-offset-4">Read Article</span>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
