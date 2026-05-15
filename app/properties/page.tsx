// app/properties/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../components/Ui/SectionLabel";
import Hero from "../components/Ui/Hero";
import { AreaChartIcon, BathIcon, BedIcon, Eye, Map } from "lucide-react";
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


const filters = ["All", "Penthouse", "Villa", "Loft", "Beachfront", "Townhouse", "Apartment", "Cabin", "Plots"];

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

    const redirectionProperty = {
        _id: "plots-link",
        title: "Explore Full Land Portfolio",
        location: "Global Exclusive Estates",
        type: "Plots",
        purpose: "invest",
        images: ["/plots-card.png"],
        slug: "all-plots",
        areaSqft: "Multiple Dimensions Available"
    };

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
                image="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1074&auto=format&fit=crop"
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-90 transition-opacity duration-500" />

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
                                        <div className="p-6 py-4 space-y-2">
                                            <div>
                                                <h3 className="text-xl font-semibold text-slate-900 font-display line-clamp-2 group-hover:text-gold-600 transition-colors duration-300">
                                                    {property.title}
                                                </h3>
                                                {property.price && (<div>
                                                    <p className="text-base sm:text-lg md:text-xl font-bold text-gold-600 font-display">
                                                        Starts from {property.price}
                                                    </p>
                                                </div>)}
                                                <p className="text-slate-600 flex items-center gap-2 text-sm mt-2">
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
                                            <div className=" text-sm text-slate-600 bg-slate-50 p-3 py-1 rounded-lg border border-slate-100">
                                                <div className="flex  gap-6 ">
                                                    <FeatureItem icon={BedIcon} label={`${property.bedrooms} Beds`} />
                                                    <FeatureItem icon={BathIcon} label={`${property.bathrooms} Baths`} />
                                                </div>
                                                <div className="w-full mt-2">
                                                    <FeatureItem icon={AreaChartIcon} label={property?.areaSqft} />
                                                </div>
                                            </div>

                                            {/* Price and CTA */}
                                            <div className=" items-center justify-between pt-3 border-t border-slate-100">


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
                            {
                                (selectedFilter === "All" ||
                                    selectedFilter === "" ||
                                    selectedFilter === "Plots") && (
                                    <>
                                        <motion.div
                                            key={redirectionProperty._id}
                                            layout
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            onHoverStart={() => setHoveredCard(198)}
                                            onHoverEnd={() => setHoveredCard(null)}
                                            className="group relative max-w-sm w-full"
                                        >
                                            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-100 border border-slate-100 hover:border-gold-300 hover:scale-105 transition-all duration-500 group">
                                                {/* Image Container */}
                                                <div className="relative h-64 overflow-hidden">
                                                    <motion.div
                                                        animate={{
                                                            scale: hoveredCard === 198 ? 1.05 : 1,
                                                        }}
                                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                                        className="w-full h-full"
                                                    >
                                                        <img
                                                            src={redirectionProperty.images[0]}
                                                            alt={redirectionProperty.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </motion.div>

                                                    {/* Overlay Gradient */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-90 transition-opacity duration-500" />

                                                    {/* Status Badge */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        className="absolute top-4 left-4 z-10"
                                                    >
                                                        <span className="hidden px-4 py-2 rounded-full text-xs font-bold tracking-wider bg-gold-600 text-white uppercase">
                                                            {redirectionProperty.purpose}
                                                        </span>
                                                    </motion.div>

                                                    {/* Type Badge */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        className="absolute top-4 right-4 z-10"
                                                    >
                                                        <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/90 text-[#020617] border border-slate-100 backdrop-blur-sm shadow-sm">
                                                            {redirectionProperty.type}
                                                        </span>
                                                    </motion.div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 py-4 space-y-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-slate-900 font-serif line-clamp-2 group-hover:text-gold-600 transition-colors duration-300">
                                                            {redirectionProperty.title}
                                                        </h3>
                                                        <p className="text-slate-600 flex items-center gap-2 text-sm mt-2">
                                                            <Map size={14} className="text-gold-600" />
                                                            {redirectionProperty.location}
                                                        </p>
                                                    </div>

                                                    {/* Area Feature (Plot Specific) */}
                                                    <div className="text-sm text-slate-600 bg-slate-50 p-3 py-2 rounded-lg border border-slate-100 mt-4">
                                                        <FeatureItem icon={AreaChartIcon} label={redirectionProperty.areaSqft} />
                                                    </div>

                                                    {/* CTA */}

                                                    <div className=" items-center justify-between pt-3 border-t border-slate-100">


                                                        <Link
                                                            href={`/plots`}
                                                            className="mt-2 w-full bg-navy-900 text-white py-3 border border-navy-900 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2">
                                                            <Eye size={18} />
                                                            View All Plots
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Hover Effect Border */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                                    animate={{
                                                        boxShadow:
                                                            hoveredCard === 198
                                                                ? "0 15px 40px rgba(212, 175, 55, 0.15)"
                                                                : "0 0 0px rgba(212, 175, 55, 0)",
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </div>
                                        </motion.div></>
                                )
                            }
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