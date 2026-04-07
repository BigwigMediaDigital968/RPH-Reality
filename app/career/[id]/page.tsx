"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Upload, CheckCircle2, ChevronDown } from "lucide-react";
import Hero from "@/app/components/Ui/Hero";

export default function JobDescriptionPage() {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <main className="bg-white min-h-screen">
            {/* 1. HERO SECTION */}
            <Hero
                title={
                    <>
                        Join{" "}
                        <span className="text-gold-400">Us</span>
                    </>
                }
                image="https://s3.india.com/wp-content/uploads/2025/05/gooa-ft.jpg"
                label="Join us"
            />

            {/* 2. JD & APPLICATION FORM SECTION */}
            <section className="py-16 md:py-24 max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT: JOB DESCRIPTION */}
                    <div className="lg:col-span-7">
                        <h2 className="text-3xl font-bold text-navy-900 mb-6">Luxury Property Consultant</h2>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            We are seeking a sophisticated and driven Property Consultant to join our elite sales team in North Goa.
                            You will be responsible for managing relationships with high-net-worth individuals and showcasing
                            some of the most exclusive heritage villas and beachfront estates in the region.
                        </p>

                        <h3 className="text-xl font-bold text-navy-900 mb-4">Key Responsibilities</h3>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Conduct private viewings for high-end clientele.",
                                "Provide expert market analysis of the Goan luxury real estate landscape.",
                                "Manage end-to-end sales cycles for premium villas.",
                                "Collaborate with legal and interior design teams for seamless handovers."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 size={18} className="text-gold-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT: MINIMAL APPLICATION FORM */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-slate-50 p-4 md:p-6 rounded-[2rem] border border-slate-100 sticky top-28"
                        >
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">Apply for this position</h3>
                            <p className="text-slate-500 text-sm mb-8">Complete the form below and we’ll be in touch.</p>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                                {/* Full Name */}
                                <div className="md:col-span-1">
                                    <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:border-gold-400 transition-colors text-sm" />
                                </div>

                                {/* Email Address */}
                                <div className="md:col-span-1">
                                    <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:border-gold-400 transition-colors text-sm" />
                                </div>

                                {/* Phone Number */}
                                <div className="md:col-span-1">
                                    <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">Phone Number</label>
                                    <input type="text" placeholder="+91 98467 32587" className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:border-gold-400 transition-colors text-sm" />
                                </div>

                                {/* City */}
                                <div className="md:col-span-1">
                                    <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">Your City</label>
                                    <input type="text" placeholder="e.g. Panjim" className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:border-gold-400 transition-colors text-sm" />
                                </div>

                                {/* Select Position Dropdown */}
                                <div className="md:col-span-2">
                                    <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                                        Target Position
                                    </label>

                                    <div className="relative mt-1 group">
                                        <select
                                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:border-gold-400 transition-all text-sm appearance-none cursor-pointer pr-10"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Choose a position</option>
                                            <option value="consultant">Luxury Property Consultant</option>
                                            <option value="manager">Portfolio Manager</option>
                                            <option value="marketing">Digital Marketing Specialist</option>
                                            <option value="ops">Operations Associate</option>
                                        </select>

                                        {/* The Dropdown Icon */}
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-navy-900/80 group-focus-within:text-gold-400 transition-colors">
                                            <ChevronDown size={16} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>
                                {/* RESUME UPLOAD - Spans full width */}
                                <div className="md:col-span-2">
                                    <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">Resume / CV</label>
                                    <div className="relative mt-1">
                                        <input
                                            type="file"
                                            id="resume"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <label
                                            htmlFor="resume"
                                            className="flex items-center justify-between w-full px-5 py-4 border-2 border-dashed border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-gold-400 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Upload className="text-navy-900/80" size={18} />
                                                <span className="text-xs font-bold text-slate-500">
                                                    {fileName ? fileName : "Upload PDF or Doc"}
                                                </span>
                                            </div>
                                            {!fileName && <span className="text-[10px] text-slate-300 font-medium">Max 5MB</span>}
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="md:col-span-2 mt-2">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        className="cursor-pointer w-full py-3.5 bg-navy-900 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-gold-400 transition-colors shadow-lg"
                                    >
                                        Submit Application
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </section>
        </main>
    );
}