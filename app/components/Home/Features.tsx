"use client";

import { fadeUp, motionContainer } from "@/app/utils/motion";
import { AnimatePresence, motion, useInView, Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Verified Titles",
    desc: "Every property in our portfolio undergoes a rigorous 30-year title search and legal vetting to ensure a risk-free investment.",
    cta: "Our Legal Process",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Curated Portfolio",
    desc: "From restored Portuguese mansions to sustainable modern villas, we only list homes that meet our 'Prime' standard.",
    cta: "View Selection",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "Prime Management",
    desc: "Our relationship doesn't end at the sale. We provide end-to-end property management and rental yield optimization for your home.",
    cta: "Explore Services",
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
            className="font-display text-navy-900 mt-4"
            style={{
              fontSize: "clamp(2rem,4vw,3.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Elevating the Standard of <br />
            <em className="text-gold-400 not-italic">Goan Luxury Living</em>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <PropertyCard key={f.title} f={f} index={i} />
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


export const PropertyCard = ({ f, index }: { f: any, index: number }) => {
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
      className="perspective-1000 w-full h-[300px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      key={index}
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
          <div className=" hidden items-center gap-2 text-xs font-bold tracking-widest uppercase text-gold-400">
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
            {f.title}
          </h3>
          <p className="text-blue-100/80 text-sm leading-relaxed mb-6 flex-grow">
            {f.desc}
          </p>
          <div className=" hidden items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400">
            {f.cta}
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
