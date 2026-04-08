"use client";

import Hero from "../components/Ui/Hero";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionLabel from "../components/Ui/SectionLabel";
import { useState } from "react";
import PDFFlipbookModal from "../components/common/PDFFlipbookModal";
import PdfFlipbook from "../components/common/PdfFlipbook";
import PdfFlipbookModal from "../components/common/PDFFlipbookModal";
import LeadFormModal from "../components/Modals/LeadFormModal";

const projects = [
    {
        id: 1,
        title: "Heritage Palms",
        location: "Siolim, North Goa",
        category: "Portuguese Villas",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        pdfUrl: "https://hwb.gov.wales/api/storage/3f708892-2cfe-4b78-bed2-2ec90ce5fc52/Section1-IntroducingTourism.pdf"
    },
    {
        id: 2,
        title: "Azure Bay",
        location: "Dona Paula",
        category: "Luxury Apartments",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        pdfUrl: "https://hwb.gov.wales/api/storage/3f708892-2cfe-4b78-bed2-2ec90ce5fc52/Section1-IntroducingTourism.pdf"

    },
    {
        id: 3,
        title: "The Banyan Grove",
        location: "Assagao",
        category: "Boutique Estates",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        pdfUrl: "https://hwb.gov.wales/api/storage/3f708892-2cfe-4b78-bed2-2ec90ce5fc52/Section1-IntroducingTourism.pdf"

    },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
    const [leadFormModal, setLeadFormModal] = useState<{
        isOpen: boolean;
        project: typeof projects[0] | null;
    }>({ isOpen: false, project: null });

    const [pdfModal, setPdfModal] = useState<{
        isOpen: boolean;
        project: typeof projects[0] | null;
    }>({ isOpen: false, project: null });

    // Handler for opening lead form
    const handleDownloadClick = (project: typeof projects[0]) => {
        setLeadFormModal({ isOpen: true, project });
    };

    // Handler for opening PDF preview
    const handlePreviewClick = (project: typeof projects[0]) => {
        setPdfModal({ isOpen: true, project });
    };

    // Handler for lead form submission
    const handleLeadSubmit = (data: any) => {
        console.log("Lead data submitted:", data);
        // Here you can send data to your backend/CRM
        // Then trigger actual PDF download
        if (leadFormModal.project) {
            const link = document.createElement("a");
            //link.href = leadFormModal.project.pdfUrl;
            link.download = `${leadFormModal.project.title}-Brochure.pdf`;
            link.click();
        }
    };

    return (
        <>
            <Hero
                title={
                    <>
                        Projects
                    </>
                }
                image="https://s7ap1.scene7.com/is/image/incredibleindia/vagator-beach-goa-city-1-hero?qlt=82&ts=1742158909874"
                label="Our Projects"
            />

            <main className=" bg-slate-50 py-20 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <header className="mb-16 text-center lg:text-left">
                        <SectionLabel>Exclusive Projects</SectionLabel>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mt-4 text-4xl lg:text-5xl font-serif text-slate-900 leading-tight"
                        >
                            Featured <span className="italic text-gold-500">Projects</span>
                        </motion.h1>
                    </header>

                    {/* Project Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => (
                            <>
                                <motion.div variants={cardVariants} className="group relative">
                                    {/* Title/Label area above the image (as per your reference) */}
                                    <div className="mb-5 px-1">
                                        <h3 className="text-xl font-serif text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">
                                            {project.location} — {project.category}
                                        </p>
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200 shadow-xl shadow-slate-200/50">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />

                                        {/* Modern Aesthetic Hover Overlay */}
                                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex flex-col justify-end p-8">

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                <button
                                                    onClick={() => handleDownloadClick(project)}

                                                    className="cursor-pointer w-full bg-white text-blue-900 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
                                                    Download Brochure
                                                </button>
                                                <button
                                                    onClick={() => handlePreviewClick(project)}

                                                    className="cursor-pointer w-full bg-transparent border border-white/50 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white/10 backdrop-blur-md transition-all">
                                                    Preview Project
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        ))}
                    </motion.div>
                </div>
            </main>

            {pdfModal.isOpen && (
                <PdfFlipbookModal
                    pdfUrl={""}
                    onClose={() => setPdfModal({ isOpen: false, project: null })}
                />
            )}

            <LeadFormModal
                isOpen={leadFormModal.isOpen}
                onClose={() => setLeadFormModal({ isOpen: false, project: null })}
                type="download"
                projectTitle={leadFormModal.project?.title}
                projectImage={leadFormModal.project?.image}
                downloadFileName={leadFormModal.project?.pdfUrl}
            />

        </>
    )
}