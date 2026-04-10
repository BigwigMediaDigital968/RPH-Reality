"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Upload, CheckCircle2, ChevronDown } from "lucide-react";
import Hero from "@/app/components/Ui/Hero";
import CareerApplicationForm from "@/app/components/CareerForm";

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
                    <CareerApplicationForm />

                </div>
            </section>
        </main>
    );
}