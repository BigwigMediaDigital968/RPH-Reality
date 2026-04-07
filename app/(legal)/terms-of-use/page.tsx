"use client";

import Hero from '@/app/components/Ui/Hero';
import React from 'react'; // Adjust path based on your project

export default function TermsOfUse() {
    return (
        <main className="bg-white min-h-screen pb-24">
            {/* --- HERO SECTION --- */}
            <Hero
                title={<>Terms Of Use</>}
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                label="Legal Documentation"
            />

            {/* --- CONTENT SECTION --- */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
                <div className="prose prose-slate prose-lg max-w-none">
                    <header className="mb-12 border-b border-slate-100 pb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Terms Of Use
                        </h1>
                        <p className="text-slate-500 text-sm italic">
                            Last Updated: April 06, 2026
                        </p>
                    </header>

                    {/* Content Body */}
                    <div className="space-y-12">

                        {/* Section: Intro */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                1. Introduction
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                Welcome to our luxury real estate platform. We are committed to protecting your personal
                                data and your privacy. This policy outlines how we handle the information collected
                                through our website and services. By using our platform, you consent to the data
                                practices described in this statement.
                            </p>
                        </section>

                        {/* Section: Data Collection */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                2. Information We Collect
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                We collect information that identifies, relates to, or could reasonably be linked to you.
                                This includes:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start text-slate-600">
                                    <span className="font-bold text-slate-900">A.</span>
                                    <span><strong>Personal Identification:</strong> Name, email address, and phone number provided during property inquiries.</span>
                                </li>
                                <li className="flex gap-4 items-start text-slate-600">
                                    <span className="font-bold text-slate-900">B.</span>
                                    <span><strong>Property Preferences:</strong> Interaction data regarding the types of villas or commercial spaces you view.</span>
                                </li>
                                <li className="flex gap-4 items-start text-slate-600">
                                    <span className="font-bold text-slate-900">C.</span>
                                    <span><strong>Technical Data:</strong> IP address, browser type, and navigation patterns via cookies.</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section: Data Usage */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                3. How We Use Your Data
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Your information is used to provide a personalized real estate experience, including but not limited to:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="font-bold text-slate-900 text-sm mb-1">Service Delivery</p>
                                    <p className="text-xs text-slate-500">Arranging private tours and managing property transactions.</p>
                                </div>
                                <div className="p-5 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="font-bold text-slate-900 text-sm mb-1">Legal Compliance</p>
                                    <p className="text-xs text-slate-500">Ensuring all real estate interactions adhere to local property laws.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section: Contact */}
                        <section className="pt-10 border-t border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                4. Contact Us
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                If you have any questions about this Privacy Policy or our treatment of your information,
                                please contact our legal department:
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500">Email:</span>
                                <a href="mailto:legal@royalprimehomes.com" className="font-bold text-[#00695C] hover:underline">
                                    legal@royalprimehomes.com
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}