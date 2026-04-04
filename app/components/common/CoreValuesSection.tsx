'use client';

import { motion, Variants } from 'framer-motion';
import { Shield, Heart, Users, Award, Handshake } from 'lucide-react';
import Link from 'next/link';

const coreValues = [
    {
        id: 1,
        icon: Shield,
        title: 'Integrity',
        description: 'Transparent dealings and honest guidance in every transaction.',
    },
    {
        id: 2,
        icon: Handshake,
        title: 'Commitment',
        description: 'Dedicated service backed by over 15 years of real estate expertise.',
    },
    {
        id: 3,
        icon: Users,
        title: 'Customer First',
        description: 'Solutions carefully tailored around client needs and long-term goals.',
    },
    {
        id: 4,
        icon: Award,
        title: 'Excellence',
        description: 'High standards in service delivery, advisory, and market knowledge.',
    },
    {
        id: 5,
        icon: Heart,
        title: 'Reliability',
        description: 'Long-term relationships built on trust, consistency, and results.',
    },
];

export default function CoreValuesSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    };

    return (
        <section className="relative bg-[#F5F0E8] py-20 lg:py-28 overflow-hidden">
            {/* Background Decorative Elements */}
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
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-sm uppercase tracking-widest text-amber-600 font-semibold mb-4"
                    >
                        Our Core Values
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1B365D] max-w-4xl"
                    >
                        Principles That Guide Every Client Relationship
                    </motion.h2>
                </motion.div>

                {/* Values Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {coreValues.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={value.id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.3 },
                                }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-[#1B365D]/20 transition-all duration-500 overflow-hidden">
                                    {/* Hover Background Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D]/5 via-transparent to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon Container */}
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                        className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#1B365D]/10 to-amber-100/50 rounded-xl mb-6 group-hover:from-[#1B365D]/20 group-hover:to-amber-200/60 transition-all duration-500"
                                    >
                                        <Icon className="w-7 h-7 text-[#1B365D] group-hover:text-amber-600 transition-colors duration-500" />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-2xl font-serif text-[#1B365D] mb-3 group-hover:text-amber-600 transition-colors duration-500">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>

                                    {/* Decorative Corner Element */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Bottom Accent Line */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B365D] via-amber-500 to-transparent origin-left"
                                    />
                                </div>

                                {/* Card Shadow/Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#1B365D]/20 via-amber-500/20 to-[#1B365D]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA or Additional Info (Optional) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4 font-display">
                        Ready to Find Your <span className="text-gold-500">Dream Sanctuary?</span>
                    </h2>

                    <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed px-6">
                        Whether you are looking for a luxury beachfront villa or a high-growth
                        investment, our team of experts is here to provide transparent,
                        personalized guidance at every step of your journey.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer inline-flex items-center gap-2 px-10 py-4 bg-[#1B365D] text-white font-bold uppercase text-xs tracking-widest rounded-full transition-all shadow-lg hover:shadow-[#1B365D]/20"
                        >
                            <Link href={'/contact-us'}>Contact Our Experts</Link>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer inline-flex items-center gap-2 px-10 py-4 bg-transparent border border-navy-700 text-navy-700 font-bold uppercase text-xs tracking-widest rounded-full transition-all hover:border-gold-500 hover:text-gold-500"
                        >
                            View Properties
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 right-20 w-3 h-3 bg-amber-400/40 rounded-full blur-sm"
            />
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-1/4 left-20 w-4 h-4 bg-[#1B365D]/30 rounded-full blur-sm"
            />
            <motion.div
                animate={{
                    y: [0, -25, 0],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 left-1/4 w-2 h-2 bg-amber-300/30 rounded-full blur-sm"
            />
        </section>
    );
}