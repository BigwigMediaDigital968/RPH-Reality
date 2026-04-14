import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/app/lib/api/properties";
import Link from "next/link";


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

export default function PropertyCard({
    property,
}: {
    property: Property;
}) {
    return (
        <motion.div variants={cardVariants} className="group relative">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                <Image
                    src={property?.images[0]}
                    alt={property?.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Tag Badge */}
                {property?.purpose && (
                    <div className="absolute top-4 left-4 z-10">
                        <span
                            className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${property?.purpose
                                ? "bg-gold-400 text-navy-900"
                                : "bg-white/95 text-navy-900 backdrop-blur-sm"
                                }`}
                        >
                            {property?.purpose}
                        </span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
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
                        <Link href={`/properties/${property?.slug}`} className="w-full bg-white text-navy-900 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2">
                            <Eye size={18} />
                            View Details
                        </Link>
                    </div>
                </div>
            </div>

            {/* Property Info */}
            <div className="mt-5 px-1">
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-serif font-bold text-navy-900">
                        {property?.price}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif text-navy-900 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                    {property?.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 text-charcoal-600">
                    <MapPin size={16} className="text-gold-500 flex-shrink-0" />
                    <span className="text-sm font-sans">{property?.location}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4" />

                {/* Property Features */}
                <div className="flex items-center justify-between text-charcoal-600">
                    <div className="flex items-center gap-1.5">
                        <Bed size={18} className="text-gold-500" />
                        <span className="text-sm font-sans font-medium">
                            {property?.bedrooms}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={18} className="text-gold-500" />
                        <span className="text-sm font-sans font-medium">
                            {property?.bathrooms}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Square size={18} className="text-gold-500" />
                        <span className="text-sm font-sans font-medium">
                            {property?.areaSqft}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


export const PropertyCardLoader = () => {
    return (
        <div className="group relative w-full animate-pulse">
            {/* 1. Image Container Placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200">
                {/* Subtle inner shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

                {/* Tag Badge Placeholder */}
                <div className="absolute top-4 left-4">
                    <div className="h-6 w-20 bg-slate-300 rounded-full" />
                </div>

                {/* Action Button Placeholder */}
                <div className="absolute top-4 right-4">
                    <div className="h-9 w-9 bg-slate-300 rounded-full" />
                </div>
            </div>

            {/* 2. Property Info Placeholder */}
            <div className="mt-5 px-1 space-y-4">
                {/* Price & Title Area */}
                <div className="space-y-3">
                    <div className="h-8 w-1/3 bg-slate-200 rounded-md" /> {/* Price */}
                    <div className="h-7 w-full bg-slate-200 rounded-md" />  {/* Title */}
                </div>

                {/* Location Placeholder */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gold-200 rounded-full" /> {/* Icon */}
                    <div className="h-4 w-1/2 bg-slate-200 rounded" />   {/* Text */}
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 w-full" />

                {/* Features Row Placeholder */}
                <div className="flex items-center justify-between">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-gold-100 rounded" />
                            <div className="h-4 w-8 bg-slate-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

