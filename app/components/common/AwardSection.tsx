"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";

// Update this array with your actual award image paths and titles
const awards = [
    {
        id: 1,
        title: "Best Luxury Broker",
        year: "2025",
        img: "https://images.unsplash.com/photo-1579933390022-b9156477e743?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "Global Excellence Award",
        year: "2025",
        img: "https://images.unsplash.com/photo-1603912623348-1ac458e0a6e0?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Innovator of the Year",
        year: "2024",
        img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400"
    },
];

export default function AwardSection() {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section ref={containerRef} className="py-24 bg-[#F8FAFC] relative overflow-hidden">
            {/* Subtle background gradient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00D4FF]/3 rounded-full blur-3xl" />

            <div className="max-w-[1320px] mx-auto px-6 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={motionContainer}
                    className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
                >
                    <motion.div variants={fadeUp}>
                        <SectionLabel>Milestones</SectionLabel>
                    </motion.div>
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold font-display tracking-tight text-slate-950 leading-tight"
                    >
                        Royal Prime Realty with{" "}
                        <span className="text-[#00D4FF]">Award-Winning</span> Excellence
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-slate-500 font-light leading-relaxed pt-2"
                    >
                        The global property industry has acknowledged our achievements, honoring
                        us with top accolades for our exceptional service and dedication to luxury
                        Goan real estate.
                    </motion.p>
                </motion.div>

                {/* Awards Grid/Carousel Container */}
                <div className="flex gap-8 overflow-x-auto pb-10 -mb-10 px-4">
                    {awards.map((award, i) => (
                        <motion.div
                            key={award.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                            // --- MORDEN HOVER ANIMATIONS ---
                            whileHover={{
                                y: -15, // Lift Card
                                transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-between text-center group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#00D4FF]/10"
                        >

                            {/* Image Container with Inner Scale Animation */}
                            <div className="w-full h-72 relative mb-10">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={award.img}
                                        alt={award.title}
                                        fill
                                        unoptimized
                                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </motion.div>
                            </div>

                            {/* Award Content */}
                            <div className="space-y-3 mt-auto w-full">
                                <div className="h-0.5 w-12 bg-slate-100 group-hover:bg-[#00D4FF] rounded-full mx-auto transition-colors duration-500" />
                                <h3 className="text-xl font-semibold text-slate-950 tracking-tight transition-colors group-hover:text-[#00D4FF]">
                                    {award.title}
                                </h3>
                                <p className="text-sm font-bold text-slate-400 group-hover:text-slate-500 tracking-widest uppercase">
                                    {award.year}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}