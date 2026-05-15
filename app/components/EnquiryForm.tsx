"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createLead } from "../lib/api/leads";
import { PURPOSE_OPTIONS } from "../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface EnquiryFormProps {
  variant?: "default" | "minimal";
  btnText?: string;
  purpose?: string | null;
  source?: string | null;
}

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z.string().regex(/^\+?[0-9\s-]{7,15}$/, "Invalid Number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  purpose: z.string().min(1, "Please select a purpose"),
  note: z.string().max(500, "Note is too long").optional(),
  source: z.string().optional(), // ✅ ADD THIS
});

// Extract Type from Schema
type LeadFormValues = z.infer<typeof leadSchema>;

export default function EnquiryForm({
  variant = "default",
  btnText = "Submit",
  purpose,
  source,
}: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  console.log("purpose", purpose);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched", // Validates as user interacts
    defaultValues: {
      purpose: purpose || "buy",
      source: source || "unknown", // ✅ ADD THIS
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      //console.log(data);
      const payload = {
        ...data,
        source: source || "unknown",
      };
      //console.log(data, payload);
      const result = await createLead(payload);

      if (result.success) {
        setSubmitted(true);

        reset();

        console.log("Lead created:", result.data);
        //alert(result.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Submission failed:", errorMessage);
      //alert(`Error: ${errorMessage}`);
    }
  };

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Name */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name")}
            className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-sm font-sans text-navy-900 placeholder-charcoal-400 border rounded-lg outline-none transition-all duration-200 ${
              errors.name
                ? "border-red-500 focus:ring-red-500/20"
                : "border-border focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8"
            }`}
          />
          {errors.name && (
            <p className="text-[10px] text-red-500 mt-1 font-bold ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="+91 9654854589"
            {...register("phone")}
            className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-sm font-sans text-navy-900 placeholder-charcoal-400 border rounded-lg outline-none transition-all duration-200 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500/20"
                : "border-border focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8"
            }`}
          />
          {errors.phone && (
            <p className="text-[10px] text-red-500 mt-1 font-bold ml-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="Your email address"
            {...register("email")}
            className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-sm font-sans text-navy-900 placeholder-charcoal-400 border rounded-lg outline-none transition-all duration-200 ${
              errors.email
                ? "border-red-500"
                : "border-border focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8"
            }`}
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 mt-1 font-bold ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            City
          </label>
          <input
            type="text"
            placeholder="Your city"
            {...register("city")}
            className="w-full px-2 py-2 sm:px-4 sm:py-3 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200"
          />
          {errors.city && (
            <p className="text-[10px] text-red-500 mt-1 font-bold ml-1">
              {errors.city.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="w-full lg:col-span-2">
          <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-charcoal-600 mb-1.5">
            Purpose
          </label>
          <select
            {...register("purpose")}
            disabled={purpose ? true : false}
            className="w-full px-2 py-2 sm:px-4 sm:py-3 text-sm font-sans text-navy-900 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200 bg-white"
          >
            {PURPOSE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
            {...register("note")}
            className="w-full px-2 py-2 sm:px-4 sm:py-3 text-sm font-sans text-navy-900 placeholder-charcoal-400 border border-border rounded-lg outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-900/8 transition-all duration-200 resize-none"
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 sm:py-4 text-white text-xs font-sans font-semibold tracking-widest uppercase rounded-lg transition-colors duration-200 mt-2 ${
          isSubmitting
            ? "bg-navy-900/60 cursor-not-allowed"
            : "bg-navy-900 hover:bg-navy-800 cursor-pointer"
        }`}
      >
        {isSubmitting ? "Submitting..." : btnText}
      </button>

      <p className="text-center text-xs font-sans text-charcoal-400">
        By submitting, you agree to our Privacy Policy.
      </p>
    </form>
  );
}
