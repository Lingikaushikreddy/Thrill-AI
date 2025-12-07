'use client';

import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

const images = [
    "from-[#FF9A9E] to-[#FECFEF]",
    "from-[#FF6B6B] to-[#FFCC5C]",
    "from-[#a18cd1] to-[#fbc2eb]",
    "from-[#f093fb] to-[#f5576c]",
];

export function Gallery() {
    return (
        <section className="py-24 bg-[#FFFDF7] border-y border-[#F5E6D3] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
                <FadeIn>
                    <h2 className="text-4xl font-bold text-[#2D2520]">Inspiration Gallery</h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <p className="text-[#5C5C5C] hidden md:block">Curated gradients from the natural world.</p>
                </FadeIn>
            </div>

            {/* Infinite Scroll Marquee */}
            <div className="flex gap-8 overflow-hidden py-4">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex gap-8 min-w-max"
                >
                    {[...images, ...images, ...images].map((gradient, i) => (
                        <div key={i} className={`w-80 h-96 rounded-[32px] bg-gradient-to-br ${gradient} shadow-md hover:scale-105 transition-transform duration-300 relative group`}>
                            <div className="absolute inset-4 border border-white/30 rounded-[20px]" />
                            <div className="absolute bottom-6 left-6 text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                Generic Sunrise #{i + 1}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
