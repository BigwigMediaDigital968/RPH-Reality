'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Home, ShieldCheck, TrendingUp, Users } from "lucide-react";
import PropertyListingSection from './PropertyListingSection';




export default function Hero() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    // Parallax transforms
    const videoScale = useTransform(scrollY, [0, 500], [1, 1.2]);
    const videoOpacity = useTransform(scrollY, [0, 300], [1, 1]);
    const textY = useTransform(scrollY, [0, 500], [0, -100]);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 1]);
    const overlayOpacity = useTransform(scrollY, [0, 200], [0, 1]);

    useEffect(() => {
        const unsubscribe = scrollY.onChange((latest) => {
            setScrolled(latest > 100);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <>
            <section className="relative h-[150vh]">
                {/* Sticky Video Background */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <motion.div
                        style={{ scale: videoScale }} // keep subtle parallax zoom if you want
                        className="w-full h-full"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                        </video>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
                    </motion.div>
                </div>

                {/* Scrolling Content */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-11/12">
                    <div className="">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="relative w-full backdrop-blur-xl bg-white/5 border border-navy-950/10 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl max-w-5xl mx-auto w-full"
                        >
                            {/* Corners */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-400/50 rounded-tl-3xl" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-400/50 rounded-br-3xl" />

                            {/* Grid */}
                            <div className="absolute inset-0 opacity-5">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
                                        backgroundSize: "50px 50px",
                                        backgroundColor: "#f8fafc" // A very light "Ghost White" / Slate-50
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="mb-2"
                                >
                                    <div className="inline-block px-6 py-2 bg-[#1B365D]/20 border border-navy-950/30 rounded-full">
                                        <span className="text-navy-700 text-sm font-semibold tracking-wider uppercase">
                                            Luxury Real Estate
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.h1
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white mb-6 leading-tight"
                                >
                                    <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
                                        Welcome to
                                    </span>
                                    <span className="block bg-gradient-to-r from-navy-700 via-navy-800 to-navy-950 bg-clip-text text-transparent">
                                        Royal Prime Homes
                                    </span>
                                </motion.h1>

                                <motion.p
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                    className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8 font-light leading-relaxed"
                                >
                                    Looking for the perfect property in the breathtaking paradise of Goa?
                                    Look no further than GoaPropertyDeal.com, your trusted source for real
                                    estate and development opportunities in this tropical haven.
                                </motion.p>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 1.1 }}
                                    className="w-32 h-0.5 bg-gradient-to-r from-navy-700 to-transparent origin-left mb-8"
                                />

                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <button className="cursor-pointer px-8 py-4 bg-navy-700 hover:bg-navy-900 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
                                        Explore Properties
                                    </button>
                                    <button className="cursor-pointer px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full transition-all">
                                        Contact Us
                                    </button>
                                </motion.div>
                            </div>

                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 rounded-3xl blur-2xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Next Section - to demonstrate scroll effect */}

        </>
    );
}