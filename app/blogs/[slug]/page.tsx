"use client";

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Share2, Link2, ArrowLeft } from 'lucide-react';
import { fadeUp } from '@/app/utils/motion';
import BlogCard from '@/app/components/Ui/BlogCard';
import { useQuery } from '@tanstack/react-query';
import { Blog, getBlogBySlug } from '@/app/lib/api/blogs';
import { useParams } from "next/navigation";
import { GoldLoader } from '@/app/components/Ui/GoldLoader';
import RelatedBlogs from '@/app/components/common/RelatedBlogs';

export default function BlogDetail() {
    const params = useParams();
    const slug = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
    console.log(slug)
    // Scroll progress bar logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const { data: response, isLoading, error } = useQuery({
        queryKey: ["blog", slug],
        queryFn: () => getBlogBySlug(slug as string),
        enabled: !!slug,
    });
    const blog = response?.data;



    const relatedBlogs = [response?.data];


    if (error) return <div>Something went wrong</div>;
    if (!blog) return <div>No blog found</div>;

    console.log(blog)

    return (
        <main className="bg-white min-h-screen">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gold-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* --- HERO SECTION --- */}
            <header className="relative h-[60vh] w-full">
                <Image
                    src={blog?.blogImage?.url}
                    alt={blog?.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-navy-900/40" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-4xl text-center space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hidden px-4 py-2 bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-widest rounded-full"
                        >
                            {blog?.category}
                        </motion.span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 py-16">

                {/* --- LEFT: SOCIAL & META (Sticky) --- */}
                <aside className="lg:col-span-1 hidden lg:block">
                    <div className="sticky top-32 space-y-8">
                        <div className="flex flex-col gap-4 text-slate-400">
                            <p className="text-[10px] font-bold uppercase tracking-tighter mb-2">Share</p>
                            <button className="p-3 rounded-full border border-slate-100 hover:text-gold-600 hover:border-gold-500 transition-all"><Link2 size={18} /></button>
                            <button className="p-3 rounded-full border border-slate-100 hover:text-gold-600 hover:border-gold-500 transition-all"><Link2 size={18} /></button>
                            <button className="p-3 rounded-full border border-slate-100 hover:text-gold-600 hover:border-gold-500 transition-all"><Link2 size={18} /></button>
                        </div>
                    </div>
                </aside>

                {/* --- MIDDLE: CONTENT --- */}
                {isLoading ? (<>
                    <GoldLoader /></>) : (<>

                        <article className="lg:col-span-8 space-y-10">
                            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-100 pb-8">
                                <div className="flex items-center gap-2"><User size={16} className="text-gold-600" /> {blog?.author}</div>
                                <div className="flex items-center gap-2"><Calendar size={16} className="text-gold-600" /> {blog?.date}</div>
                                <div className="flex items-center gap-2"><Clock size={16} className="text-gold-600" /> {blog?.readTime}</div>
                            </div>

                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-navy-900 leading-tight"
                                >
                                    {blog?.title}
                                </motion.h1>
                            </div>

                            <div className="prose prose-lg prose-slate max-w-none">
                                <p className="text-xl text-slate-600 leading-relaxed font-serif italic border-l-4 border-gold-500 pl-6 py-2">
                                    {blog?.excerpt}
                                </p>

                                <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-6">The Shift Toward Boutique Luxury</h2>
                                <div
                                    className="prose prose-lg prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                                />
                            </div>

                            {/* Newsletter Opt-in */}
                            <div className="hidden bg-navy-900 rounded-3xl p-10 text-white relative overflow-hidden">
                                <div className="relative z-10 max-w-md">
                                    <h3 className="text-2xl font-bold mb-4">Get the Royal Gazette</h3>
                                    <p className="text-slate-300 mb-6">Exclusive Goan real estate insights delivered to your inbox weekly.</p>
                                    <div className="flex gap-2">
                                        <input type="email" placeholder="Your Email" className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl flex-grow focus:outline-none focus:border-gold-500" />
                                        <button className="bg-gold-500 text-navy-900 px-6 py-3 rounded-xl font-bold">Join</button>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            </div>
                        </article></>)}

                {/* --- RIGHT: PROPERTY AD --- */}
                <aside className="lg:col-span-3 space-y-8">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h4 className="font-bold text-navy-900 mb-4">Featured Property</h4>
                        <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                            <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" alt="Ad" fill className="object-cover" />
                        </div>
                        <p className="font-bold text-slate-900 text-sm">4BHK Heritage Villa</p>
                        <p className="text-gold-600 font-bold mt-1">₹8.5 Cr</p>
                        <button className="w-full mt-4 py-3 bg-white border border-navy-900 text-navy-900 text-sm font-bold rounded-lg hover:bg-navy-900 hover:text-white transition-all">View Details</button>
                    </div>
                </aside>
            </div>

            {/* --- RELATED BLOGS SECTION --- */}
            <RelatedBlogs blogId={blog?._id} limit={5} />
        </main>
    );
}