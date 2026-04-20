// app/buy/page.tsx
"use client";

import Hero from "../components/Ui/Hero";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionLabel from "../components/Ui/SectionLabel";
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye, Home } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../lib/api/properties";
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
    images: string;
    tag?: string;
    featured?: boolean;
}



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
        queryKey: ["properties", 'sale'],
        queryFn: () => getProperties({
            purpose: 'sale'
        }),
    });

    const properties = propertiesData?.data;

    console.log(properties)

    return (
        <>
            {/* Hero Section */}
            <Hero
                title={
                    <>
                        Buy Property
                    </>
                }
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                label="Properties for Sale"
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
                            {properties && properties.length > 0 ? (
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
                            ) : (
                                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex justify-center mb-6">
                                        <div className="p-6 bg-slate-50 rounded-full">
                                            <Home className="h-12 w-12 text-slate-300" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-serif text-navy-900 mb-3">No properties listed yet</h3>
                                    <p className="text-charcoal-600 font-sans max-w-md mx-auto leading-relaxed">
                                        We're currently updating our portfolio with exclusive new listings for sale. 
                                        Please check back soon or contact us for personalized assistance.
                                    </p>
                                </div>
                            )}
                        </>)}


                    {/* Load More Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center hidden"
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
