// app/buy/page.tsx
"use client";

import Hero from "../components/Ui/Hero";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionLabel from "../components/Ui/SectionLabel";
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye } from "lucide-react";
import { useState } from "react";

// Property type interface
interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
    tag?: string;
    featured?: boolean;
}

// Sample properties data
const properties: Property[] = [
    {
        id: 1,
        title: "Luxury Beach Villa",
        location: "Candolim, North Goa",
        price: "₹8.5 Cr",
        bedrooms: 4,
        bathrooms: 5,
        area: "3,500 sq.ft",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        tag: "Featured",
        featured: true,
    },
    {
        id: 2,
        title: "Portuguese Heritage Home",
        location: "Siolim, North Goa",
        price: "₹6.2 Cr",
        bedrooms: 3,
        bathrooms: 3,
        area: "2,800 sq.ft",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        tag: "New",
    },
    {
        id: 3,
        title: "Modern Penthouse",
        location: "Panjim, Central Goa",
        price: "₹5.8 Cr",
        bedrooms: 3,
        bathrooms: 4,
        area: "2,200 sq.ft",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        featured: true,
    },
    {
        id: 4,
        title: "Riverside Estate",
        location: "Assagao, North Goa",
        price: "₹12.5 Cr",
        bedrooms: 5,
        bathrooms: 6,
        area: "5,000 sq.ft",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        tag: "Premium",
    },
    {
        id: 5,
        title: "Garden View Apartment",
        location: "Dona Paula, South Goa",
        price: "₹3.2 Cr",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,450 sq.ft",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    },
    {
        id: 6,
        title: "Colonial Mansion",
        location: "Margao, South Goa",
        price: "₹9.8 Cr",
        bedrooms: 6,
        bathrooms: 7,
        area: "4,500 sq.ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        tag: "Exclusive",
        featured: true,
    },
];

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function BuyPage() {
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    return (
        <>
            {/* Hero Section */}
            <Hero
                title={
                    <>
                        Property for <br />
                        <span className="italic text-gold-400"> Lease</span>
                    </>
                }
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                label="Properties for lease"
            />

            {/* Main Content */}
            <main className="bg-gradient-to-b from-slate-50 to-white py-20 px-6 sm:px-12">
                <div className="max-w-[1320px] mx-auto">
                    {/* Section Header */}
                    <header className="mb-16 text-center">
                        <SectionLabel>Luxury Residences</SectionLabel>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mt-6 text-4xl lg:text-5xl font-serif text-navy-900 leading-tight"
                        >
                            Exclusive Properties in{" "}
                            <span className="italic text-gold-500">Goa</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mt-4 text-charcoal-600 max-w-2xl mx-auto font-sans"
                        >
                            Discover handpicked luxury homes in Goa's most prestigious
                            locations. Each property is carefully curated to match your
                            lifestyle and aspirations.
                        </motion.p>
                    </header>

                    {/* Property Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                isFavorite={favorites.includes(property.id)}
                                onToggleFavorite={() => toggleFavorite(property.id)}
                            />
                        ))}
                    </motion.div>

                    {/* Load More Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <button className="px-8 py-3.5 bg-navy-900 text-white text-sm font-semibold tracking-widest uppercase rounded hover:bg-navy-800 transition-all duration-300 hover:shadow-lg hover:shadow-navy-900/30">
                            Load More Properties
                        </button>
                    </motion.div>
                </div>
            </main>
        </>
    );
}

// Property Card Component
function PropertyCard({
    property,
    isFavorite,
    onToggleFavorite,
}: {
    property: Property;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}) {
    return (
        <motion.div variants={cardVariants} className="group relative">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Tag Badge */}
                {property.tag && (
                    <div className="absolute top-4 left-4 z-10">
                        <span
                            className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${property.featured
                                ? "bg-gold-400 text-navy-900"
                                : "bg-white/95 text-navy-900 backdrop-blur-sm"
                                }`}
                        >
                            {property.tag}
                        </span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onToggleFavorite}
                        className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
                    >
                        <Heart
                            size={18}
                            className={`transition-colors ${isFavorite
                                ? "fill-red-500 stroke-red-500"
                                : "stroke-navy-900"
                                }`}
                        />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
                    >
                        <Share2 size={18} className="stroke-navy-900" />
                    </motion.button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <button className="w-full bg-white text-navy-900 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2">
                            <Eye size={18} />
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Property Info */}
            <div className="mt-5 px-1">
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-serif font-bold text-navy-900">
                        {property.price}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif text-navy-900 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 text-charcoal-600">
                    <MapPin size={16} className="text-gold-500 flex-shrink-0" />
                    <span className="text-sm font-sans">{property.location}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4" />

                {/* Property Features */}
                <div className="flex items-center justify-between text-charcoal-600">
                    <div className="flex items-center gap-1.5">
                        <Bed size={18} className="text-gold-500" />
                        <span className="text-sm font-sans font-medium">
                            {property.bedrooms}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={18} className="text-gold-500" />
                        <span className="text-sm font-sans font-medium">
                            {property.bathrooms}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Square size={18} className="text-gold-500" />
                        <span className="text-sm font-sans font-medium">
                            {property.area}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}