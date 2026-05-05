"use client";
import { formatDate } from "@/app/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Calendar, Eye, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Ui/BlogCard";
import { Blog, getBlogs, getRelatedBlogs } from "@/app/lib/api/blogs";

interface RelatedBlogsProps {
    blogId: string;
    limit?: number;
}


export default function RelatedBlogs({ blogId, limit = 4 }: RelatedBlogsProps) {
    const { data: response, isLoading, error } = useQuery({
        queryKey: ["related-blogs", blogId],
        queryFn: () => getBlogs({
                    limit: 5,
                }),
        enabled: !!blogId,
    });
    const relatedBlogs = response?.data || [];
    if (relatedBlogs && relatedBlogs?.length < 1) {
        return null;
    }
    return (
        <>
            <section className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-display font-bold text-navy-900">Continue Reading</h2>
                            <p className="text-slate-500 mt-2">More insights from our real estate experts</p>
                        </div>
                        <Link href="/blogs" className="text-navy-900 font-bold border-b-2 border-gold-500 hover:text-gold-600 transition-colors">
                            View All Blogs
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {isLoading
                            ? Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-4 shadow animate-pulse space-y-4"
                                >
                                    <div className="h-40 bg-gray-200 rounded-lg" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            ))
                            : relatedBlogs?.map((post: Blog, index: number) => (
                                <BlogCard key={post?._id} post={post} index={index} />
                            ))}
                    </div>
                </div>
            </section></>
    )
}