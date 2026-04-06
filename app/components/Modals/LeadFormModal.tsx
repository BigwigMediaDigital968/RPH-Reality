// components/Modals/PremiumLeadFormModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Phone, Mail, User, MapPin, FileText, Home } from "lucide-react";
import { useState, FormEvent } from "react";
import Image from "next/image";

export interface LeadFormData {
    name: string;
    phone: string;
    email: string;
    city: string;
    purpose: string;
    propertyType: string;
    note: string;
}

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: LeadFormData) => void;
    type?: "general" | "download";
    projectTitle?: string;
    projectImage?: string;
    downloadFileName?: string;
}

export default function LeadFormModal({
    isOpen,
    onClose,
    onSubmit,
    type = "general",
    projectTitle,
    projectImage,
    downloadFileName,
}: LeadFormModalProps) {
    const [formData, setFormData] = useState<LeadFormData>({
        name: "",
        phone: "",
        email: "",
        city: "",
        purpose: "",
        propertyType: "",
        note: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.phone || !formData.email) {
            alert("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (onSubmit) {
            onSubmit(formData);
        }

        setIsSubmitting(false);
        setSubmitted(true);

        // For download type, trigger download after submission
        if (type === "download" && downloadFileName) {
            setTimeout(() => {
                // Trigger download logic here
                console.log("Downloading:", downloadFileName);
                // Example: window.open(downloadFileName, '_blank');
            }, 1000);
        }

        // Reset and close after 2 seconds
        setTimeout(() => {
            handleClose();
        }, 6000);
    };

    const handleClose = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            city: "",
            purpose: "",
            propertyType: "",
            note: "",
        });
        setSubmitted(false);
        onClose();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Success state
    if (submitted) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999"
                        />
                        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-12 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center mx-auto mb-6"
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>
                                </motion.div>
                                <h3 className="font-serif text-navy-900 text-3xl font-bold mb-3">
                                    {type === "download" ? "Success!" : "Thank You!"}
                                </h3>
                                <p className="font-sans text-charcoal-600 text-sm leading-relaxed">
                                    {type === "download"
                                        ? "Your brochure download will begin shortly. Our team will also contact you within 24 hours."
                                        : "We've received your enquiry. Our team will get in touch with you within 24 hours."}
                                </p>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-9999"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="grid lg:grid-cols-[45%_55%] min-h-[500px] max-h-[80vh]">
                                {/* Left Side - Image/Branding */}
                                <div className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-0 overflow-hidden">
                                    {/* Decorative elements */}
                                    <Image
                                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                        alt="Luxury Property"
                                        fill
                                        unoptimized
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Right Side - Form */}
                                <div className="relative p-4 lg:p-5 overflow-y-auto max-h-[90vh] lg:max-h-none">
                                    {/* Close Button */}
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 text-charcoal-400 hover:text-navy-900 transition-colors p-2 hover:bg-slate-100 rounded-full z-10"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="mb-6">
                                        <h3 className="font-serif text-navy-900 text-2xl lg:text-3xl font-bold mb-2">
                                            {type === "download" ? "Get Brochure" : "Enquire Now"}
                                        </h3>
                                        <p className="text-charcoal-600 text-sm font-sans">
                                            Fill in your details below
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-2">
                                        {/* Name & Phone */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-2">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <User
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400"
                                                        size={18}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        placeholder="John Doe"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full pl-8 pr-2 py-2 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-slate-200 rounded-lg outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-2">
                                                    Phone Number *
                                                </label>
                                                <div className="relative">
                                                    <Phone
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400"
                                                        size={18}
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        placeholder="+91 98765 43210"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full pl-8 pr-2 py-2 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-slate-200 rounded-lg outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email & City */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-2">
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <Mail
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400"
                                                        size={18}
                                                    />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="john@example.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full pl-8 pr-2 py-2 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-slate-200 rounded-lg outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-2">
                                                    City
                                                </label>
                                                <div className="relative">
                                                    <MapPin
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400"
                                                        size={18}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        placeholder="Your city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        className="w-full pl-8 pr-2 py-2 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-slate-200 rounded-lg outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Purpose & Property Type */}
                                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-2">
                                                    Purpose
                                                </label>
                                                <select
                                                    name="purpose"
                                                    value={formData.purpose}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 text-sm font-sans text-navy-900 border border-slate-200 rounded-lg outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all bg-white"
                                                >
                                                    <option value="">Select purpose</option>
                                                    <option value="buy">Buy</option>
                                                    <option value="sell">Sell</option>
                                                    <option value="rent">Rent</option>
                                                    <option value="invest">Invest</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Note */}
                                        <div>
                                            <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-2">
                                                Additional Requirements
                                            </label>
                                            <div className="relative">
                                                <FileText
                                                    className="absolute left-3 top-3 text-charcoal-400"
                                                    size={16}
                                                />
                                                <textarea
                                                    name="note"
                                                    placeholder="Any specific requirements..."
                                                    rows={3}
                                                    value={formData.note}
                                                    onChange={handleChange}
                                                    className="w-full pl-8 pr-2 py-2 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-slate-200 rounded-lg outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="cursor-pointer w-full bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-gold-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg
                                                        className="animate-spin h-5 w-5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    {type === "download" && <Download size={18} />}
                                                    {type === "download" ? "Get Brochure" : "Submit Enquiry"}
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-xs font-sans text-charcoal-400 mt-4">
                                            By submitting, you agree to our{" "}
                                            <span className="text-gold-600 hover:underline cursor-pointer">
                                                Privacy Policy
                                            </span>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}