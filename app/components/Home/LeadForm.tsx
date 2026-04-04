"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";
import Image from "next/image";

export default function LeadForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    purpose: "",
    note: "",
  });

  return (
    <section ref={ref} id="contact" className="py-20 lg:py-28 bg-off-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={motionContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Get in Touch</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-navy-900 font-semibold mt-4"
              style={{
                fontSize: "clamp(1.75rem,3.5vw,2.75rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Let's Find Your{" "}
              <em className="text-gold-400 not-italic">Perfect Property</em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-charcoal-500 text-sm mt-3 leading-relaxed"
            >
              Leave your details and one of our expert agents will reach out
              within 24 hours.
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-white rounded-3xl overflow-hidden border border-border shadow-xl"
        >
          {/* Left Side: Image */}
          <div className="w-full h-[300px] lg:h-auto relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Luxury Property"
              fill
              unoptimized
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Side: Form */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#D4A435"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-navy-900 text-2xl font-semibold mb-2">
                  Thank You!
                </h3>
                <p className="font-sans text-charcoal-500 text-sm">
                  We'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Grid wrapper */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+971 50 000 0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
                    />
                  </div>

                  {/* Purpose */}
                </div>
                <div className="grid gap-4">
                  <div className="w-full lg:col-span-2">
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
                      Purpose
                    </label>
                    <select
                      value={form.purpose}
                      onChange={(e) =>
                        setForm({ ...form, purpose: e.target.value })
                      }
                      className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200 bg-white"
                    >
                      <option value="">Select purpose</option>
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                      <option value="rent">Rent</option>
                      <option value="invest">Invest</option>
                    </select>
                  </div>

                  {/* Note */}
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
                      Note
                    </label>
                    <textarea
                      placeholder="Write your requirement..."
                      rows={4}
                      value={form.note}
                      onChange={(e) =>
                        setForm({ ...form, note: e.target.value })
                      }
                      className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    if (form.name && form.phone) setSubmitted(true);
                  }}
                  className="w-full py-4 bg-navy-900 text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-lg hover:bg-navy-800 transition-colors duration-200 mt-2"
                >
                  Request a Callback
                </button>

                <p className="text-center text-xs font-sans text-charcoal-400">
                  By submitting, you agree to our Privacy Policy.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
