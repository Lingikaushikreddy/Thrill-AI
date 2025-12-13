'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GetStartedModal } from './GetStartedModal';

export function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="fixed top-0 w-full z-50 bg-[#FFFDF7]/60 backdrop-blur-xl border-b border-[#F5E6D3]/50"
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group" aria-label="Thrill AI Home">
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-orange-500/20"
                        >
                            <Image
                                src="/logo.png"
                                alt="Thrill AI Logo"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <span className="font-bold text-xl tracking-tight text-[#2D2520]">Thrill AI</span>
                    </Link>

                    <ul className="hidden md:flex items-center gap-8">
                        {['Product', 'Features', 'Pricing', 'Blog', 'Company'].map((item) => (
                            <li key={item}>
                                <Link href={`#${item.toLowerCase()}`} className="relative text-[#5C5C5C] hover:text-[#FF6B6B] transition-colors font-medium group">
                                    {item}
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#FF6B6B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block px-6 py-2.5 bg-[#2D2520] text-[#FFFDF7] rounded-full font-bold hover:bg-[#FF6B6B] transition-colors shadow-lg shadow-orange-500/20"
                    >
                        Start Free Trial
                    </motion.button>
                </div>
            </motion.nav>

            <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
