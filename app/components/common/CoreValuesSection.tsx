'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Shield, Heart, Users, Award, Handshake, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import SectionLabel from '../Ui/SectionLabel';

const coreValues = [
    { id: 1, icon: Shield, title: 'Integrity', description: 'Transparent dealings and honest guidance in every transaction.' },
    { id: 2, icon: Handshake, title: 'Commitment', description: 'Dedicated service backed by over 15 years of real estate expertise.' },
    { id: 3, icon: Users, title: 'Customer First', description: 'Solutions carefully tailored around client needs and long-term goals.' },
    { id: 4, icon: Award, title: 'Excellence', description: 'High standards in service delivery, advisory, and market knowledge.' },
    { id: 5, icon: Heart, title: 'Reliability', description: 'Long-term relationships built on trust, consistency, and results.' },
];

export default function CoreValuesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    // Calculate responsive items and width
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
                if (window.innerWidth >= 1024) setItemsPerPage(3);
                else if (window.innerWidth >= 768) setItemsPerPage(2);
                else setItemsPerPage(1);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const maxIndex = coreValues.length - itemsPerPage;

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Auto-play effect
    useEffect(() => {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval);
    }, [handleNext]);

    const cardWidth = containerWidth / itemsPerPage;

    return (
        <section className="relative bg-[#F5F0E8] py-20 lg:py-28 overflow-hidden">
            {/* Background Decorative Elements (Same as before) */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#1B365D]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-amber-200/20 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="mb-16"
                >
                    <div className="mb-4">
                        <SectionLabel>Our Core Values</SectionLabel>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-center text-4xl md:text-5xl lg:text-6xl font-serif text-[#1B365D] leading-snug max-w-4xl mx-auto"
                    >

                        Principles That Guide Every Client Relationship
                    </motion.h2>
                </motion.div>


                {/* Carousel Window */}
                <div className="relative overflow-hidden" ref={containerRef}>
                    <motion.div
                        className="flex"
                        animate={{ x: -(currentIndex * cardWidth) }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: -(maxIndex * cardWidth), right: 0 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -50) handleNext();
                            if (info.offset.x > 50) handlePrev();
                        }}
                    >
                        {coreValues.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.id}
                                    className="px-3 shrink-0"
                                    style={{ width: cardWidth }}
                                >
                                    <div className="group relative h-full">
                                        {/* Your original Card Design */}
                                        <div className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-[#1B365D]/20 transition-all duration-500 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D]/5 via-transparent to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#1B365D]/10 to-amber-100/50 rounded-xl mb-6 group-hover:from-[#1B365D]/20 group-hover:to-amber-200/60 transition-all duration-500">
                                                <Icon className="w-7 h-7 text-[#1B365D] group-hover:text-amber-600 transition-colors duration-500" />
                                            </div>

                                            <div className="relative">
                                                <h3 className="text-2xl font-serif text-[#1B365D] mb-3 group-hover:text-amber-600 transition-colors duration-500">
                                                    {value.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed line-clamp-3">
                                                    {value.description}
                                                </p>
                                            </div>

                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B365D] via-amber-500 to-transparent" />
                                        </div>
                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#1B365D]/20 via-amber-500/20 to-[#1B365D]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Dots Indicator */}

                <div className='hidden justify-between sm:px-10'>

                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-[#1B365D]' : 'w-2 bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className='mt-6 flex items-center justify-center gap-4'>
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrev}
                                className="p-3 rounded-full border text-navy-950/80 border-navy-950/80 hover:bg-[#1B365D] hover:text-white transition-all group"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-3 rounded-full border text-navy-950/80 border-navy-950/80 hover:bg-[#1B365D] hover:text-white transition-all group"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    
                </div>

                {/* Bottom CTA (Same as before) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4">
                        Ready to Find Your <span className="text-gold-500">Dream Sanctuary?</span>
                    </h2>

                     <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed px-6">
                        Whether you are looking for a luxury beachfront villa or a high-growth
                        investment, our team of experts is here to provide transparent,
                        personalized guidance at every step of your journey.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link href="/contact" className="px-10 py-4 bg-[#1B365D] text-white font-bold uppercase text-xs tracking-widest rounded-full shadow-lg hover:bg-[#1B365D]/90 transition-all">
                            Contact Our Experts
                        </Link>
                        <Link href="/properties" className="px-10 py-4 border border-[#1B365D] text-[#1B365D] font-bold uppercase text-xs tracking-widest rounded-full hover:bg-[#1B365D] hover:text-white transition-all">
                            Explore Properties
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}