'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User, Bot, Sparkles, Play } from 'lucide-react';

const scenarios = [
    {
        id: 'booking',
        name: 'Appointment Booking',
        messages: [
            { role: 'user', text: "Hi, I'd like to book a consultation." },
            { role: 'ai', text: "Hello! I'd be happy to help with that. We have slots available tomorrow at 10 AM and 2 PM. Which one works for you?" },
            { role: 'user', text: "10 AM please." },
            { role: 'ai', text: "Great! I've locked in 10 AM tomorrow. I'll send a confirmation to your email. Anything else?" }
        ]
    },
    {
        id: 'product',
        name: 'Product Query',
        messages: [
            { role: 'user', text: "Do you offer enterprise discounts?" },
            { role: 'ai', text: "Yes, we do! For teams larger than 10, we offer a 20% discount on the annual plan. Would you like a custom quote?" },
            { role: 'user', text: "Yes, send it over." },
            { role: 'ai', text: "Done! I've generated a quote for your team size. Check your WhatsApp for the PDF link. 📄" }
        ]
    },
    {
        id: 'support',
        name: 'Customer Support',
        messages: [
            { role: 'user', text: "My order #12345 hasn't arrived yet." },
            { role: 'ai', text: "Let me check that for you... 🔍 It looks like Order #12345 is out for delivery today! You should receive it by 5 PM." },
            { role: 'user', text: "Oh perfect, thanks!" },
            { role: 'ai', text: "You're welcome! Let me know if you need help with anything else. Have a great day! ☀️" }
        ]
    }
];

export function InteractiveDemo() {
    const [activeScenario, setActiveScenario] = useState(scenarios[0]);
    const [key, setKey] = useState(0); // To force re-render animation

    const handleScenarioChange = (scenario: typeof scenarios[0]) => {
        setActiveScenario(scenario);
        setKey(prev => prev + 1);
    };

    return (
        <section className="py-24 bg-[#FFFDF7] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Context */}
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-[#FF6B6B] font-bold text-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Live Intelligence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2D2520] mb-6">
                        See Thrill AI in <br /> <span className="text-[#FF6B6B]">Action.</span>
                    </h2>
                    <p className="text-xl text-[#5C5C5C] mb-8">
                        Experience how our AI handles real-world business conversations. It's not just a chatbot; it's a sales agent, support rep, and scheduler all in one.
                    </p>

                    <div className="space-y-4">
                        {scenarios.map((scenario) => (
                            <button
                                key={scenario.id}
                                onClick={() => handleScenarioChange(scenario)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${activeScenario.id === scenario.id ? 'bg-white border-[#FF6B6B] shadow-lg shadow-orange-500/10' : 'bg-transparent border-[#F5E6D3] hover:border-[#FFCC5C]'}`}
                            >
                                <span className={`font-bold text-lg ${activeScenario.id === scenario.id ? 'text-[#2D2520]' : 'text-[#5C5C5C]'}`}>
                                    {scenario.name}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeScenario.id === scenario.id ? 'bg-[#FF6B6B] text-white' : 'bg-[#F5E6D3] text-[#5C5C5C] group-hover:bg-[#FFCC5C] group-hover:text-white'}`}>
                                    <Play className="w-4 h-4 fill-current" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Phone Simulator */}
                <div className="relative mx-auto w-full max-w-sm">
                    {/* Phone Frame */}
                    <div className="bg-white rounded-[48px] border-[8px] border-[#2D2520] shadow-2xl overflow-hidden relative h-[600px] flex flex-col">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2D2520] rounded-b-2xl z-20" />

                        {/* Header */}
                        <div className="bg-[#075E54] p-4 pt-8 flex items-center gap-3 text-white z-10 shadow-sm relative">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold">Thrill AI Agent</div>
                                <div className="text-xs opacity-80">Online</div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 bg-[#E5DDD5] p-4 overflow-y-auto space-y-4 relative">
                            <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]" />

                            <AnimatePresence mode='wait'>
                                <div key={key}>
                                    {activeScenario.messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: i * 1.5, duration: 0.4 }}
                                            className={`flex w-full mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm md:text-base shadow-sm relative z-10 ${msg.role === 'user' ? 'bg-[#DCF8C6] rounded-tr-none text-[#2D2520]' : 'bg-white rounded-tl-none text-[#2D2520]'}`}>
                                                {msg.text}
                                                <div className="text-[10px] text-gray-500 text-right mt-1">
                                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Typing Indicator for fun */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ delay: activeScenario.messages.length * 1.5, duration: 1.5, repeat: 1 }}
                                        className="flex items-center gap-1 ml-2 mt-2"
                                    >
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </motion.div>
                                </div>
                            </AnimatePresence>
                        </div>

                        {/* Input Area */}
                        <div className="bg-white p-3 flex items-center gap-2 border-t border-gray-100 z-10">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <span className="text-xl">+</span>
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">
                                Type a message...
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                                <Send className="w-5 h-5 ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background for Phone */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-gradient-to-tr from-[#FF6B6B]/20 to-[#FFCC5C]/20 rounded-full blur-[80px]" />
                </div>
            </div>
        </section>
    );
}
