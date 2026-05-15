"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin, Clock } from "lucide-react";
import Hero from "../components/Ui/Hero";
import Link from "next/link";

const jobs = [
    {
        id: 1,
        role: "Luxury Property Consultant",
        location: "North Goa",
        type: "Full-Time",
        department: "Sales & Client Relations",
    },
    {
        id: 2,
        role: "Investment Portfolio Manager",
        location: "Remote / Mumbai",
        type: "Full-Time",
        department: "Wealth Management",
    },
    {
        id: 3,
        role: "Digital Marketing Specialist",
        location: "Panjim",
        type: "Hybrid",
        department: "Marketing",
    },
    {
        id: 4,
        role: "Customer Experience Associate",
        location: "North Goa",
        type: "Full-Time",
        department: "Operations",
    },
];

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CareersPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* 1. HERO SECTION */}
            <Hero
                title={
                    <>
                        Explore{" "}
                        <span className="text-gold-400">Career</span>
                    </>
                }
                image="https://images.unsplash.com/photo-1642922835816-e2ac68db5c42?q=80&w=1074&auto=format&fit=crop"
                label="Join us"
            />

            {/* 2. CONTENT SECTION (Culture & Values) */}
            <section className="py-24 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-navy-900 mb-6">Why RPH Realty?</h2>
                    <p className="text-navy-900/80 leading-relaxed mb-8">
                        At RPH Realty, we don't just sell properties; we curate lifestyles.
                        Our team is built on a foundation of integrity, innovation, and an
                        unrelenting pursuit of excellence. When you join us, you’re not just
                        taking a job - you’re joining a family that values your growth as much
                        as our own.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-navy-900/80 uppercase tracking-widest">
                        <span>Competitive Equity</span>
                        <span>•</span>
                        <span>Global Exposure</span>
                        <span>•</span>
                        <span>Luxury Environment</span>
                    </div>
                </div>
            </section>

            {/* 3. CAREER LISTINGS (Cards - No Images) */}
            <section className="py-24 bg-white">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-navy-900">Open Opportunities</h2>
                            <p className="text-navy-900/80 mt-2">Find your place in our growing team.</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-gold-400">{jobs.length} Positions Available</p>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {jobs.map((job) => (
                            <motion.div
                                key={job.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="group p-8 bg-white border border-slate-100 rounded-3xl transition-all duration-300 hover:border-navy-900 hover:shadow-2xl hover:shadow-gold-400/5 cursor-pointer relative overflow-hidden"
                            >
                                {/* Decorative Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div>
                                        <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest bg-gold-400/5 px-3 py-1 rounded-full">
                                            {job.department}
                                        </span>

                                        <h3 className="text-2xl font-bold text-navy-900 mt-4 mb-4 flex items-center justify-between">
                                            {job.role}
                                        </h3>

                                        <div className="flex flex-col lg:flex-row flex-wrap justify-between items-baseline">
                                            <div className="flex flex-wrap gap-6 items-center text-slate-500 text-sm mb-8">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} className="text-gold-400" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-gold-400" />
                                                    {job.type}
                                                </div>
                                            </div>
                                            <div className="">
                                                <Link href={`/career/${job.id}`} passHref legacyBehavior>
                                                    <motion.a
                                                        whileTap={{ scale: 0.95 }}
                                                        className="block text-center cursor-pointer w-full py-3 px-6 bg-navy-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-gold-400 no-underline"
                                                    >
                                                        Apply Now
                                                    </motion.a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Apply Now Button */}

                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* General Inquiry Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 p-12 bg-slate-50 rounded-[2.5rem] text-center border border-dashed border-slate-200"
                    >
                        <h3 className="text-xl font-bold text-navy-900 mb-2">Don't see the right role?</h3>
                        <p className="text-slate-500 mb-6">We're always looking for exceptional talent. Send us your resume anyway.</p>
                        <a href="mailto:careers@royalprime.com" className="text-gold-400 font-bold underline hover:text-gold-400 transition-colors">
                            careers@rphrealty.com
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}