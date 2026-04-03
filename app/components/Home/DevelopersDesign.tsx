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
    { alt: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { alt: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { alt: "Bitcoin", src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
    { alt: "Ethereum", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { alt: "Tether", src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
    { alt: "Solana", src: "https://upload.wikimedia.org/wikipedia/commons/3/34/Solana_logo.svg" },
    { alt: "Ripple", src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
    { alt: "Swift", src: "https://upload.wikimedia.org/wikipedia/commons/7/77/Swift_logo.svg" },
    { alt: "UPI", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
];

export default function PaymentMethods() {
    // 2. Type the State as an array of numbers
    const [activeIndices, setActiveIndices] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const firstRandom = Math.floor(Math.random() * paymentIcons.length);
            const secondRandom = Math.floor(Math.random() * paymentIcons.length);
            setActiveIndices([firstRandom, secondRandom]);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-navy-950 text-white overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                {/* Icons Grid */}
                <div className="grid grid-cols-3 gap-10 w-full lg:w-1/2 relative">
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
                                <div className="relative w-16 h-16 md:w-20 md:h-20">
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt}
                                        fill
                                        unoptimized // Crucial for external SVGs
                                        className="object-contain transition-all duration-1000 ease-in-out"
                                        style={{
                                            filter: isActive
                                                ? "grayscale(0%) brightness(100%)"
                                                : "grayscale(100%) brightness(150%) opacity(0.2)",
                                            transform: isActive ? "scale(1.1)" : "scale(1)",
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