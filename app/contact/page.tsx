"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import EnquiryForm from "../components/EnquiryForm";
import SectionLabel from "../components/Ui/SectionLabel";

const Contact = () => {
    return (
        <>
            <div className="relative">

                {/* ================= HERO ================= */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <Image
                        src="https://s7ap1.scene7.com/is/image/incredibleindia/vagator-beach-goa-city-1-hero?qlt=82&ts=1742158909874"
                        alt="Luxury Office"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-700/20 to-navy-700/40" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 text-center space-y-4"
                    >
                        <SectionLabel>Let's Connect</SectionLabel>
                        <h1 className="text-5xl md:text-7xl text-white font-bold font-display tracking-tight">
                            Contact <span className="text-gold-500">Us</span>
                        </h1>
                    </motion.div>
                </section>

                {/* ================= CONTACT SECTION ================= */}
                <section className="relative py-16 bg-[#faf9f7]">
                    <div className="w-11/12 md:w-5/6 mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                            {/* LEFT INFO */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <p className="uppercase tracking-widest text-sm text-gold-500 mb-4 font-heading">
                                    Get in touch
                                </p>

                                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                                    Let’s start a conversation
                                </h2>

                                <p className="text-gray-600 max-w-md mb-12">
                                    Get in touch with Crownpoint Estates for expert guidance in
                                    buying, selling, renting, or investing in real estate across
                                    Gurugram and Delhi NCR.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <MapPin className="text-navy-950 mt-1" />
                                        <p>
                                            Crownpoint Estates <br />
                                            65, Lower Ground Floor, Akashneem Marg, <br />
                                            DLF Phase-2, Gurugram – 122002
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Phone className="text-navy-950 mt-1" />
                                        <p>+91 98115 56625 / 98107 86375 / 99990 19763</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Mail className="text-navy-950 mt-1" />
                                        <p>sales@crownpointestates.com</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* RIGHT FORM */}
                            <motion.div
                                className="bg-white p-10 md:p-14 shadow-sm"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

                                <EnquiryForm variant="default" btnText="SEND MESSAGE" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ================= MAP ================= */}
                <motion.section
                    className="relative h-[420px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8734948011775!2d77.08983769999999!3d28.483356200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19fc22d63287%3A0x86013e4f6dd2d196!2sCrownpoint%20Estate!5e0!3m2!1sen!2sin!4v1768914202564!5m2!1sen!2sin"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.section>

            </div>
        </>
    );
};

export default Contact;