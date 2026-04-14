"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import BlogCard from '../components/Ui/BlogCard';
import Hero from '../components/Ui/Hero';
import { getBlogs } from '../lib/api/blogs';
import { GoldLoader } from '../components/Ui/GoldLoader';

// Dummy Data - In a real app, this comes from an API or CMS


const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);

                const res = await getBlogs({
                    page: currentPage,
                    limit: POSTS_PER_PAGE,
                    search: searchQuery, // 👈 search query inside object
                });

                setBlogs(res.data || []);
                setTotalPages(res.pagination?.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage, searchQuery]);

    console.log(blogs)

    // Pagination logic
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-slate-50/50 pb-20">
            {/* --- HEADER SECTION --- */}
            <Hero
                title={
                    <>
                        Blogs
                    </>
                }
                image="https://s7ap1.scene7.com/is/image/incredibleindia/vagator-beach-goa-city-1-hero?qlt=82&ts=1742158909874"
                label="Our Blogs"
            />


            {/* --- BLOG GRID --- */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className='mb-4 md:mb-10'>
                    <div className="max-w-md mt-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-900" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-navy-900 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
                {
                    loading ? (
                        <>
                            <GoldLoader />
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="wait">
                                    {currentPosts.map((post, index) => (
                                        <BlogCard key={post.title} post={post} index={index} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </>
                    )
                }

                {/* Empty State */}
                {blogs.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No articles found matching your search.</p>
                    </div>
                )}

                {/* --- PAGINATION CONTROLS --- */}
                {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center gap-2">
                        <PaginationButton
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={20} />
                        </PaginationButton>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`w-12 h-12 rounded-full font-bold transition-all duration-300 ${currentPage === i + 1
                                    ? "bg-navy-900 text-white shadow-lg"
                                    : "bg-white text-slate-600 hover:bg-gold-50 hover:text-gold-600 border border-slate-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <PaginationButton
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={20} />
                        </PaginationButton>
                    </div>
                )}
            </section>
        </main>
    );
}

// Sub-component for Pagination Arrows
function PaginationButton({ children, onClick, disabled }: { children: React.ReactNode, onClick: () => void, disabled: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-12 h-12 flex items-center justify-center rounded-full border border-slate-100 bg-white transition-all ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gold-500 hover:text-white text-navy-900 shadow-sm"
                }`}
        >
            {children}
        </button>
    );
}