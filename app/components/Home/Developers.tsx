"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";

const partnerDevelopers = [
  { name: "EMAAR", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop&q=80" },
  { name: "NAKHEEL", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=200&fit=crop&q=80" },
  { name: "DAMAC", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=200&fit=crop&q=80" },
  { name: "MERAAS", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop&q=80" },
  { name: "ALDAR", img: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=400&h=200&fit=crop&q=80" },
  { name: "SELECT GROUP", img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=200&fit=crop&q=80" },
];

export default function Developers() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 bg-[#FBFBFA] border-y border-slate-200 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <SectionLabel>Global Network</SectionLabel>
          <h2 className="font-display text-navy-900 text-4xl md:text-5xl font-bold mt-6 tracking-tight">
            Our Development Partners
          </h2>
          <p className="font-sans text-slate-400 text-xs md:text-sm mt-4 tracking-[0.3em] uppercase">
            Collaborating with the masters of modern architecture
          </p>
        </motion.div>

        {/* Desktop Grid / Mobile Drag Slider Container */}
        <motion.div
          ref={scrollRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className="flex gap-6 overflow-x-auto pb-10 lg:pb-0 no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {partnerDevelopers.map((dev) => (
            <motion.div
              key={dev.name}
              variants={fadeUp}
              whileHover={{ y: -12, scale: 1.02 }}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] group relative bg-white border border-slate-100 rounded-3xl aspect-[4/3] flex flex-col items-center justify-center p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,33,71,0.15)] scroll-snap-align-center"
            >
              {/* Subtle Glass Tint on Hover */}
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/[0.02] transition-colors duration-500 rounded-3xl" />

              <div className="relative z-10 w-full flex flex-col items-center gap-8">
                <div className=" w-full flex items-center justify-center">
                  <img
                    src={dev.img}
                    alt={dev.name}
                    className="max-h-full w-full object-contain filter grayscale-25 group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-110 group-hover:scale-125"
                  />
                </div>

                <div className="text-center space-y-1">
                  <span className="block font-display text-xs font-black tracking-[0.25em] text-navy-200 group-hover:text-navy-900 transition-colors duration-500 uppercase">
                    {dev.name}
                  </span>
                  <span className="block text-[10px] text-slate-700 opacity-50 group-hover:opacity-100 transition-opacity duration-500 tracking-widest uppercase">
                    Official Partner
                  </span>
                </div>
              </div>

              {/* Royal Gold Accent Line */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-[3px] bg-amber-500 w-0 group-hover:w-12 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}