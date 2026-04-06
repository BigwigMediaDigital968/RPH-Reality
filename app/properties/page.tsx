// app/properties/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SectionLabel from "../components/Ui/SectionLabel";
import Hero from "../components/Ui/Hero";
import { AreaChartIcon, BathIcon, BedIcon, Eye } from "lucide-react";
import Link from "next/link";

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
    status: "For Sale" | "For Rent" | "Sold";
}

const properties: Property[] = [
    {
        id: 1,
        title: "Luxury Penthouse Suite",
        location: "Manhattan, New York",
        price: "$4,500,000",
        bedrooms: 4,
        bathrooms: 3,
        area: "3,200 sq ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        type: "Penthouse",
        status: "For Sale",
    },
    {
        id: 2,
        title: "Modern Villa Estate",
        location: "Beverly Hills, CA",
        price: "$8,900,000",
        bedrooms: 6,
        bathrooms: 5,
        area: "6,500 sq ft",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        type: "Villa",
        status: "For Sale",
    },
    {
        id: 3,
        title: "Contemporary Loft",
        location: "Brooklyn, New York",
        price: "$2,100,000",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,800 sq ft",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        type: "Loft",
        status: "For Rent",
    },
    {
        id: 4,
        title: "Beachfront Paradise",
        location: "Malibu, CA",
        price: "$12,500,000",
        bedrooms: 5,
        bathrooms: 4,
        area: "5,000 sq ft",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        type: "Beachfront",
        status: "For Sale",
    },
    {
        id: 5,
        title: "Urban Townhouse",
        location: "Chicago, IL",
        price: "$1,850,000",
        bedrooms: 3,
        bathrooms: 2,
        area: "2,400 sq ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        type: "Townhouse",
        status: "For Sale",
    },
    {
        id: 6,
        title: "Mountain Retreat",
        location: "Aspen, CO",
        price: "$6,750,000",
        bedrooms: 5,
        bathrooms: 4,
        area: "4,800 sq ft",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        type: "Cabin",
        status: "For Sale",
    },
];

const filters = ["All", "Penthouse", "Villa", "Loft", "Beachfront", "Townhouse", "Cabin"];

export default function PropertiesPage() {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const filteredProperties =
        selectedFilter === "All"
            ? properties
            : properties.filter((p) => p.type === selectedFilter);

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
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <SectionLabel>Filter By Type</SectionLabel>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-16"
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
                                className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 ${selectedFilter === filter
                                    ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30"
                                    : "bg-white text-navy-900 border-navy-900 hover:bg-navy-700 hover:text-white border"
                                    }`}
                            >
                                {filter}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Properties Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onHoverStart={() => setHoveredCard(property.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="group relative"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-100 border border-slate-100 hover:border-gold-300 hover:shadow-gold-500/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <motion.div
                                            animate={{
                                                scale: hoveredCard === property.id ? 1.05 : 1, // Slower scale for light theme
                                            }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className="w-full h-full"
                                        >
                                            <Image
                                                src={property.image}
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
                                                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider ${property.status === "For Sale"
                                                    ? "bg-gold-500 text-white" // Gold for Sale
                                                    : property.status === "For Rent"
                                                        ? "bg-blue-600 text-white" // Rich blue for Rent (Goan aesthetic)
                                                        : "bg-slate-500 text-white"
                                                    }`}
                                            >
                                                {property.status}
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
                                            <FeatureItem icon={AreaChartIcon} label={property.area} />
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
                                                href={"/product-details"}
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
                                                hoveredCard === property.id
                                                    ? "0 15px 40px rgba(212, 175, 55, 0.15)" // Soft gold drop shadow
                                                    : "0 0 0px rgba(212, 175, 55, 0)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* No Results */}
                    {filteredProperties.length === 0 && (
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