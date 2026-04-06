"use client";

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- DUMMY IMAGES ---
// Using high-quality real estate placeholders to keep the "Royal" feel
const DUMMY_PAGES = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", // Cover
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687940-c52fb0729a5c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80", // Back Cover
];

export default function PdfFlipbook() {
    const bookRef = useRef<any>(null);

    // --- NAVIGATION HANDLERS ---
    const handlePrev = () => {
        bookRef.current?.pageFlip().flipPrev();
    };

    const handleNext = () => {
        bookRef.current?.pageFlip().flipNext();
    };

    return (
        <div className="relative group max-w-6xl mx-auto py-10">

            {/* --- WRAPPER FOR CONTROLS AND BOOK --- */}
            <div className="flex items-center justify-center gap-4">

                {/* PREVIOUS BUTTON */}
                <button
                    onClick={handlePrev}
                    className="cursor-pointer p-3 rounded-full bg-white shadow-lg text-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10 hidden md:block border border-slate-100"
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex justify-center items-center overflow-hidden">
                    {/* @ts-ignore */}
                    <HTMLFlipBook
                        width={550}
                        height={733}
                        size="stretch"
                        minWidth={315}
                        maxWidth={1000}
                        minHeight={420}
                        maxHeight={1350}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        className="shadow-2xl"
                        ref={bookRef}
                    >
                        {DUMMY_PAGES.map((image, index) => (
                            <div key={index} className="bg-white">
                                <img
                                    src={image}
                                    alt={`Page ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>

                {/* NEXT BUTTON */}
                <button
                    onClick={handleNext}
                    className="cursor-pointer p-3 rounded-full bg-white shadow-lg text-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10 hidden md:block border border-slate-100"
                    aria-label="Next Page"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* MOBILE CONTROLS (Floating at the bottom) */}
            <div className="flex justify-center gap-6 mt-8 md:hidden">
                <button onClick={handlePrev} className="cursor-pointer bg-white p-4 rounded-full shadow-md">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="cursor-pointer bg-white p-4 rounded-full shadow-md">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}