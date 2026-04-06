"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Home, Key, TrendingUp, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        id: 1,
        title: "Buy",
        rotation: -12,
        x: -40,
        desc: "Discover handpicked premium estates and beachfront sanctuaries.",
        link: "/buy",
        icon: Home
    },
    {
        id: 2,
        title: "Rent",
        rotation: -5,
        x: -15,
        desc: "Experience luxury Goan living with our curated holiday rentals.",
        link: "/rent",
        icon: Key
    },
    {
        id: 3,
        title: "Lease",
        rotation: 12,
        x: 40,
        desc: "Professional asset management for long-term peace of mind.",
        link: "/lease",
        icon: Landmark
    },
];

export default function ServicesFan() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="py-24 bg-navy-950 overflow-hidden text-center">
            <div className="max-w-11/12 mx-auto px-5">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 justify-center mb-4">
                        <span className="block w-8 h-px bg-gold-400" />
                        <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase font-sans">
                            Services
                        </span>
                        <span className="block w-8 h-px bg-gold-400" />
                    </div>
                    <h2 className="text-white font-display text-4xl mb-4">
                        Services & <span className="text-gold-500">Expertise</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        From bespoke beachside villas to expansive heritage plots, we provide
                        a curated path to your prime Goan sanctuary.
                    </p>
                </div>

                {/* Fan Cards Container */}
                <div className="relative hidden md:flex justify-center items-end h-[350px] pt-20 mt-20">
                    {services.map((service) => {
                        const IconComponent = service.icon; // Extract the component
                        const isHovered = hoveredId === service.id;
                        return (
                            <motion.div
                                key={service.id}
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                initial={false}
                                animate={{
                                    rotate: hoveredId === service.id ? 0 : service.rotation,
                                    y: hoveredId === service.id ? -20 : 0,
                                    scale: hoveredId === service.id ? 1.15 : 1,
                                    zIndex: hoveredId === service.id ? 30 : service.id,
                                    backgroundColor: hoveredId === service.id ? "#ffffff" : "#adb5bd",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="relative w-[250px] h-[300px] rounded-2xl border-2 border-white/40 shadow-2xl cursor-pointer flex flex-col items-center justify-center p-4"
                                style={{
                                    transformOrigin: "bottom center",
                                }}
                            >
                                {/* Lucide Icon Container */}
                                <div className={`mb-6 transition-all duration-500 ${isHovered ? 'text-[#002147] scale-110' : 'text-slate-600'}`}>
                                    <IconComponent size={42} strokeWidth={1.5} />
                                </div>

                                {/* Headline */}
                                <h3 className={`font-display text-2xl font-bold tracking-tight mb-1 transition-colors duration-300 ${isHovered ? 'text-[#002147]' : 'text-slate-600'}`}>
                                    {service.title}
                                </h3>

                                {/* Hover-only Content */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="flex flex-col items-center"
                                        >
                                            <p className="text-[11px] leading-relaxed text-slate-500 mb-3 px-4 font-medium">
                                                {service.desc}
                                            </p>

                                            <Link
                                                href={service.link}
                                                className="group/btn flex items-center gap-2 bg-[#002147] text-white px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all hover:bg-[#D4AF37] hover:shadow-xl"
                                            >
                                                Explore
                                                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                    <div className="absolute w-full h-1/3 z-40 bg-navy-950 top-5/6">

                    </div>
                </div>

                {/* MOBILE:  Fan Cards Container */}
                <div className="relative flex md:hidden flex-col justify-center items-center gap-8 min-h-screen pt-10 px-6">
                    {services.map((service, i) => {
                        const IconComponent = service.icon;

                        return (
                            <motion.div
                                key={service.id}
                                /* SCROLL ANIMATION LOGIC 
                                   initial: skewed, grey, and slightly transparent
                                   whileInView: upright, colored, and opaque
                                */
                                initial={{
                                    rotate: -5,
                                    scale: 0.9,
                                    opacity: 0.6,
                                    backgroundColor: "#adb5bd"
                                }}
                                whileInView={{
                                    rotate: 0,
                                    scale: 1,
                                    opacity: 1,
                                    backgroundColor: "#ffffff"
                                }}
                                viewport={{
                                    once: false,      // Animates every time it comes into view
                                    amount: 0.6       // Triggers when 60% of the card is visible
                                }}
                                transition={{
                                    type: "tween",
                                }}
                                /* On Mobile: relative, full width
                                   On Desktop: absolute with original X offset
                                */
                                className="relative md:absolute w-full max-w-[300px] md:w-[240px] h-[320px] md:h-[280px] rounded-2xl border-2 border-white/40 shadow-2xl flex flex-col items-center justify-center p-6"
                                style={{
                                    // Apply specific desktop logic only on md+ screens
                                    marginLeft: typeof window !== 'undefined' && window.innerWidth > 768 ? `${service.x}%` : '0',
                                    transformOrigin: "center center",
                                }}
                            >
                                {/* Icon Container - Auto-colors via whileInView parent state or local CSS */}
                                <div className="mb-6 text-[#002147] transition-transform duration-500 group-hover:scale-110">
                                    <IconComponent size={48} strokeWidth={1.5} />
                                </div>

                                {/* Headline */}
                                <h3 className="font-display text-2xl font-bold tracking-tight mb-2 text-[#002147] text-center">
                                    {service.title}
                                </h3>

                                {/* Description - Visible on mobile by default for better UX, or use whileInView */}
                                <p className="text-[12px] leading-relaxed text-slate-500 mb-6 px-4 font-medium text-center">
                                    {service.desc}
                                </p>

                                {/* CTA Button */}
                                <Link
                                    href={service.link}
                                    className="flex items-center gap-2 bg-[#002147] text-white px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all hover:bg-[#D4AF37]"
                                >
                                    Explore
                                    <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        );
                    })}

                    {/* Decorative navy background block */}
                    <div className="hidden md:block absolute w-full h-1/3 z-[-1] bg-[#002147] bottom-0" />
                </div>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer mt-5 z-50 relative px-8 py-3 rounded-full border border-white text-white flex items-center gap-2 mx-auto hover:bg-[#00d4ff]/10 transition-all text-sm font-semibold tracking-widest uppercase"
                >
                    View More Details
                    <span>→</span>
                </motion.button>
            </div>
        </section>
    );
}