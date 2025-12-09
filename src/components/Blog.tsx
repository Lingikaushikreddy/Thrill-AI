'use client';

import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { motion } from 'framer-motion';
import postsData from '../data/posts.json';

// Type definition for the post data
type Post = {
    id: string;
    category: string;
    title: string;
    desc: string;
    color: string;
    image: string;
    url: string;
};

const resources: Post[] = postsData;

export function Blog() {
    return (
        <section id="blog" className="py-32 bg-[#FFFDF7] border-t border-[#F5E6D3] relative overflow-hidden">
            {/* Subtle Gradient Background Blob */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex items-end justify-between mb-16">
                    <FadeIn>
                        <h2 className="text-5xl font-bold text-[#2D2520] tracking-tight mb-4">Insights & <br /><span className="text-[#FF6B6B]">Resources</span></h2>
                        <p className="text-lg text-[#5C5C5C] max-w-xl leading-relaxed">
                            Deep dives into the future of enterprise AI, voice technology, and automated customer experiences.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E5D5C5] shadow-sm text-[#2D2520] font-semibold hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-colors group"
                        >
                            View all articles
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.button>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {resources.map((post, i) => (
                        <FadeIn key={post.id} delay={i * 0.1}>
                            <motion.a
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer flex flex-col h-full block"
                            >
                                {/* Card Image */}
                                <div className="aspect-[4/3] rounded-[32px] mb-8 overflow-hidden relative shadow-lg shadow-orange-100/50">
                                    <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    <motion.img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    {/* Floating Tag */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/90 border shadow-sm ${post.color}`}>
                                            {post.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-[#2D2520] mb-3 leading-tight group-hover:text-[#FF6B6B] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#5C5C5C] leading-relaxed mb-6 line-clamp-2">
                                        {post.desc}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-[#2D2520] font-bold text-sm tracking-wide group/link">
                                        <span className="border-b-2 border-[#FF6B6B]/30 group-hover/link:border-[#FF6B6B] transition-colors pb-0.5">
                                            Read Article
                                        </span>
                                        <ArrowRight className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1 text-[#FF6B6B]" />
                                    </div>
                                </div>
                            </motion.a>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
