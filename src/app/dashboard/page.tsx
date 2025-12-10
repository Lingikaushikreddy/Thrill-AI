'use client';

import { Activity, Phone, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Total AI Calls', value: '12', limit: '100', icon: Phone, color: 'text-brand-sky', bg: 'bg-brand-sky/10' },
    { label: 'Chatbot Conversations', value: '45', limit: '100', icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Active Campaigns', value: '2', limit: '5', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-medium text-white tracking-tight">Overview</h1>
                    <p className="text-white/50 mt-1">Welcome back, Acme Corp.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                        View Analytics
                    </button>
                    <button className="px-4 py-2 bg-brand-sky text-black rounded-xl text-sm font-bold hover:bg-brand-sky/90 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                        Create New Campaign
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={stat.label}
                        className="bg-[#0F110E] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                                <ArrowUpRight className="w-3 h-3" />
                                +12%
                            </div>
                        </div>

                        <div>
                            <p className="text-white/40 text-sm font-medium mb-1">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-serif font-medium text-white">{stat.value}</h3>
                                <span className="text-white/20 text-sm">/ {stat.limit}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(parseInt(stat.value) / parseInt(stat.limit)) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Mockup */}
            <div className="bg-[#0F110E] border border-white/5 rounded-2xl p-6">
                <header className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                    <button className="text-sm text-brand-sky hover:text-white transition-colors">View All</button>
                </header>

                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xs">
                                    AI
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Outbound Call: Appointment Reminder</p>
                                    <p className="text-xs text-white/40">+91 98765 43210 • 2 mins ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">COMPLETED</span>
                                <span className="text-xs text-white/30">00:45</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
