'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Home, ShieldCheck, TrendingUp, Users } from "lucide-react";

const features = [
    {
        icon: Home,
        title: "Premium Properties",
        desc: "Handpicked luxury homes in Goa’s most desirable locations with unmatched quality and design.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Transactions",
        desc: "100% transparent deals with legal verification and complete documentation support.",
    },
    {
        icon: TrendingUp,
        title: "High ROI Investment",
        desc: "Properties with strong appreciation potential and rental income opportunities.",
    },
    {
        icon: Users,
        title: "Expert Guidance",
        desc: "Our experienced team ensures smooth buying, selling, and investment decisions.",
    },
];

// Parent container animation (stagger)
const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Card animation (slide up)
const cardVariant: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeInOut",
        },
    },
};

export default function AboutUs() {
    return (
        <>
            <div className="relative z-10 bg-gradient-to-br from-[#0f1f3d] via-[#1B365D] to-[#0a1628] px-6 py-20">
                <div className="max-w-6xl mx-auto">

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, }}
                        viewport={{ once: true }}
                        className="text-center text-white mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">
                            Why Choose Us
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            We deliver excellence, trust, and premium real estate experiences
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {features.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.06 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="relative group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-2xl"
                                >
                                    {/* Center Fill Layer */}
                                    <div className="absolute inset-0 flex items-center justify-center z-0">
                                        <div className="w-full h-full aspect-square bg-off-white scale-0 group-hover:scale-150 transition-transform duration-500 ease-out rounded-full" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 transition-colors duration-300">
                                        {/* Icon */}
                                        <div className="mb-4 inline-flex p-3 rounded-xl bg-amber-400/20 border border-amber-400/30 group-hover:bg-white/20 group-hover:border-navy-900/30 transition">
                                            <Icon className="w-6 h-6 text-amber-300 group-hover:text-navy-900 transition" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-navy-900 transition">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-navy-900/90 transition">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Glow */}
                                    <div className="absolute -inset-1 bg-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </>
    )
}