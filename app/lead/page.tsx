"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Star } from "lucide-react";
import EnquiryForm from "../components/EnquiryForm";
import Hero from "../components/Ui/Hero";

export default function MarketingLeadPage() {
    return (
        <>
            <Hero
                title={
                    <>
                        Let's{" "}
                        <span className="text-gold-400">Connect</span>
                    </>
                }
                image="https://s3.india.com/wp-content/uploads/2025/05/gooa-ft.jpg"
                label="connect"
            />
            <main className="min-h-screen bg-white flex flex-col justify-center">
                <div className="max-w-[1320px] mx-auto px-6 py-8 md:py-12 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* LEFT COLUMN: The Hook (Marketing Copy) */}
                        <div className="lg:col-span-6 xl:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-navy-900 uppercase tracking-tighter">
                                        Joined by 500+ Luxury Investors
                                    </p>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-navy-900 leading-[1.1] mb-6">
                                    Own Your Piece of <br />
                                    <span className="text-gold-400">Goan Paradise.</span>
                                </h1>

                                <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
                                    Unlock exclusive access to off-market heritage villas and high-yield
                                    commercial spaces. Your luxury investment journey starts here.
                                </p>

                                {/* Trust Indicators - Optimized for quick scanning */}
                                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="text-gold-400 shrink-0" size={24} />
                                        <div>
                                            <p className="font-bold text-navy-900 text-sm">Verified Titles</p>
                                            <p className="text-xs text-slate-500">100% Legal Transparency</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Award className="text-gold-400 shrink-0" size={24} />
                                        <div>
                                            <p className="font-bold text-navy-900 text-sm">Premier Selection</p>
                                            <p className="text-xs text-slate-500">Curated Luxury Portfolio</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: The Conversion (Enquiry Form) */}
                        <div className="lg:col-span-6 xl:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative"
                            >
                                {/* Promo Badge */}
                                <div className="absolute -top-4 right-8 bg-gold-400 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                                    Limited Availability
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-navy-900">Priority Inquiry</h2>
                                    <p className="text-slate-500 text-xs mt-1">Fill the form and we'll call you back shortly.</p>
                                </div>

                                {/* THE FORM COMPONENT */}
                                <div className="pr-1 custom-scrollbar">
                                    <EnquiryForm variant="minimal" btnText="Get Early Access" />
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
}