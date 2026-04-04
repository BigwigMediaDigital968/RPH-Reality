"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";
import Image from "next/image";
import EnquiryForm from "../EnquiryForm";

export default function LeadForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
              className="font-display text-navy-900 mt-4"
              style={{
                fontSize: "clamp(2rem,4vw,3.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Get Matched with Your{" "} <br />
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
            <EnquiryForm btnText="Request a Callback" />
          </div>
        </motion.div>
      </div>
    </section >
  );
}
