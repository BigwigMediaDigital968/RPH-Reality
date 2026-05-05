"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";
import { ArrowRight } from "lucide-react";
import BlogCard from "../Ui/BlogCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/app/lib/api/blogs";

export default function Blogs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { data: res, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs({ page: 1, limit: 3 }),
  })

  const blogs = res?.data;


  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className=" text-center mb-14"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>From the Blog</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-navy-900  mt-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Market Insights &{" "}
              <em className="text-gold-400 not-italic">News</em>
            </motion.h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {isLoading ? [1, 2, 3].map((item, index) => (
            <BlogCardSkeleton key={index} />
          )) : blogs?.map((post, index) => (
            <BlogCard
              key={post?.title}
              post={post}
              index={index}
            />
          ))}
          {!isLoading && !blogs && (
            <div className="text-center w-full col-span-3">
              <p className="text-navy-900/50 my-5">No Blogs Found</p>
            </div>
          )}


        </motion.div>

        <div className="flex items-center justify-center mt-5 md:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/blogs"} className="cursor-pointer group inline-flex items-center gap-3 px-10 py-5 bg-white text-navy-900 border border-navy-900 font-semibold rounded-full hover:bg-navy-950 hover:text-white transition-all shadow-xl"
              > Read All Blogs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />


              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const BlogCardSkeleton = () => {
  return (
    <div className="max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-pulse">

      {/* ── CATEGORY BADGE & DATE ── */}
      <div className="flex items-center gap-4 mb-8">
        {/* Real Estate Badge */}
        <div className="h-8 w-28 bg-amber-50 rounded-lg" />
        {/* Date Placeholder */}
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>

      {/* ── MAIN TITLE (hello how are you) ── */}
      <div className="space-y-3 mb-6">
        <div className="h-10 w-full bg-slate-200 rounded-md" />
        <div className="h-10 w-2/3 bg-slate-200 rounded-md" />
      </div>

      {/* ── DESCRIPTION TEXT ── */}
      <div className="space-y-2 mb-10">
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-4/5 bg-gray-100 rounded" />
      </div>

      {/* ── EXPLORE ARTICLE LINK ── */}
      <div className="flex items-center gap-2 border-t border-gray-50 pt-6">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        {/* Arrow Icon Placeholder */}
        <div className="h-4 w-4 bg-slate-200 rounded-sm" />
      </div>
    </div>
  );
};