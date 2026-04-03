"use client";

import { fadeUp, motionContainer } from "@/app/utils/motion";
import { AnimatePresence, motion, useInView, Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    title: "Buy Property",
    desc: "Explore thousands of ready and off-plan properties across Dubai's most sought-after communities.",
    cta: "Browse Properties",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
    ),
    title: "Rent a Home",
    desc: "Short or long-term rentals in premium locations — furnished, unfurnished, and holiday homes.",
    cta: "View Rentals",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"
        />
      </svg>
    ),
    title: "Sell with Us",
    desc: "Get the best market price for your property with our expert valuation and marketing services.",
    cta: "List Your Property",
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-off-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>What We Offer</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-navy-900 font-semibold mt-4"
            style={{
              fontSize: "clamp(2rem,4vw,3.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Your Gateway to Dubai{" "}
            <em className="text-gold-400 not-italic">Real Estate</em>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <PropertyCard f={f} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="block w-8 h-px bg-gold-400" />
      <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase font-sans">
        {children}
      </span>
      <span className="block w-8 h-px bg-gold-400" />
    </div>
  );
}


export const PropertyCard = ({ f, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Animation variant for the initial staggered entrance
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="perspective-1000 w-full h-[380px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} // Premium smooth easing
      >

        {/* --- FRONT SIDE: LIGHT THEME (GOA VIBE) --- */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl p-8 border border-slate-100 flex flex-col shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-6">
            {f.icon}
          </div>
          <h3 className="font-serif text-slate-900 text-2xl font-semibold mb-3">
            {f.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
            {f.desc}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-600">
            {f.cta}
            <ArrowIcon />
          </div>
        </div>

        {/* --- BACK SIDE: DARK THEME (ROYAL VIBE) --- */}
        <div className="absolute inset-0 backface-hidden bg-[#002147] rotate-y-180 rounded-2xl p-8 flex flex-col text-white">
          <div className="w-14 h-14 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
            {f.icon}
          </div>
          <h3 className="font-serif text-white text-2xl font-semibold mb-3">
            Royal Standard
          </h3>
          <p className="text-blue-100/80 text-sm leading-relaxed mb-6 flex-grow">
            Elevating your Goan lifestyle with our "Prime-Only" selection of verified luxury estates.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400">
            Check Availability
            <ArrowIcon />
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

// Simple Arrow SVG
const ArrowIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
