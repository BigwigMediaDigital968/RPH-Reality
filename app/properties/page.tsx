// app/properties/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../components/Ui/SectionLabel";
import Hero from "../components/Ui/Hero";
import { AreaChartIcon, BathIcon, BedIcon, Eye } from "lucide-react";
import Link from "next/link";
import { getProperties } from "../lib/api/properties";
import { useQuery } from "@tanstack/react-query";

interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
    type: string;
    purpose: "sale" | "rent" | "sold" | "sale";
}


const filters = ["All", "Penthouse", "Villa", "Loft", "Beachfront", "Townhouse", "Cabin"];

export default function PropertiesPage() {
    const [selectedFilter, setSelectedFilter] = useState("");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const { data: propertiesData, isLoading, error } = useQuery({
        queryKey: ["properties", filters],
        queryFn: () => getProperties({}),
    });
    console.log("filter", propertiesData)

    const filteredProperties =
        selectedFilter === "All" || selectedFilter === ""
            ? propertiesData?.data
            : propertiesData?.data?.filter((p: any) => p.type === selectedFilter);

    console.log(filteredProperties)
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <Hero
                title={
                    <>
                        Explore Our
                        <br />
                        <span className="text-gold-400">Exclusive Properties</span>
                    </>
                }
                image="https://s3.india.com/wp-content/uploads/2025/05/gooa-ft.jpg"
                label="Premium Collection"
            />

            {/* Filter Section */}
            <section className="py-8 md:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-6 md:mb-12"
                    >
                        <SectionLabel>Filter By Type</SectionLabel>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16"
                    >
                        {filters.map((filter, index) => (
                            <motion.button
                                key={filter}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-3 py-2 md:px-6 md:py-3 text-sm sm:text-base border rounded-full font-semibold transition-all duration-300 ${selectedFilter === filter
                                    ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30"
                                    : "bg-white text-navy-900 border-navy-900 hover:bg-navy-700 hover:text-white border"
                                    }`}
                            >
                                {filter}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Properties Grid */}
                    {isLoading ? (<>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
                                    <div className="h-48 bg-slate-200 w-full"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <div className="h-4 bg-slate-200 rounded w-10"></div>
                                            <div className="h-4 bg-slate-200 rounded w-10"></div>
                                            <div className="h-4 bg-slate-200 rounded w-12"></div>
                                        </div>
                                        <div className="mt-4 h-10 bg-slate-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>) : (<>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProperties?.map((property, index) => (
                                <motion.div
                                    key={property._id}
                                    layout
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onHoverStart={() => setHoveredCard(index)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    className="group relative"
                                >
                                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-100 border border-slate-100 hover:border-gold-300 hover:shadow-gold-500/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <motion.div
                                                animate={{
                                                    scale: hoveredCard === index ? 1.05 : 1, // Slower scale for light theme
                                                }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                                className="w-full h-full"
                                            >
                                                <Image
                                                    src={property?.images[0]}
                                                    alt={property.title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </motion.div>

                                            {/* Overlay Gradient: Shifted from dark to light/transparent */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 transition-opacity duration-500" />

                                            {/* Status Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                className="absolute top-4 left-4 z-10"
                                            >
                                                <span
                                                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider ${property?.purpose === "rent"
                                                        ? "bg-blue-600 text-white" // Rich blue for Rent (Goan aesthetic)
                                                        : "bg-slate-500 text-white"
                                                        }`}
                                                >
                                                    {property?.purpose}
                                                </span>
                                            </motion.div>

                                            {/* Type Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                className="absolute top-4 right-4 z-10"
                                            >
                                                <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/90 text-navy-900 border border-slate-100 backdrop-blur-sm shadow-sm">
                                                    {property.type}
                                                </span>
                                            </motion.div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 py-4 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-display group-hover:text-gold-600 transition-colors duration-300">
                                                    {property.title}
                                                </h3>
                                                <p className="text-slate-600 flex items-center gap-2 text-sm">
                                                    <svg
                                                        className="w-4 h-4 text-gold-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    {property.location}
                                                </p>
                                            </div>

                                            {/* Features: Changed icons to gold, text to slate-600 */}
                                            <div className="flex items-center gap-6 text-sm text-slate-600 bg-slate-50 p-3 py-1 rounded-lg border border-slate-100">
                                                <FeatureItem icon={BedIcon} label={`${property.bedrooms} Beds`} />
                                                <FeatureItem icon={BathIcon} label={`${property.bathrooms} Baths`} />
                                                <FeatureItem icon={AreaChartIcon} label={property?.areaSqft} />
                                            </div>

                                            {/* Price and CTA */}
                                            <div className=" items-center justify-between pt-3 border-t border-slate-100">
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                                                        Investment
                                                    </p>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 font-display">
                                                        {property.price}
                                                    </p>
                                                </div>

                                                <Link
                                                    href={`/properties/${property?.slug}`}
                                                    className="mt-2 w-full bg-navy-900 text-white py-3 border border-navy-900 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2">
                                                    <Eye size={18} />
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Hover Effect Border: Changed from gold glow to subtle lift and soft gold shadow */}
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl pointer-events-none"
                                            animate={{
                                                boxShadow:
                                                    hoveredCard === index
                                                        ? "0 15px 40px rgba(212, 175, 55, 0.15)" // Soft gold drop shadow
                                                        : "0 0 0px rgba(212, 175, 55, 0)",
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div></>)}

                    {/* No Results */}
                    {filteredProperties?.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-2xl text-gray-400">
                                No properties found in this category
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

function FeatureItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="flex items-center gap-2">
            {/* Note: We capitalize 'Icon' to use it as a component */}
            <Icon className="w-5 h-5 text-gold-600" />
            <span className="font-medium">{label}</span>
        </div>
    );
}