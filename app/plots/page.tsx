'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Map, Maximize2, Mountain, Compass, ArrowRight } from 'lucide-react';
import Hero from '../components/Ui/Hero';
import SectionLabel from '../components/Ui/SectionLabel';
import { fadeUp, motionContainer } from '../utils/motion';
import Link from 'next/link';

export default function PlotsListiing() {
    return (
        <>
            <Hero
                title={
                    <>
Goa Luxury
                        <span className="italic text-gold-400"> Plots</span>
                    </>
                }
                image="/banner-plots.png"
                label="Goa Land Collection"
            />

            <PlotsSection />
        </>
    )
}


const plotsData = [
  {
    id: "01",
    name: "Azure Coast Enclave",
    headline: "Luxury Coastal Living in the Heart of Goa.",
    description:
      "Located near Goa’s pristine coastline, this premium plot offers breathtaking sea views, tropical surroundings, and seamless access to luxury resorts, beaches, and vibrant lifestyle destinations.",
    area: "18,000 Sq. Ft.",
    topography: "Elevated Coastal Terrain",
    orientation: "West Facing",
    image: "/plot-1.png",
  },
  {
    id: "02",
    name: "Palm Grove Retreat",
    headline: "A Private Escape Surrounded by Nature and Serenity.",
    description:
      "Set amidst lush coconut groves and tranquil landscapes, this exclusive Goa plot provides the perfect setting for a luxury villa, wellness retreat, or long-term investment opportunity.",
    area: "24,500 Sq. Ft.",
    topography: "Gentle Green Slope",
    orientation: "South-West Facing",
    image: "/plot-2.png",
  },
];

const PlotsSection = () => {
    return (
        <section className="bg-[#FAF9F6] py-24 px-6 lg:px-14 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    className="text-center mb-14"
                >
                    <motion.div variants={fadeUp}>
                        <SectionLabel>Land Collections</SectionLabel>
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
                         Premium Land <br />
                        <em className="text-gold-400 not-italic">Opportunities</em>
                    </motion.h2>
                </motion.div>

                {/* Alternating Editorial Grid */}
                <div className="space-y-32 mt-10">
                    {plotsData.map((plot, index) => (
                        <div
                            key={plot.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                        >
                            {/* Image Column */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-1/2 aspect-[1/1] relative rounded-sm overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={plot.image}
                                    alt={plot.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                />
                                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 border border-[#020617]/5">
                                    <span className="text-[#020617] font-serif italic text-xl">{plot.id}</span>
                                </div>
                            </motion.div>

                            {/* Content Column */}
                            <div className="w-full md:w-1/2 space-y-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-gold-500 text-4xl font-serif leading-none">{plot.name}</h3>
                                    <h4 className="text-navy-950/80 text-2xl md:text-3xl font-light tracking-tight leading-snug">
                                        {plot.headline}
                                    </h4>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-slate-600 text-lg leading-relaxed font-light border-l-2 border-gold-400 pl-6"
                                >
                                    {plot.description}
                                </motion.p>

                                {/* Technical Specs Grid */}
                                <div className="grid grid-cols-2 gap-y-8 pt-8 border-t border-slate-200">
                                    <SpecItem icon={<Maximize2 size={18} />} label="Total Area" value={plot.area} />
                                    <SpecItem icon={<Mountain size={18} />} label="Topography" value={plot.topography} />
                                    <SpecItem icon={<Compass size={18} />} label="Orientation" value={plot.orientation} />
                                    <SpecItem icon={<Map size={18} />} label="Zoning" value="Residential / Villa" />
                                </div>

                                <motion.button
                                    whileHover={{ gap: '1.5rem' }}
                                    className="group flex items-center gap-4 text-[#020617] hover:text-gold-500 hover:scale-105 font-bold uppercase tracking-[0.2em] text-[10px] mt-12 pt-4 transition-all"
                                >
                                    <Link href={"/contact"} className='flex'>Request Master Plan <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></Link>
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SpecItem = ({ icon, label, value }: { icon: any; label: any; value: any; }) => (
    <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gold-600">
            {icon}
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">{label}</span>
        </div>
        <p className="text-[#020617] text-lg font-medium">{value}</p>
    </div>
);