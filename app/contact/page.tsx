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
                  Get in touch with RPH Realty for expert guidance in buying,
                  selling, or investing in premium real estate across the
                  beautiful coastal landscapes of Goa.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <MapPin className="text-navy-950 mt-1" />
                    <p>
                      Gera Imperium Star <br />
                      Office no. 812-A, 8th floor <br />
                      Opposite Hotel Novotel, <br />
                      Patto Centre, Panjim
                      Goa India
                    </p>
                  </div>

                  <a
                  href="tel:+919284788693" className="flex gap-4 ">
                    <Phone className="text-navy-950 mt-1" />
                    <p>+919284788693</p>
                  </a>

                  <a href="mailto:contact@rphrealty.com" className="hidden gap-4">
                    <Mail className="text-navy-950 mt-1" />
                    <p>contact@rphrealty.com</p>
                  </a>
                </div>
              </motion.div>

              {/* RIGHT FORM */}
              <motion.div
                className="bg-white p-10 md:p-6 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>

                <EnquiryForm
                  variant="default"
                  btnText="SEND MESSAGE"
                  source={"contact-page"}
                />
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.812669062055!2d73.8332836!3d15.4945054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc1870bd62f33%3A0x6f779ece0ea56530!2sGera&#39;s%20Imperium%20Star!5e0!3m2!1sen!2sin!4v1777984152440!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
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
