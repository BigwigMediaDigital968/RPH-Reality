"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 1. Define the Interface for our Data
interface PaymentIcon {
    alt: string;
    src: string;
}

const paymentIcons: PaymentIcon[] = [
    { alt: "Mastercard", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/69137/1635846856319-d-logo.jpg" },
    { alt: "Visa", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/61401/Akar-Realty-1394604379708-D-Logo.gif" },
    { alt: "Bitcoin", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/67206/1744711696658-d-logo.jpg" },
    { alt: "Ethereum", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/55458/1756985247226-Shantilal-Real.jpg" },
    { alt: "Tether", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/57227/Riviera-Constructions-Pvt.-Ltd.-1386755766627-Company-Logo.jpg" },
    { alt: "Solana", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/70476/Alcon-Developers-1556090465288-builder-logo-one.jpg" },
    { alt: "Ripple", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/79927/Mohidin-Properties-And-Holdings-1564034017746-Mohidin-Properties.png" },
    { alt: "Swift", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/100495/1773046372281-d-logo.jpg" },
    { alt: "UPI", src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/54500/1668063896460-Provident-logo-without-tag-line.jpg" },
];

export default function PaymentMethods() {
    // 2. Type the State as an array of numbers
    const [activeIndices, setActiveIndices] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndices((prevIndices) => {
                // Get the current index (assuming it's a single-item array)
                const currentIndex = prevIndices[0] ?? -1;

                // Calculate the next index, resetting to 0 at the end of the list
                const nextIndex = (currentIndex + 1) % paymentIcons.length;

                return [nextIndex];
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-navy-950 text-white overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                {/* Icons Grid */}
                <div className="grid grid-cols-3 gap-6 w-full lg:w-1/2 relative">
                    {paymentIcons.map((icon, i) => {
                        const isActive = activeIndices.includes(i);

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, Math.random() * 8 - 4, 0, Math.random() * 8 - 4, 0],
                                    x: [0, Math.random() * 6 - 3, 0, Math.random() * 6 - 3, 0],
                                }}
                                transition={{
                                    duration: 10 + i,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative flex items-center justify-center p-4"
                            >
                                <div
                                    onMouseEnter={() => setActiveIndices([i])}
                                    onMouseLeave={() => setActiveIndices([])}
                                    className="relative w-20 h-20 md:w-28 md:h-28">
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt}
                                        fill
                                        unoptimized // Crucial for external SVGs
                                        className="object-contain transition-all duration-2000 ease-in-out"
                                        style={{
                                            filter: isActive
                                                ? "grayscale(0%) brightness(100%)"
                                                : "grayscale(100%) brightness(150%) opacity(0.2)",
                                            transform: isActive ? "scale(1.1)" : "scale(1)"
                                        }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Trusted Developer Network: <span className="text-[#00B4D8]">Building Excellence</span> Together

                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed mt-6">
                            We collaborate with some of the most reputed developers to bring you
                            premium residential and commercial properties.
                        </p>

                        <div className="pt-8">
                            <button className="cursor-pointer px-8 py-3 rounded-full border border-[#00D4FF] text-[#00D4FF] text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#00D4FF]/10 transition-all duration-300">
                                View Details
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}