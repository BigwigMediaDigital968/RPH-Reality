"use client";

import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjs from 'pdfjs-dist';
// Using Lucide icons for a premium look, or you can use your own SVG
import { ChevronLeft, ChevronRight } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfFlipbook({ pdfUrl }: { pdfUrl: string }) {
    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    // Properly type the ref for pageflip
    const bookRef = useRef<any>(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const loadingTask = pdfjs.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;
                const totalPages = pdf.numPages;
                const images: string[] = [];

                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 2 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (context) {
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        await page.render({
                            canvasContext: context,
                            viewport: viewport,
                            canvas: canvas,
                        }).promise;
                        images.push(canvas.toDataURL('image/webp', 0.8));
                    }
                }
                setPages(images);
                setLoading(false);
            } catch (error) {
                console.error("Error rendering PDF:", error);
            }
        };
        loadPdf();
    }, [pdfUrl]);

    // --- NAVIGATION HANDLERS ---
    const handlePrev = () => {
        bookRef.current?.pageFlip().flipPrev();
    };

    const handleNext = () => {
        bookRef.current?.pageFlip().flipNext();
    };

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-500 font-serif">Preparing Royal Brochure...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group max-w-6xl mx-auto py-10">

            {/* --- WRAPPER FOR CONTROLS AND BOOK --- */}
            <div className="flex items-center justify-center gap-4">

                {/* PREVIOUS BUTTON */}
                <button
                    onClick={handlePrev}
                    className="cursor-pointer p-3 rounded-full bg-white shadow-lg text-navy-900 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10 hidden md:block border border-slate-100"
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
                        {pages.map((image, index) => (
                            <div key={index} className="bg-white">
                                <img
                                    src={image}
                                    alt={`Page ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>

                {/* NEXT BUTTON */}
                <button
                    onClick={handleNext}
                    className="cursor-pointer p-3 rounded-full bg-white shadow-lg text-navy-900 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10 hidden md:block border border-slate-100"
                    aria-label="Next Page"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* MOBILE CONTROLS (Floating at the bottom) */}
            <div className="flex justify-center gap-6 mt-8 md:hidden">
                <button onClick={handlePrev} className="cursor-pointer bg-white p-4 rounded-full shadow-md"><ChevronLeft /></button>
                <button onClick={handleNext} className="cursor-pointer bg-white p-4 rounded-full shadow-md"><ChevronRight /></button>
            </div>
        </div>
    );
}