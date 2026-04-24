"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variant, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionLabel from "../Ui/SectionLabel";

// 1. Define the Interface for our Data
interface PaymentIcon {
  alt: string;
  src: string;
}

const paymentIcons: PaymentIcon[] = [
  {
    alt: "Mastercard",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/69137/1635846856319-d-logo.jpg",
  },
  {
    alt: "Visa",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/61401/Akar-Realty-1394604379708-D-Logo.gif",
  },
  {
    alt: "Bitcoin",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/67206/1744711696658-d-logo.jpg",
  },
  {
    alt: "Ethereum",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/55458/1756985247226-Shantilal-Real.jpg",
  },
  {
    alt: "Tether",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/57227/Riviera-Constructions-Pvt.-Ltd.-1386755766627-Company-Logo.jpg",
  },
  {
    alt: "Solana",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/70476/Alcon-Developers-1556090465288-builder-logo-one.jpg",
  },
  {
    alt: "Ripple",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/79927/Mohidin-Properties-And-Holdings-1564034017746-Mohidin-Properties.png",
  },
  {
    alt: "Swift",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/100495/1773046372281-d-logo.jpg",
  },
  {
    alt: "UPI",
    src: "https://img.staticmb.com/mbimages/photo_dir/developer/original_images/54500/1668063896460-Provident-logo-without-tag-line.jpg",
  },
];

export default function PaymentMethods() {
  // 2. Type the State as an array of numbers
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices((prevIndices) => {
        // Get the current index (assuming it's a single-item array)
        const currentIndex = prevIndices[0] ?? -1;

        // Calculate the next index, resetting to 0 at the end of the list
        const nextIndex = (currentIndex + 1) % paymentIcons.length;

        return [nextIndex];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 pt-5 bg-navy-950 text-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-10 text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="block w-8 h-px bg-gold-400" />
            <span className="text-gold-500 text-xs tracking-[0.2em] font-semibold uppercase font-sans">
              OUR PROJECTS
            </span>
            <span className="block w-8 h-px bg-gold-400" />
          </div>
          <h2 className="text-white font-display text-4xl mb-4">
            Our Signature <br /> <span className="text-gold-500">Projects</span>
          </h2>
        </div>
        <div className="hidden px-6 flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* Icons Grid */}
          <div className="grid grid-cols-3 gap-6 w-full lg:w-1/2 relative">
            {paymentIcons.map((icon, i) => {
              const isActive = activeIndices.includes(i);

              return (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, Math.random() * 8 - 4, 0, Math.random() * 8 - 4, 0],
                    x: [0, Math.random() * 6 - 3, 0, Math.random() * 6 - 3, 0],
                  }}
                  transition={{
                    duration: 10 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center justify-center p-4"
                >
                  <div
                    onMouseEnter={() => setActiveIndices([i])}
                    onMouseLeave={() => setActiveIndices([])}
                    className="relative w-20 h-20 md:w-28 md:h-28"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      fill
                      unoptimized // Crucial for external SVGs
                      className="object-contain transition-all duration-2000 ease-in-out"
                      style={{
                        filter: isActive
                          ? "grayscale(0%) brightness(100%)"
                          : "grayscale(100%) brightness(150%) opacity(0.2)",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Building Excellence Together
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed mt-6">
                We partner with some of the most reputed developers to bring you
                premium residential and commercial properties, carefully
                selected for their quality, location, and long-term value.
              </p>

              <div className="pt-8">
                <Link
                  href={"/developers"}
                  className="inline-flex cursor-pointer items-center gap-2 px-8 py-3 rounded-full border border-white text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#00D4FF]/10 transition-all duration-300"
                >
                  Developers
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="p-4">
          <ProjectsSection />
        </div>
      </div>
    </section>
  );
}

const ProjectsSection = () => {
  const projects = [
    {
      id: "01",
      title: "Hollywood Exhibition",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop",
      desc: "An immersive digital journey through the golden era of cinema.",
      link: "#",
    },
    {
      id: "02",
      title: "Genius Loci",
      image:
        "https://images.unsplash.com/photo-1633234606371-4e8edaa6eb30?w=600&auto=format&fit=crop&q=60",
      desc: "Exploring the spirit of place through high-end architectural design.",
      link: "#",
    },
    {
      id: "03",
      title: "Big Apple",
      image:
        "https://images.unsplash.com/photo-1635789473427-c881c73eb75a?q=80&w=1074&auto=format&fit=crop",
      desc: "Iconic urban living redefined for the modern metropolitan investor.",
      link: "#",
    },
    {
      id: "04",
      title: "Paris Flavor",
      image:
        "https://images.unsplash.com/photo-1565255822848-80db21938837?q=80&w=1073&auto=format&fit=crop",
      desc: "Bespoke luxury residences reflecting timeless Parisian elegance.",
      link: "#",
    },
  ];

  return (
    <section className=" pt-10">
      <div className="max-w-7xl mx-auto">
        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-900 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Subtle darkening overlay for visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {/* Initial Title (Bottom Left) */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-8 z-10"
          >
            <h3 className="text-white text-2xl font-display font-semibold tracking-wide drop-shadow-lg">
              {project.title}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Overlay Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-12 bg-navy-950/30 backdrop-blur-[2px]"
      >
        <div className="max-w-md">
          {/* Decorative index */}
          <span className="text-gold-500 font-mono text-xs mb-4 block tracking-[0.3em] font-bold">
            {project.id} —
          </span>

          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-xl sm:text-3xl md:text-4xl font-display font-bold mb-4"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-sm md:text-base leading-relaxed mb-8"
          >
            {project.desc}
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 px-6 py-3 border border-gold-500/50 rounded-full  text-[10px] font-bold uppercase tracking-widest bg-gold-500 text-navy-950 transition-all duration-300"
          >
            View Project <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
