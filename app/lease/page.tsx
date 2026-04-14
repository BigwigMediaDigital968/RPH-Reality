// app/buy/page.tsx
"use client";

import Hero from "../components/Ui/Hero";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionLabel from "../components/Ui/SectionLabel";
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye } from "lucide-react";
import { useState } from "react";
import { getProperties } from "../lib/api/properties";
import { useQuery } from "@tanstack/react-query";
import PropertyCard, { PropertyCardLoader } from "../components/common/PropertyCard";

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

    const { data: propertiesData, isLoading, error } = useQuery({
        queryKey: ["properties", 'buy'],
        queryFn: () => getProperties({
            purpose: 'lease'
        }),
    });

    const properties = propertiesData?.data;

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
                    {isLoading ? (<>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <PropertyCardLoader key={i} />
                            ))}
                        </div></>) : (<>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {properties?.map((property, index) => (
                                    <PropertyCard
                                        key={property?._id}
                                        property={property}
                                    />
                                ))}
                            </motion.div>
                        </>)}

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