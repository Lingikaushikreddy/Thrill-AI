'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Phone,
    FileText,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Phone, label: 'AI Campaigns', href: '/dashboard/calls' },
    { icon: MessageSquare, label: 'Chatbots', href: '/dashboard/chatbots' },
    { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-sky selection:text-black">
            {/* Background Texture */}
            <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none z-0" />

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F110E]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <span className="font-serif text-xl font-medium tracking-tight">Thrill AI</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F110E] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} pt-24 lg:pt-8 flex flex-col`}>
                <div className="px-6 mb-8 hidden lg:block">
                    <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-glow hover:opacity-80 transition-opacity">
                        Thrill AI
                    </Link>
                    <p className="text-xs text-brand-sky/60 font-mono mt-1 uppercase tracking-wider">Workspace</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-brand-sky/10 text-brand-sky' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-sky' : 'text-white/40 group-hover:text-white'}`} />
                                <span className="font-medium text-sm">{item.label}</span>
                                {isActive && (
                                    <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#38BDF8]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>

                    <div className="mt-4 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-sky to-purple-500" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Acme Corp</p>
                                <p className="text-xs text-white/40 truncate">Starter Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen pt-24 lg:pt-8 p-6 lg:p-10 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
