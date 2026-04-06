"use client";

import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; // Using Lucide icons for a modern look
import PdfFlipbook from './PdfFlipbook';

export default function PdfFlipbookModal({ pdfUrl, onClose }: { pdfUrl: string, onClose: () => void }) {
    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const bookRef = useRef<any>(null);


    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-900/90 backdrop-blur-md p-4">

            {/* Close Button (Top Right) */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
            >
                <X size={28} />
            </button>

            <div className="relative w-full max-w-5xl flex items-center justify-center">

                {/* Flipbook Container */}
                <div className="shadow-2xl rounded-sm overflow-hidden">
                    <PdfFlipbook pdfUrl="/brochures/Report_July.pdf" />

                </div>

            </div>
        </div>
    );
}