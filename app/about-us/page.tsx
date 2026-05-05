"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Target, Users, Award, ChevronRight } from "lucide-react";
import { fadeUp, motionContainer } from "@/app/utils/motion";
import SectionLabel from "../components/Ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";
import AwardSection from "../components/common/AwardSection";
import CoreValuesSection from "../components/common/CoreValuesSection";
import Hero from "../components/Ui/Hero";
import Link from "next/link";

// Data following the "Royal Prime" Array of Objects pattern
const stats = [
    { label: "Years Experience", value: "40+", icon: Users },
    { label: "Completed Projects", value: "200+", icon: Target },
    { label: "Team Members", value: "65+", icon: ShieldCheck },
    { label: "Total Award Wins", value: "99+", icon: Award },
];

const team = [
    {
        name: "Mayur Sail",
        role: "Owner",
        image: "/person-1.jpeg",
        bio: "With over 15 years of experience in Goa’s dynamic real estate market, Rohit specializes in luxury villas, beachfront properties, and high-growth investment opportunities. His deep understanding of local regulations, land acquisition, and premium developments has helped countless clients secure exclusive properties across North and South Goa. Known for his transparent approach and strong developer network, he ensures every investment is both secure and future-ready."
    },
    // {
    //     name: "Aman Verma",
    //     role: "Creative Director",
    //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    //     bio: "Aman brings a refined design perspective to Goa’s luxury real estate landscape, curating properties that blend modern architecture with coastal elegance. From boutique villas to high-end residential projects, his expertise lies in crafting spaces that enhance lifestyle and long-term value. With a keen eye for detail and global design influences, he plays a key role in shaping distinctive properties that stand out in Goa’s premium market."
    // }
];

export default function AboutUsPage() {
    return (
        <main className="bg-navy-950 text-white">

            {/* SECTION 1: HERO [Ref: image_4f29e3] */}
            <Hero
                title={
                    <>
                        About <span className="text-gold-500">Us</span>
                    </>
                }
                image="https://s7ap1.scene7.com/is/image/incredibleindia/vagator-beach-goa-city-1-hero?qlt=82&ts=1742158909874"
                label="Our Story"
            />


            {/* SECTION 3: COMPANY PROFILE [Ref: image_4f29e3] */}
            <section className="py-24 max-w-[1320px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center ">
                <div className="relative">
                    {/* Stacked Image Effect */}
                    <motion.div
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: -50, opacity: 0 }}
                        className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl aspect-[5/4]"
                    >
                        <Image className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" unoptimized width={800} height={600} alt="Luxury Property" />
                    </motion.div>
                    {/* Floating Experience Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="absolute -top-10 -right-10 bg-white p-8 rounded-2xl text-navy-900 shadow-xl hidden md:block"
                    >
                        <div className="text-4xl font-black">25+</div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter leading-none">Years of<br />Experience</div>
                    </motion.div>
                </div>

                <div className="">
                    <SectionLabel>Company About</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
                        Our Story
                    </h2>
                    <p className="text-slate-400 font-light leading-relaxed mt-4">
                        At RPH Reality, we started with a vision that goes beyond property transactions, we build possibilities. Our foundation lies in understanding that every real estate decision is deeply personal, whether it’s finding the perfect home or shaping a long-term investment.
                    </p>
                    <p className="text-slate-400 font-light leading-relaxed mt-2">
                        From day one, our goal has been to redefine real estate through trust, clarity, and meaningful relationships. We don’t just deal in properties, we guide journeys, helping clients discover spaces that align with their aspirations and lifestyle.
                    </p>
                    <p className="text-slate-400 font-light leading-relaxed mt-2">

                        Blending global standards with strong local expertise, we deliver tailored real estate experiences that reflect the uniqueness of every client. At RPH Reality, we believe true value isn’t just in the property you choose it’s in the future you create with it.
                    </p>

                    <div>
                        <Link href={'/contact'} className="inline-block cursor-pointer mt-4 bg-white text-[#020810] px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all active:scale-95">
                        Get A Quote +
                    </Link>
                    </div>
                </div>
            </section>

            <section className="w-full bg-off-white py-5 md:py-10 lg:py-16">
                <div className="relative z-20 max-w-[1200px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden"
                    >
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="p-8 text-center border-r border-slate-100 last:border-r-0 hover:bg-slate-50 transition-colors group"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-navy-900 mb-1 group-hover:text-gold-500 transition-colors">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4: THE TEAM [Ref: image_4f2d85] */}
            <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
                {/* Subtle Background Decoration */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl" />

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <SectionLabel>Leadership</SectionLabel>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold mt-4 text-navy-900 tracking-tight"
                        >
                            Meet Our <span className="text-gold-400 font-light ">Innovators</span>
                        </motion.h2>
                    </div>

                    <div className="space-y-24">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                            >
                                {/* Image Container with Floating Effect */}
                                <div className="w-full md:w-1/2 lg:w-2/5 group">
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200"
                                    >
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Glassmorphism Overlay on Hover */}
                                        <div className="hidden absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                            <button className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-white/30">
                                                View Profile <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content Container */}
                                <div className="w-full md:w-1/2 lg:w-3/5 space-y-6">
                                    <div className="space-y-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "40px" }}
                                            className="h-1 bg-gold-600 rounded-full"
                                        />
                                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{member.name}</h3>
                                        <p className="text-gold-500 font-bold text-sm tracking-widest uppercase">{member.role}</p>
                                    </div>

                                    <p className="text-slate-500 text-lg font-light leading-relaxed max-w-xl">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CoreValuesSection />
        </main >
    );
}

function Counter({ value }: { value: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    // Strip non-numeric characters (like +) to animate the number
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            setDisplayValue(latest);
        });
        return unsubscribe;
    }, [rounded]);

    useEffect(() => {
        if (isInView) {
            animate(count, numericValue, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, count, numericValue]);

    return (
        <span ref={ref}>
            {displayValue}
            {value.includes("+") && "+"}
        </span>
    );
}