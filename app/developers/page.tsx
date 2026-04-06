"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, MapPin, Award, Building } from 'lucide-react';
import Hero from '../components/Ui/Hero';
import SectionLabel from '../components/Ui/SectionLabel';
import { fadeUp } from '../utils/motion';

// DUMMY DEVELOPER DATA (Matches the structure)
const DEVELOPERS = [
    {
        id: 1,
        title: "Goan Heritage Realty",
        shortDesc: "Specializing in meticulous restoration of Indo-Portuguese villas and colonial mansions.",
        location: "Panjim, North Goa",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        projects: 12
    },
    {
        id: 2,
        title: "Emerald Coast Developers",
        shortDesc: "Crafting sustainable luxury boutique resorts and emerald pool villas since 2010.",
        location: "Assagao, North Goa",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
        projects: 8
    },
    {
        id: 3,
        title: "Mandovi Signature Homes",
        shortDesc: "Exclusive riverfront apartments and penthouses blending modern luxury with Goan soul.",
        location: "Reis Magos, Goa",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        projects: 15
    },
    {
        id: 4,
        title: "Salcete Prestige Builders",
        shortDesc: "Developing luxury gated communities with a focus on Portuguese aesthetics.",
        location: "Margao, South Goa",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        projects: 9
    },
    {
        id: 1,
        title: "Goan Heritage Realty",
        shortDesc: "Specializing in meticulous restoration of Indo-Portuguese villas and colonial mansions.",
        location: "Panjim, North Goa",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        projects: 12
    },
    {
        id: 2,
        title: "Emerald Coast Developers",
        shortDesc: "Crafting sustainable luxury boutique resorts and emerald pool villas since 2010.",
        location: "Assagao, North Goa",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
        projects: 8
    },
];

export default function PartnerDevelopers() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDevelopers = DEVELOPERS.filter(dev =>
        dev.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Hero
                title={
                    <>
                        Partner <br />
                        <span className="italic text-gold-400"> Developers</span>
                    </>
                }
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                label="Properties for lease"
            />
            <main className="min-h-screen bg-slate-50/50 pb-28">


                {/* --- DEVELOPER GRID: THE CARDS --- */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <AnimatePresence>
                            {filteredDevelopers.map((dev, index) => (
                                <DeveloperCard key={dev.id} dev={dev} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredDevelopers.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 mt-10">
                            <Building size={48} className="text-slate-300 mx-auto" />
                            <p className="text-slate-500 mt-6 text-lg font-serif">No developers found matching your search.</p>
                        </div>
                    )}
                </section>
            </main>
        </>

    );
}

// THE SPECIFIC DEVELOPER CARD COMPONENT (With Hover Logic)
function DeveloperCard({ dev, index }: { dev: any, index: number }) {

    // Card Hover Variants
    const cardVariants = {
        initial: { y: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
        hover: { y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" } // Luxury lift and shadow
    };

    // Image/Overlay Variants
    const imageVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 } // Slower, deeper scale
    };

    // Gradient Overlay Variants (Becomes darker on hover)
    const overlayVariants = {
        initial: { opacity: 0.7 },
        hover: { opacity: 0.9 }
    };

    // Text Content Variants (Slide up)
    const contentVariants = {
        initial: { y: 0 },
        hover: { y: -60 } // Moves up to make room for description
    };

    // Description (Hidden initially)
    const descVariants = {
        initial: { opacity: 0, y: 20 },
        hover: { opacity: 1, y: 0, transition: { delay: 0.15 } }
    };

    return (
        <motion.article
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            whileHover="hover"
            className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer group bg-white border border-slate-100 shadow-sm"
        >
            {/* Background Image: Scale effect */}
            <motion.div variants={imageVariants} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full">
                <Image src={dev.image} alt={dev.title} fill className="object-cover" />
            </motion.div>

            {/* Gradient Overlay: Darkens from navy to provide contrast */}
            <motion.div
                variants={overlayVariants}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent"
            />

            {/* --- CONTENT CONTAINER (Sticky at the bottom initially) --- */}
            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">

                {/* Animated Wrapper for Title and Description */}
                <motion.div variants={contentVariants} transition={{ duration: 0.4, ease: "easeOut" }}>
                    {/* Developer Meta: Projects & Location (Visible on Hover/Initially as small icon) */}
                    <div className="flex items-center gap-4 text-xs font-bold text-white/70 tracking-widest uppercase mb-3">
                        <div className="flex items-center gap-1.5"><Building size={14} className="text-gold-500" /> {dev.projects} Projects</div>
                        <span className="text-white/30">·</span>
                        <div className="flex items-center gap-1.5"><MapPin size={14} className="text-gold-500" /> {dev.location}</div>
                    </div>

                    {/* Title: Always visible */}
                    <h3 className="text-3xl font-display font-bold text-white group-hover:text-gold-400 transition-colors duration-300 leading-tight">
                        {dev.title}
                    </h3>

                    {/* Description: Revealed on Hover */}
                    <motion.p
                        variants={descVariants}
                        className="text-white/80 leading-relaxed font-sans mt-4 text-sm"
                    >
                        {dev.shortDesc}
                    </motion.p>
                </motion.div>
            </div>

            {/* Sublte "Learn More" link (Revealed on hover at the very bottom) */}
            <motion.div
                variants={descVariants}
                className="hidden absolute bottom-6 right-8 text-gold-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
            >
                Portfolio <ChevronRight size={14} />
            </motion.div>

        </motion.article>
    );
}

// Simple Helper Icon
function ChevronRight({ size, ...props }: any) {
    return <svg {...props} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>;
}