// app/explore-routes/properties/[id]/page.tsx
"use client";

import EnquiryForm from "@/app/components/EnquiryForm";
import LeadFormModal from "@/app/components/Modals/LeadFormModal";
import SectionLabel from "@/app/components/Ui/SectionLabel";
import { getPropertyById, getPropertyBySlug } from "@/app/lib/api/properties";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface PropertyDetail {
    id: number;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    images: string[];
    type: string;
    status: "sale" | "rent" | "sold";
    description: string;
    features: string[];
    amenities: string[];
    yearBuilt: number;
    parking: number;
    agent: {
        name: string;
        phone: string;
        email: string;
        image: string;
    };
}



export default function PropertyDetailsPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [leadFormModal, setLeadFormModal] = useState<{
        isOpen: boolean;
        project: null;
    }>({ isOpen: false, project: null });
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);


    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleDownloadClick = () => {
        setLeadFormModal({ isOpen: true, project: null });
    };

    const params = useParams();
    const slug = params.id as string;
    const { data: propertyRes, isLoading } = useQuery({
        queryKey: ["property", slug],
        queryFn: () => getPropertyBySlug(slug!),
        enabled: !!slug,
    });
    const propertyData = propertyRes?.data;
    const faqs = propertyData?.faqs || [];

    console.log(propertyData)


    return (
        <>
            <div className="min-h-screen bg-off-white">
                {/* Back Button */}
                <div className="hidden max-w-7xl mx-auto px-4">
                    <Link href="/explore-routes/properties">
                        <motion.button
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to Properties
                        </motion.button>
                    </Link>
                </div>

                {/* Image Gallery */}
                {
                    isLoading ? (<>
                        <PropertyGalleryLoader /></>) : (<>
                            <section className="w-full mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    {/* Main Image */}
                                    <div className="relative h-[70vh] overflow-hidden group">
                                        <Image
                                            src={propertyData?.images[selectedImage]}
                                            alt={propertyData?.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-navy-900/60" />

                                        {/* Status Badge */}
                                        <div className="absolute bottom-6 left-6 z-10">
                                            <span
                                                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider ${propertyData?.status === "For Sale"
                                                    ? "bg-gold-500 text-navy-900"
                                                    : propertyData?.status === "For Rent"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-500 text-white"
                                                    }`}
                                            >
                                                {propertyData?.purpose}
                                            </span>
                                        </div>

                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={() =>
                                                setSelectedImage((prev) =>
                                                    prev === 0 ? propertyData?.images.length - 1 : prev - 1
                                                )
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy-900/80 text-gold-400 p-3 rounded-full hover:bg-navy-900 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setSelectedImage((prev) =>
                                                    prev === propertyData?.images.length - 1 ? 0 : prev + 1
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy-900/80 text-gold-400 p-3 rounded-full hover:bg-navy-900 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    <div className="flex gap-4 overflow-x-auto pb-2 px-2 md:px-6">
                                        {propertyData?.images.map((image: string, index: number) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedImage(index)}
                                                className={`relative h-24 w-32 flex-shrink-0 rounded-lg bg-navy-950/30 overflow-hidden border-2 transition-all ${selectedImage === index
                                                    ? "border-gold-500 shadow-lg shadow-gold-500/30"
                                                    : "border-transparent hover:border-gold-500/50"
                                                    }`}
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`Gallery ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            </section></>)
                }

                {/* Main Content */}
                {isLoading ? (<><GenericPropertyLoader /></>) : (
                    <>
                        <section className="max-w-7xl mx-auto px-4 py-8">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Left Column - Property Details */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Header */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                    >
                                        <div className="mb-4">
                                            <div className="mb-4">
                                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900 font-display mb-2">
                                                    {propertyData?.title}
                                                </h1>
                                                <p className="text-gold-500/80 flex items-center gap-2 text-lg">
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    {propertyData?.location}
                                                </p>
                                            </div>
                                            <div className="flex justify-between flex-wrap">
                                                <div className="">
                                                    <p className="text-sm text-navy-900/70 uppercase tracking-wider mb-1">
                                                        Price
                                                    </p>
                                                    {
                                                        propertyData?.price ? (
                                                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-400 font-display">
                                                        {propertyData?.price}
                                                    </p>
                                                        ) : (
                                                            <p className="text-lg font-bold text-navy-950/70 font-display">
                                                                On Enquiry
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => handleDownloadClick()}

                                                        className=" cursor-pointer w-full bg-navy-900 text-white border-2 border-navy-900 hover:text-navy-900 hover:bg-white px-4 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg transition-all ease-in-out">
                                                        Download Brochure
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gold-500/20">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <svg
                                                        className="w-6 h-6 text-gold-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-lg md:text-xl font-bold text-navy-900">
                                                    {propertyData?.bedrooms}
                                                </p>
                                                <p className="text-sm text-gray-400">Bedrooms</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <svg
                                                        className="w-6 h-6 text-gold-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-lg md:text-xl font-bold text-navy-900">
                                                    {propertyData?.bathrooms}
                                                </p>
                                                <p className="text-sm text-gray-400">Bathrooms</p>
                                            </div>
                                            <div className="text-center col-span-2 md:col-span-1">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <svg
                                                        className="w-6 h-6 text-gold-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-lg md:text-xl font-bold text-navy-900">
                                                    {propertyData?.areaSqft}
                                                </p>
                                                <p className="text-sm text-gray-400">Total Area</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                    >
                                        <SectionLabel>About This Property</SectionLabel>
                                        <p className="text-navy-950/80 leading-relaxed mt-6">
                                            {propertyData?.description}
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                                            <div className="flex items-center gap-3 text-navy-900">
                                                <svg
                                                    className="w-5 h-5 text-gold-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                    />
                                                </svg>
                                                <span>
                                                    <strong>Type:</strong> {propertyData?.type}
                                                </span>
                                            </div>
                                            <div className="hidden flex items-center gap-3 text-gray-300">
                                                <svg
                                                    className="w-5 h-5 text-gold-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span>
                                                    <strong>Year Built:</strong> {propertyData?.yearBuilt}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>



                                    {/* Amenities */}
                                    {propertyData?.featuresAmenities?.length > 0 && (<motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                    >
                                        <SectionLabel>Property Amenities</SectionLabel>
                                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                                            {propertyData?.featuresAmenities?.map((amenity: any, index: number) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + index * 0.05 }}
                                                    className="flex items-center gap-3 text-navy-950/80"
                                                >
                                                    <div className="w-2 h-2 bg-gold-500 rounded-full" />
                                                    <span>{amenity}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>)}
                                    {/* Features */}
                                    {
                                        propertyData?.extraHighlights?.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                            >
                                                <SectionLabel>Property Highlights</SectionLabel>
                                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                                    {propertyData?.extraHighlights?.map((feature: any, index: number) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + index * 0.05 }}
                                                            className="flex items-start gap-3 text-navy-950/80"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-gold-500 mt-1 flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                            <span>{feature}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                    {
                                        propertyData?.extraHighlights?.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                            >
                                                <SectionLabel>Nearby Places</SectionLabel>
                                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                                    {propertyData?.nearby?.map((feature: any, index: number) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + index * 0.05 }}
                                                            className="flex items-start gap-3 text-navy-950/80"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-gold-500 mt-1 flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                            <span>{feature}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )
                                    }

                                    {propertyData?.googleMapUrl && (<motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                    >
                                        <SectionLabel>Location</SectionLabel>

                                        <div className="mt-6">
                                            {/* Map Container */}
                                            <div className="w-full h-[350px] rounded-xl overflow-hidden border border-gray-200">
                                                <iframe
                                                    src={propertyData.googleMapUrl}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    className="rounded-xl"
                                                ></iframe>
                                            </div>
                                        </div>
                                    </motion.div>)}

                                    {/* FAQ Accordion */}
                                    {faqs.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                        >
                                            <SectionLabel>Frequently Asked Questions</SectionLabel>
                                            <div className="mt-6 space-y-4">
                                                {faqs.map((faq:any, index:number) => (
                                                    <div
                                                        key={faq._id}
                                                        className="border border-gold-500/20 rounded-lg overflow-hidden"
                                                    >
                                                        <button
                                                            onClick={() => toggleFaq(index)}
                                                            className="w-full flex items-center cursor-pointer justify-between p-4 text-left bg-navy-950/5 hover:bg-navy-950/10 transition-colors"
                                                        >
                                                            <span className="font-semibold text-navy-950">
                                                                {faq.question}
                                                            </span>
                                                            <svg
                                                                className={`w-5 h-5 text-gold-500 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 9l-7 7-7-7"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <div
                                                            className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-40' : 'max-h-0'}`}
                                                        >
                                                            <p className="p-4 text-navy-950/80 leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Right Column - Contact Form */}
                                <div className="lg:col-span-1">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="sticky top-8 bg-white border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
                                    >
                                        <SectionLabel>Contact Agent</SectionLabel>

                                        {/* Agent Info */}
                                        <div className="mt-6 text-center">
                                            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gold-500/30">
                                                <Image
                                                    src={propertyData?.images[0]}
                                                    alt={propertyData?.title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-navy-950/80 font-display">
                                                {propertyData?.title}
                                            </h3>
                                        </div>

                                        {/* Contact Form */}
                                        <form className="hidden space-y-4 mt-6">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3 bg-white border border-gold-500/20 rounded-lg text-navy-950/80 placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className="w-full px-4 py-3 bg-white border border-gold-500/20 rounded-lg text-navy-950/80 placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    className="w-full px-4 py-3 bg-white border border-gold-500/20 rounded-lg text-navy-950/80 placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <textarea
                                                    rows={4}
                                                    placeholder="Message"
                                                    className="w-full px-4 py-3 bg-white border border-gold-500/20 rounded-lg text-navy-950/80 placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                                                />
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full px-6 py-4 bg-gold-500 text-navy-900 rounded-lg font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/30"
                                            >
                                                Request Information
                                            </motion.button>
                                        </form>

                                        <div className="mt-6">
                                            <EnquiryForm  source={`property - ${propertyData?.title}`}/>
                                        </div>

                                        {/* Direct Contact */}
                                        <div className="mt-6 pt-6 border-t border-gold-500/20 space-y-3">
                                            <a
                                                href={`tel:${propertyData?.agent?.phone}`}
                                                className="flex items-center gap-3 text-navy-950 hover:text-gold-400 transition-colors"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <span>{"+91 7687974576"}</span>
                                            </a>
                                            <a
                                                href={`mailto:${propertyData?.agent?.email}`}
                                                className="flex items-center gap-3 text-navy-950 hover:text-gold-400 transition-colors"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm">{"contact@rphreality.com"}</span>
                                            </a>
                                        </div>

                                    </motion.div>
                                </div>
                            </div>
                        </section></>
                )}
            </div>
            <LeadFormModal
                isOpen={leadFormModal.isOpen}
                onClose={() => setLeadFormModal({ isOpen: false, project: null })}
                type="download"
                downloadFileName={propertyData?.brochure}
            /></>
    );
}

const PropertyGalleryLoader = () => {
    return (
        <section className="w-full mx-auto animate-pulse">
            <div className="space-y-4">

                {/* Main Image Placeholder (70vh) */}
                <div className="relative h-[70vh] w-full bg-neutral-500 overflow-hidden rounded-b-xl border-b border-white/5">
                    {/* Subtle Inner Glow to match the theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />

                    {/* Status Badge Placeholder */}
                    <div className="absolute bottom-6 left-6 z-10">
                        <div className="h-10 w-32 bg-neutral-800 rounded-full border border-white/10" />
                    </div>

                    {/* Center Icon Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gold-500/5 border border-gold-500/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-2 border-gold-500/30 border-t-gold-500 animate-spin" />
                        </div>
                    </div>
                </div>

                {/* Thumbnail Gallery Placeholder */}
                <div className="flex gap-4 overflow-x-auto pb-2 px-2 md:px-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="h-24 w-32 flex-shrink-0 rounded-lg bg-neutral-500 border border-white/5 shadow-inner"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

const GenericPropertyLoader = () => {
    return (
        <div className="min-h-screen bg-neutral-500 text-white overflow-hidden animate-pulse">
            {/* 1. Hero Image Placeholder */}
            <div className="relative h-[50vh] w-full bg-neutral-500 border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
                <div className="absolute bottom-8 left-8">
                    {/* Badge Placeholder */}
                    <div className="h-8 w-24 bg-gold-500/20 rounded-full border border-gold-500/30" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
                {/* 2. Title & Price Block */}
                <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl shadow-2xl space-y-4">
                    <div className="h-10 w-3/4 bg-neutral-800 rounded-lg" /> {/* Title */}
                    <div className="h-6 w-1/4 bg-gold-500/20 rounded-md" />   {/* Price */}
                </div>

                {/* 3. Feature Grid (3 Columns like your Stats) */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800" /> {/* Icon circle */}
                            <div className="h-4 w-16 bg-neutral-800 rounded" />     {/* Label */}
                        </div>
                    ))}
                </div>

                {/* 4. Description Area */}
                <div className="mt-10 space-y-4 pb-20">
                    <div className="h-6 w-40 bg-neutral-800 rounded-md mb-6" /> {/* Section Title */}
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-neutral-900 rounded" />
                        <div className="h-4 w-full bg-neutral-900 rounded" />
                        <div className="h-4 w-5/6 bg-neutral-900 rounded" />
                        <div className="h-4 w-4/6 bg-neutral-900 rounded" />
                    </div>
                </div>
            </div>

            {/* 5. Sticky Bottom CTA Placeholder */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#050505]/80 backdrop-blur-lg border-t border-white/5">
                <div className="max-w-4xl mx-auto flex gap-4">
                    <div className="h-14 flex-1 bg-gold-500/20 rounded-2xl border border-gold-500/30" />
                    <div className="h-14 w-14 bg-neutral-800 rounded-2xl" />
                </div>
            </div>
        </div>
    );
};
