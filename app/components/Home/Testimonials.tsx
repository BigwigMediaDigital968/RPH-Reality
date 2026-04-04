"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "../Ui/SectionLabel";
import { fadeUp, motionContainer } from "@/app/utils/motion";

const testimonials = [
  {
    name: "Vikram Malhotra",
    role: "Tech Consultant, Bangalore",
    avatar: "VM",
    rating: 5,
    text: "RPH Realty made my Goa property investment seamless. Their knowledge of local titles is unparalleled—I found the perfect luxury villa in Assagao in just two weeks.",
  },
  {
    name: "Arjun Deshmukh",
    role: "Business Owner, Pune",
    avatar: "AD",
    rating: 5,
    text: "Exceptional service from start to finish. The team understood I wanted a quiet retreat in South Goa and delivered beyond expectations. Highly recommend RPH for a holiday home.",
  },
  {
    name: "Priya Sharma",
    role: "Creative Director, Mumbai",
    avatar: "PS",
    rating: 5,
    text: "Finding a reliable partner in Goa was daunting, but RPH Realty made it effortless. They handled the paperwork professionally and found us a stunning heritage home in Siolim.",
  },
  {
    name: "Ananya Iyer",
    role: "NRI Investor, Singapore",
    avatar: "AI",
    rating: 5,
    text: "The best real estate experience I've had in India. Their attention to detail and curated portfolio of coastal apartments is unmatched in the region.",
  },
  {
    name: "Rohan Mehra",
    role: "Restaurateur, Delhi",
    avatar: "RM",
    rating: 5,
    text: "RPH Realty's network is incredible. They helped me secure a commercial plot for my new venture near Anjuna. Transparent, honest, and extremely efficient.",
  },
  {
    name: "Sanjay Kulkarni",
    role: "Retired Professional, Hyderabad",
    avatar: "SK",
    rating: 5,
    text: "I was looking for a peaceful retirement spot. The team at RPH showed me beautiful gated communities in Porvorim that hit every requirement on my list.",
  },
  {
    name: "Meera Reddy",
    role: "Digital Nomad, Chennai",
    avatar: "MR",
    rating: 5,
    text: "Buying a studio near the beach was a dream. RPH Realty helped me navigate the legalities of the coastal regulation zones with ease. Truly expert guidance.",
  },
  {
    name: "Kabir Khan",
    role: "Architect, Hyderabad",
    avatar: "KK",
    rating: 5,
    text: "As an architect, I'm picky about design. RPH understood my aesthetic and only showed me high-end boutique projects that actually met my standards.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#D4A435">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  // 1. Initialize Embla with Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-off-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={motionContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Testimonials</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-navy-950 mt-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            What Our Clients <br /> <em className="text-gold-500 not-italic">Say About Us</em>
          </motion.h2>
        </motion.div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={motionContainer}
            className="flex"
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3"
              >
                <motion.div
                  variants={fadeUp}
                  className="bg-navy-900 backdrop-blur-sm border border-navy-800 rounded-2xl p-7 relative h-full flex flex-col justify-between"
                >
                  <div className="font-display text-7xl leading-none text-gold-400/20 absolute top-4 left-6 select-none">
                    &ldquo;
                  </div>
                  <div className="relative">
                    <StarRating count={t.rating} />
                    <p className="font-sans text-white/70 text-sm leading-relaxed mt-4 mb-6">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-navy-700">
                      <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center text-gold-300 text-xs font-sans font-semibold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-white text-sm font-sans font-semibold">
                          {t.name}
                        </div>
                        <div className="text-white/40 text-xs font-sans">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls Section (Bottom Right) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-6">

          {/* Pagination Dots */}
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`cursor-pointer h-1.5 transition-all duration-300 rounded-full ${index === selectedIndex ? "w-8 bg-gold-500" : "w-2 bg-navy-950"
                  }`}
              />
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="cursor-pointer w-12 h-12 rounded-full border border-navy-200 flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="cursor-pointer w-12 h-12 rounded-full border border-navy-200 flex items-center justify-center text-navy-900 hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}