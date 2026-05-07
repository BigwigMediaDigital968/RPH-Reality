"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

import {
  Home,
  Key,
  TrendingUp,
  Landmark,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Buy",
    rotation: -12,
    x: -40,
    desc: "Discover handpicked premium estates and beachfront sanctuaries.",
    link: "/buy",
    icon: Home,
  },
  {
    id: 2,
    title: "Rent",
    rotation: -5,
    x: -15,
    desc: "Experience luxury Goan living with our curated holiday rentals.",
    link: "/rent",
    icon: Key,
  },
  {
    id: 3,
    title: "Lease",
    rotation: 12,
    x: 40,
    desc: "Professional asset management for long-term peace of mind.",
    link: "/lease",
    icon: Landmark,
  },
];

const sections = [
  {
    id: "01",
    title: "Buy Property",
    subtitle: "BUY WITH CONFIDENCE",
    desc: "Explore handpicked villas, apartments, and investment-ready properties across Goa. We help you find the right home with strong appreciation potential and rental value-making every purchase a smart move.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60",
    cta: "View PROPERTIES",
    link: "/buy",
    side: "left",
  },
  {
    id: "02",
    title: "Sell Property",
    subtitle: "SELL WITH STRATEGY",
    desc: "Sell your property in Goa with the right pricing, premium exposure, and verified buyers. From listing to closing, we manage everything to get you the best deal, fast and hassle-free.",
    image:
      "https://images.unsplash.com/photo-1653928359063-13eb336a4196?w=600&auto=format&fit=crop&q=60",
    cta: "List Your Asset",
    link: "/sell",
    side: "right",
  },
];

export default function ServicesFan() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-navy-950 overflow-hidden text-center">
      <div className="max-w-11/12 mx-auto px-5">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="block w-8 h-px bg-gold-400" />
            <span className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase font-sans">
              Services
            </span>
            <span className="block w-8 h-px bg-gold-400" />
          </div>
          <h2 className="text-white font-display text-4xl mb-4">
            Services & <span className="text-gold-500">Expertise</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            From bespoke beachside villas to expansive heritage plots, we
            provide a curated path to your prime Goan sanctuary.
          </p>
        </div>

        {/* Fan Cards Container */}
        
        <PropertySovereignSection />

        {/* Action Button */}

        <Link
          href={"/properties"}
          className="cursor-pointer mt-10 z-50 relative px-8 py-3 rounded-full border border-white text-white inline-flex items-center gap-2 mx-auto hover:bg-[#00d4ff]/10 transition-all text-sm font-semibold tracking-widest uppercase"
        >
          Explore Properties
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

const PropertySovereignSection = () => {
  // Animation Variants for reusability
  const revealVariants: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.2 },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      transition: { duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className=" overflow-hidden">
      <div className="max-w-6xl mx-auto p-0 sm:px-6 lg:px-14">
        {sections.map((item, i) => (
          <motion.div
            key={item.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`group flex flex-col lg:flex-row items-stretch mb-20 last:mb-0 ${
              item.side === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Column: Curtain Reveal + Scale Down */}
            <div className="w-full lg:w-1/2 relative aspect-square overflow-hidden">
              <motion.div
                variants={revealVariants}
                className="relative h-full w-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-all ease-in-out duration-400"
                  priority
                />
                {/* Subtle dark wash for premium feel */}
                <div className="absolute inset-0 bg-navy-950/20" />
              </motion.div>

              {/* Massive Decorative Number - Animates slower for parallax effect */}
              <motion.div
                initial={{ opacity: 0, x: item.side === "left" ? 100 : -100 }}
                whileInView={{ opacity: 0.03, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className={`absolute -bottom-10 ${item.side === "left" ? "-right-10" : "-left-10"} hidden xl:block`}
              >
                <span className="text-[15rem] font-display font-bold leading-none text-white select-none">
                  {item.id}
                </span>
              </motion.div>
            </div>

            {/* Content Column: Staggered Blur Reveal */}
            <motion.div
              variants={containerVariants}
              className="w-full lg:w-1/2 bg-white p-10 md:p-12 lg:p-10 flex flex-col justify-center relative z-10"
            >
              <motion.div
                variants={textVariants}
                className="flex justify-center items-center gap-3 mb-4"
              >
                <span className="text-gold-500 text-center uppercase tracking-[0.5em] text-[10px] font-bold">
                  {item.subtitle}
                </span>
              </motion.div>

              <motion.h2
                variants={textVariants}
                className="text-white text-3xl sm:text-4xl md:text-5xl font-light mb-8 leading-tight tracking-tight"
              >
                <span className="font-serif italic text-navy-900">
                  {item.title}
                </span>
              </motion.h2>

              <motion.p
                variants={textVariants}
                className="text-navy-900/80 text-base sm:text-lg leading-relaxed mb-12 font-light max-w-md"
              >
                {item.desc}
              </motion.p>

              <motion.div variants={textVariants}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-6"
                >
                  <Link
                    href={item.link}
                    className="group flex items-center gap-2 sm:gap-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                      <span className="relative bg-gold-500 w-10 sm:w-14 aspect-square rounded-full flex items-center justify-center text-navy-950 transition-transform duration-500 group-hover:rotate-[360deg]">
                        <ArrowUpRight size={24} />
                      </span>
                    </div>
                    <div className="text-navy-900 uppercase flex items-center tracking-[0.3em] text-xs font-bold border-b border-white/10 group-hover:border-gold-500 transition-all pb-2">
                      <span>{item.cta}</span>
                    </div>
                  </Link>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
