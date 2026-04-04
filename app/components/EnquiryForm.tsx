"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface EnquiryFormProps {
  variant?: "default" | "minimal";
  btnText?: string;
}

export default function EnquiryForm({ variant = "default", btnText = "Submit" }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    purpose: "",
    note: "",
  });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-4">
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#D4A435"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-navy-900 text-2xl font-semibold mb-2">
          Thank You!
        </h3>
        <p className="font-sans text-charcoal-500 text-sm">
          We'll be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="+971 50 000 0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="Your email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            City
          </label>
          <input
            type="text"
            placeholder="Your city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="w-full lg:col-span-2">
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Purpose
          </label>
          <select
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200 bg-white"
          >
            <option value="">Select purpose</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
            <option value="invest">Invest</option>
          </select>
        </div>

        {/* Note */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Note
          </label>
          <textarea
            placeholder="Write your requirement..."
            rows={4}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full px-4 py-3.5 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200 resize-none"
          />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => {
          if (form.name && form.phone) setSubmitted(true);
        }}
        className="cursor-pointer w-full py-4 bg-navy-900 text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-lg hover:bg-navy-800 transition-colors duration-200 mt-2"
      >
        {btnText}
      </button>

      <p className="text-center text-xs font-sans text-charcoal-400">
        By submitting, you agree to our Privacy Policy.
      </p>
    </div>
  );
}
