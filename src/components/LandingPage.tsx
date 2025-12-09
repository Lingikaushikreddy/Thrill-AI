'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, History, Layers, Zap, CreditCard, Gem, Globe, ShieldCheck } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import pricingData from '@/data/pricing.json';

export function LandingPage() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const [billing, setBilling] = React.useState<'monthly' | 'yearly'>('monthly');

    useEffect(() => {
        // Spotlight effect logic
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.spotlight-card');
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative overflow-x-hidden min-h-screen font-sans text-white bg-brand-dark selection:bg-brand-sky selection:text-black">

            {/* Background Effects */}
            <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

            {/* Navigation */}
            <nav className="fixed -translate-x-1/2 flex shadow-black/50 transition-all duration-300 hover:border-white/20 hover:shadow-brand-sky/5 bg-gradient-to-br from-white/10 to-white/0 w-fit max-w-[90vw] z-50 rounded-full ring-white/10 ring-1 pt-1.5 pr-1.5 pb-1.5 pl-4 top-6 left-1/2 shadow-2xl backdrop-blur-xl items-center justify-between">
                <div className="flex gap-2.5 items-center mr-8">
                    <AnimatedLogo />
                    <span className="font-sans font-medium text-base tracking-tight text-white">Thrill AI</span>
                </div>

                <div className="hidden md:flex items-center gap-6 mr-8">
                    <Link href="#features" className="text-xs font-medium text-white/50 hover:text-white transition-colors">Features</Link>
                    <Link href="#solutions" className="text-xs font-medium text-white/50 hover:text-white transition-colors">Solutions</Link>
                    <Link href="#pricing" className="text-xs font-medium text-white/50 hover:text-white transition-colors">Pricing</Link>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-brand-sky transition-colors group">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </nav>

            <main className="container lg:px-12 lg:pt-0 min-h-[1100px] flex flex-col lg:flex-row z-10 mx-auto pt-0 pr-6 pl-6 relative items-center">
                {/* Left Column: Copy */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center pt-32 pb-20 lg:py-0 mt-20 lg:mt-0">
                    <h4 className="text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-8 flex items-center gap-2 animate-[var(--animate-enter)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sky"></span>
                        </span>
                        Voice System Operational
                    </h4>

                    <h1 className="lg:text-7xl leading-[1.1] text-brand-sky text-glow text-5xl italic tracking-tight font-serif mb-6 animate-[var(--animate-enter-delay-1)]">
                        Architect your CX <br />
                        <span className="text-white opacity-90">with absolute precision.</span>
                    </h1>

                    <p className="font-sans text-xl lg:text-2xl font-light text-white/70 leading-relaxed tracking-tight max-w-xl mb-12 animate-[var(--animate-enter-delay-2)]">
                        Advanced voice protocols merged with intuitive design. We provide the infrastructure to accelerate your customer engagement.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 gap-x-6 gap-y-6 items-start sm:items-center animate-[var(--animate-enter-delay-3)]">
                        <button className="shiny-cta focus:outline-none">
                            <span>Initialize Agent</span>
                        </button>

                        <button className="hover:bg-white/10 hover:text-white transition-all flex text-sm font-medium text-slate-300 bg-white/5 rounded-full pt-3 pr-6 pb-3 pl-6 gap-x-2 gap-y-2 items-center group relative border border-white/5 overflow-hidden">
                            <span className="text-sm font-medium tracking-tight">View Demo</span>
                            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Right Column: Visualization */}
                <div className="lg:w-1/2 lg:h-[800px] flex w-full h-[500px] relative perspective-1000 items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 600 600">
                        <g>
                            <path d="M -50 150 C 100 150, 100 300, 300 300" fill="none" stroke="white" strokeWidth="1" className="opacity-[0.08]"></path>
                            <path d="M -50 150 C 100 150, 100 300, 300 300" fill="none" stroke="#38BDF8" strokeWidth="1.5" className="beam-line animate-beam opacity-60"></path>
                        </g>
                        <g>
                            <path d="M -50 450 C 100 450, 100 300, 300 300" fill="none" stroke="white" strokeWidth="1" className="opacity-[0.08]"></path>
                            <path d="M -50 450 C 100 450, 100 300, 300 300" fill="none" stroke="#38BDF8" strokeWidth="1.5" className="beam-line animate-beam opacity-60" style={{ animationDelay: '-1s' }}></path>
                        </g>
                        <g>
                            <path d="M 650 100 C 500 100, 500 300, 300 300" fill="none" stroke="white" strokeWidth="1" className="opacity-[0.08]"></path>
                            <path d="M 650 100 C 500 100, 500 300, 300 300" fill="none" stroke="#38BDF8" strokeWidth="1.5" className="beam-line animate-beam opacity-60" style={{ animationDelay: '-2s' }}></path>
                        </g>
                        <g transform="translate(300, 300)">
                            <circle r="20" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.5" className="animate-sonar-wave"></circle>
                            <circle r="65" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="10 20" className="animate-spin-slow"></circle>
                            <circle r="45" fill="none" stroke="#38BDF8" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 6" className="animate-spin-slow-reverse"></circle>
                            <circle r="8" fill="#0A0A0A" stroke="#38BDF8" strokeWidth="2"></circle>
                            <circle r="4" fill="#38BDF8" className="animate-pulse-fast"></circle>
                        </g>
                    </svg>

                    <div className="absolute top-[20%] lg:top-[25%] left-[10%] lg:left-[15%] flex flex-col items-end">
                        <span className="text-xs font-mono text-brand-sky tracking-widest mb-1 opacity-80">LATENCY &lt; 200ms</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-brand-sky to-transparent"></div>
                    </div>

                    <div className="absolute bottom-[20%] lg:bottom-[25%] right-[10%] lg:right-[15%] flex flex-col items-start">
                        <span className="text-xs font-mono text-brand-sky tracking-widest mb-1 opacity-80">MULTILINGUAL NATIVE</span>
                        <div className="h-[1px] w-12 bg-gradient-to-r from-brand-sky to-transparent"></div>
                    </div>
                </div>

                {/* Marquee Section */}
                <div className="w-[95%] z-20 pb-8 absolute bottom-0 lg:bottom-10">
                    <div className="flex flex-col lg:flex-row overflow-hidden opacity-50 w-full pt-6 gap-x-6 gap-y-6 items-center justify-between">
                        <div className="flex-1 overflow-hidden w-full relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                            <div className="flex animate-[marquee_40s_linear_infinite] w-max gap-x-32 gap-y-16 items-center">
                                {/* Replace specific logos with generic tech/finance logos or text for now to save SVG space */}
                                <p className="text-xl font-serif italic opacity-50">Vercel</p>
                                <p className="text-xl font-serif italic opacity-50">OpenAI</p>
                                <p className="text-xl font-serif italic opacity-50">Anthropic</p>
                                <p className="text-xl font-serif italic opacity-50">Stripe</p>
                                <p className="text-xl font-serif italic opacity-50">AWS</p>
                                <p className="text-xl font-serif italic opacity-50">Google Cloud</p>
                                <p className="text-xl font-serif italic opacity-50">Vercel</p>
                                <p className="text-xl font-serif italic opacity-50">OpenAI</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-white/30 text-xs font-mono shrink-0 relative z-10 pl-4 lg:bg-transparent lg:pl-0">
                            <span className="text-white tracking-wide">[ <span className="text-brand-sky">✓</span> ] TRUSTED BY INDUSTRY LEADERS</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="flex flex-col overflow-hidden lg:px-12 z-10 bg-black/50 w-full border-white/5 border-t pt-32 pr-6 pb-32 pl-6 relative backdrop-blur-3xl items-center" id="features">
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="flex flex-col items-center text-center max-w-3xl mb-24 relative z-10">
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-48 w-6 overflow-hidden flex justify-center">
                        <svg className="h-full w-full" viewBox="0 0 6 192" fill="none">
                            <path d="M3 0V192" stroke="url(#header-beam)" strokeWidth="1.5" strokeLinecap="round" className="beam-line animate-beam opacity-70"></path>
                        </svg>
                    </div>

                    <div className="flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sky"></span>
                        </span>
                        <span className="text-xs font-mono text-brand-sky uppercase tracking-[0.2em] font-medium">System Capabilities</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white mb-8">
                        Voice intelligence <br />
                        <span className="text-white/60">made effortless.</span>
                    </h2>

                    <p className="text-xl text-white/60 leading-relaxed max-w-2xl font-light tracking-tight">
                        Streamline your operations with AI-driven voice agents designed to simplify, automate, and enhance your customer interactions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 z-10 w-full max-w-7xl relative gap-x-6 gap-y-6" ref={cardsRef} id="features-grid">

                    {/* Card 1: Automated Execution */}
                    <div className="spotlight-card group relative flex flex-col p-10 rounded-[32px] border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500">
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)' }}></div>
                        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-brand-sky/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ maskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)', WebkitMaskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)' }}></div>

                        <h3 className="text-2xl font-semibold tracking-tight text-white mb-4 relative z-10">Automated Receptionists</h3>
                        <p className="text-base text-white/50 leading-relaxed mb-12 relative z-10 font-light">
                            Handle thousands of calls simultaneously with zero wait times. Route customers, book appointments, and answer queries 24/7.
                        </p>

                        <div className="relative z-10 mt-auto w-full h-72 rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-col shadow-2xl">
                            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                                <span className="text-xs text-white/30 font-mono">THRILL_OS v2.1</span>
                            </div>
                            <div className="p-6 flex flex-col gap-5 relative h-full">
                                <div className="self-end max-w-[90%] bg-white/10 backdrop-blur-sm rounded-2xl rounded-tr-sm p-4 border border-white/5">
                                    <p className="text-xs text-white/90 font-light leading-relaxed">I'd like to book an appointment for tomorrow.</p>
                                </div>
                                <div className="self-start max-w-[90%] bg-white/[0.03] backdrop-blur-md rounded-2xl rounded-tl-sm p-5 border border-white/10 relative overflow-hidden group-hover:border-brand-sky/20 transition-colors duration-500">
                                    <div className="flex items-center gap-2 mb-3 text-brand-sky font-mono text-[10px] uppercase tracking-wider">
                                        <Zap className="w-3 h-3" /> Thrill Agent
                                    </div>
                                    <p className="mb-4 text-xs text-white/80 font-light">Checking availability... I have a slot at 2 PM. Shall I confirm?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Multilingual Support */}
                    <div className="spotlight-card relative flex flex-col p-[1px] rounded-[32px] overflow-hidden lg:-mt-8 lg:mb-8 z-20 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-[32px]"></div>
                        <div className="absolute inset-0 bg-[#050505] rounded-[31px] m-[1px] overflow-hidden">
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)' }}></div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-brand-sky/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50" style={{ maskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)', WebkitMaskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)' }}></div>

                        <div className="relative z-10 flex flex-col h-full p-10 group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-brand-sky/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <Globe className="w-6 h-6 text-brand-sky relative z-10" />
                                </div>
                                <h3 className="text-2xl font-semibold tracking-tight text-white group-hover:text-white transition-colors">Multilingual Native</h3>
                            </div>
                            <p className="text-base text-white/50 leading-relaxed mb-12 font-light group-hover:text-white/70 transition-colors">
                                Connect with customers in their native language—Hindi, Telugu, English, and more. Our agents switch context instantly.
                            </p>

                            <div className="mt-auto relative w-full h-80 flex items-center justify-center perspective-1000">
                                {/* Abstract Globe/Network Visual */}
                                <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-[spin_40s_linear_infinite]"></div>
                                <div className="absolute w-60 h-60 border border-white/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
                                <div className="absolute w-36 h-36 border border-brand-sky/20 rounded-full animate-[spin_15s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="z-10 flex group-hover:border-brand-sky/40 transition-colors duration-500 bg-[#0F110E] w-24 h-24 border-white/10 border rounded-3xl relative items-center justify-center overflow-hidden shadow-2xl">
                                    <Layers className="w-8 h-8 text-white relative z-20 group-hover:text-brand-sky transition-colors duration-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Enterprise Security */}
                    <div className="spotlight-card group relative flex flex-col p-10 rounded-[32px] border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500">
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)' }}></div>
                        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-brand-sky/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ maskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)', WebkitMaskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)' }}></div>

                        <h3 className="text-2xl font-semibold tracking-tight text-white mb-4 relative z-10">Enterprise Security</h3>
                        <p className="text-base text-white/50 leading-relaxed mb-12 relative z-10 font-light">
                            Bank-grade data protection. Manage permissions, audit logs, and secure customer data with SOC2 Type II compliance standards.
                        </p>

                        <div className="relative mt-auto w-full h-72 rounded-2xl border border-white/10 bg-[#0A0A0A] p-7 flex flex-col justify-center gap-6 shadow-2xl">
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-none"></span>
                                    <span className="text-xs text-white/50 font-mono uppercase tracking-wider">Secure_Vault</span>
                                </div>
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="relative py-1">
                                <div className="flex justify-between text-[10px] text-white/40 mb-2 font-mono uppercase">
                                    <span>Encryption Status</span>
                                    <span className="text-brand-sky">AES-256</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full relative overflow-hidden">
                                    <div className="absolute left-0 h-full w-[100%] bg-emerald-500/50 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 relative z-10">
                    <button className="group relative px-9 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-[#e5e5e5] flex items-center gap-3 overflow-hidden tracking-tight">
                        <span className="relative z-10">Explore Capabilities</span>
                        <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
                    </button>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-24 relative z-10 container px-6 mx-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">Why we are the <span className="text-brand-sky">Better Choice</span></h2>
                        <p className="text-xl text-white/50 font-light">Don't settle for dumb chatbots. Upgrade to an intelligent agent.</p>
                    </div>

                    <div className="relative rounded-[32px] border border-white/10 bg-[#0A0A0A] overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        {/* Header */}
                        <div className="grid grid-cols-3 p-8 border-b border-white/5 relative bg-white/[0.02]">
                            <div className="text-sm font-mono text-white/40 uppercase tracking-wider">Feature</div>
                            <div className="text-sm font-mono text-white/40 uppercase tracking-wider text-center">Standard Bots</div>
                            <div className="text-sm font-mono text-brand-sky uppercase tracking-wider text-center font-bold">Thrill AI</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-white/5 relative">
                            {[
                                { feature: "Setup Time", standard: "Weeks of configuration", thrill: "Instant (5 minutes)", check: true },
                                { feature: "Context Awareness", standard: "Zero (forgets instantly)", thrill: "Full History Retention", check: true },
                                { feature: "Channels", standard: "Siloed (WhatsApp only)", thrill: "Unified (Insta + WhatsApp)", check: true },
                                { feature: "Voice Capability", standard: "Robotic text-to-speech", thrill: "Human-level Emotion AI", check: true },
                                { feature: "Payment Native", standard: "Third-party links", thrill: "Integrated UPI & Receipts", check: true }
                            ].map((item, idx) => (
                                <div key={idx} className="grid grid-cols-3 p-6 items-center hover:bg-white/[0.02] transition-colors group">
                                    <div className="font-medium text-white/80">{item.feature}</div>
                                    <div className="text-white/40 flex items-center justify-center gap-2 text-sm">
                                        <span className="text-red-500/50">✕</span> {item.standard}
                                    </div>
                                    <div className="text-white flex items-center justify-center gap-2 font-medium relative">
                                        <div className="absolute inset-0 bg-brand-sky/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <CheckCircle2 className="w-5 h-5 text-brand-sky fill-brand-sky/10 relative z-10" />
                                        <span className="relative z-10">{item.thrill}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 relative z-10 flex flex-col items-center">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="container px-6 mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">Transparent access.</h2>
                        <p className="text-xl text-white/50 font-light">Choose the infrastructure capacity that fits your scale.</p>

                        <div className="mt-8 inline-flex items-center p-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            <button
                                onClick={() => setBilling('monthly')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-brand-sky text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'text-white/50 hover:text-white'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBilling('yearly')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billing === 'yearly' ? 'bg-brand-sky text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'text-white/50 hover:text-white'}`}
                            >
                                Yearly <span className="text-[10px] bg-white text-black px-1.5 py-0.5 rounded-full font-bold">-20%</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingData.map((plan) => (
                            <div key={plan.id} className={`spotlight-card group relative p-8 rounded-[32px] border bg-[#050505] overflow-hidden transition-all duration-300 ${plan.highlight ? 'border-brand-sky/30 shadow-[0_0_30px_rgba(56,189,248,0.1)]' : 'border-white/10'}`}>
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.04), transparent 40%)' }}></div>

                                {plan.highlight && (
                                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-sky to-transparent opacity-50"></div>
                                )}

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-8">
                                        {plan.highlight && (
                                            <span className="inline-block px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-mono mb-4 tracking-wide uppercase">
                                                {plan.tag}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-serif text-white">{plan.price[billing]}</span>
                                            <span className="text-white/40 text-sm">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                                        </div>
                                        <p className="text-white/40 text-sm mt-4 font-light leading-relaxed">{plan.description}</p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-white/70 font-light">
                                                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-brand-sky' : 'text-white/40'}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-3 rounded-full text-sm font-medium transition-all ${plan.highlight ? 'bg-brand-sky text-black hover:bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                        {billing === 'monthly' ? 'Start Free Trial' : 'Contact Sales'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="lg:px-12 flex flex-col z-10 overflow-hidden bg-[#030303] w-full border-white/5 border-t pt-12 pr-6 pb-12 pl-6 relative items-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_200px] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%)' }}></div>

                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
                    <div className="lg:col-span-3 flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <AnimatedLogo />
                            <span className="font-serif font-medium text-2xl tracking-tight text-white">Thrill AI</span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-[280px] font-light">
                            Engineering the bedrock of the programmable voice economy. Secure, scalable, and instant.
                        </p>
                        <span className="text-white/20 text-xs font-mono tracking-wide">© 2024 Thrill AI. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
