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
    <section ref={ref} className="py-20 lg:py-28 bg-white">
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
          {blogs?.map((post, index) => (
            <>
              <BlogCard
                key={post?.title}
                post={post}
                index={index}
              />
            </>
          ))}


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
