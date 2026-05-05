"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Blog } from '@/app/lib/api/blogs';
import { formatDate } from '@/app/utils/date';


// 2. Define the Props for the Component
interface BlogCardProps {
    post: Blog;
    index?: number; // Optional index for staggered animation
}

// 3. Define Animation Variants with TypeScript types
const fadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0], // Standard cubic-bezier for luxury feel
        }
    })
};

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
    return (
        <motion.article
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={index} // Passes index to the 'animate' variant for staggering
            whileHover={{ y: -6 }}
            className="group border border-slate-100 rounded-2xl overflow-hidden bg-white cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
        >
            {/* Image Container with aspect ratio box */}
            <div className="overflow-hidden aspect-[16/10] relative">
                <img
                    src={post?.blogImage?.url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-gold-600 bg-gold-50 px-2 py-1 rounded">
                        {post.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-sans text-slate-500 font-medium">
                        {formatDate(post.updatedAt)}
                    </span>
                </div>

                <h3 className="font-display text-navy-900 text-xl font-bold leading-tight mb-3 group-hover:text-gold-600 transition-colors duration-300">
                    {post.title}
                </h3>

                {post.excerpt && (
                    <p className="font-sans text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                    </p>
                )}

                {/* Footer/Read More */}
                <Link href={`/blogs/${post.slug}`} className="pt-2 flex items-center gap-2 text-[11px] font-sans font-bold tracking-widest uppercase text-navy-900 group-hover:text-gold-500 transition-all duration-300">
                    <span>Explore Article</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </div>
        </motion.article>
    );
};

export default BlogCard;