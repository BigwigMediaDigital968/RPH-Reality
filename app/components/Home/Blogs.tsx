"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";
import { ArrowRight } from "lucide-react";

export default function Blogs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const blogs = [
    {
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", // Coastal Goa View
      category: "Market Insight",
      date: "02 Apr 2026",
      title: "Why North Goa is the New Investment Capital for Second Homes",
      excerpt:
        "Rental yields in Assagao and Siolim have seen a 25% uptick as digital nomads and luxury travelers shift toward boutique villa living.",
    },
    {
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", // Portuguese Heritage Villa
      category: "Buying Guide",
      date: "25 Mar 2026",
      title: "Navigating Land Titles and Heritage Laws in Goa: A 2026 Guide",
      excerpt:
        "Understanding Form I & XIV, Nil-Encumbrance certificates, and the essentials of safely purchasing ancestral Goan property.",
    },
    {
      img: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600&q=80", // Modern Goa Interior
      category: "Lifestyle",
      date: "18 Mar 2026",
      title: "The Ultimate Guide: Choosing Between North and South Goa",
      excerpt:
        "From the vibrant social hubs of Anjuna to the pristine, quiet stretches of Palolem—finding the perfect neighborhood for your lifestyle.",
    },
  ];

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
          {blogs.map((b) => (
            <motion.article
              key={b.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group border border-border rounded-2xl overflow-hidden bg-white cursor-pointer"
            >
              <div className="overflow-hidden aspect-[16/10]">
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-sans font-semibold tracking-widest uppercase text-gold-500">
                    {b.category}
                  </span>
                  <span className="text-charcoal-300">·</span>
                  <span className="text-xs font-sans text-charcoal-400">
                    {b.date}
                  </span>
                </div>
                <h3 className="font-display text-navy-900 text-xl font-semibold leading-snug mb-3 group-hover:text-navy-700 transition-colors duration-200">
                  {b.title}
                </h3>
                <p className="font-sans text-charcoal-500 text-sm leading-relaxed line-clamp-2">
                  {b.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-sans font-semibold tracking-widest uppercase text-navy-900 group-hover:text-gold-500 transition-colors duration-200">
                  Read More
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.article>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group inline-flex items-center gap-3 px-10 py-5 bg-white text-navy-900 border border-navy-900 font-semibold rounded-full hover:bg-navy-950 hover:text-white transition-all shadow-xl"
            >
              Read All Blogs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
