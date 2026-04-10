// app/careers/[slug]/page.tsx
"use client";

import { useState } from "react";
import { motion, setDragLock } from "framer-motion";
import { ChevronDown, Upload, CheckCircle, ArrowRight } from "lucide-react";
import api from "../lib/api/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const applicationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    phone: z.string().regex(/^\+?[0-9\s-]{7,15}$/, "Invalid Number"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    city: z.string().optional().or(z.literal("")),
    position: z.string().min(1, "Please select a position"),
    experience: z.string().max(500, "Select experience"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function CareerApplicationForm() {
    const [fileName, setFileName] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, seLoading] = useState<boolean>(false);
    const [formError, setFromError] = useState({
        resume: "",
        error: ""
    });
    // Form state
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        mode: "onTouched",
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (5MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setFromError((prev) => ({ ...prev, resume: "File size must be less than 5MB" }));
                return;
            }

            // Check file type
            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (!allowedTypes.includes(file.type)) {
                setFromError((prev) => ({
                    ...prev,
                    resume: "Only PDF and DOC files are allowed",
                }));
                return;
            }

            setResume(file);
            setFromError((prev) => ({ ...prev, resume: "" }));
        }
    };


    const onSubmit = async (data: ApplicationFormValues) => {

        if (!resume) {
            setFromError((prev) => ({ ...prev, resume: "Please upload your resume" }));
            return;
        }

        const applicationData = data;

        try {
            seLoading(true);
            console.log(applicationData)
            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                formData.append(key, data[key as keyof ApplicationFormValues] as string);
            });
            formData.append("resume", resume);

            const res = await api.post(`/applications`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error("Error creating application:", error);
            setFromError((prev) => ({ ...prev, error: "Something went wrong" }));
        } finally {
            seLoading(false);
        }
    };

    const handleApplyAgain = () => {
        setIsSuccess(false);
    };

    if (isSuccess) {
        return (
            <div className="lg:col-span-5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 md:p-12 rounded-[2rem] border-2 border-green-200 sticky top-28"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse" />
                            <div className="relative bg-white rounded-full p-4 shadow-lg">
                                <CheckCircle className="text-green-500" size={64} strokeWidth={2} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center space-y-4 mb-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-navy-900">
                            Application Submitted!
                        </h3>
                        <p className="text-slate-600 text-base md:text-lg max-w-md mx-auto">
                            Thank you for applying! We've received your application and our team
                            will review it shortly.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                        <button
                            onClick={handleApplyAgain}
                            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 text-navy-900 font-bold uppercase text-xs tracking-[0.2em] rounded-xl hover:border-gold-400 hover:bg-slate-50 transition-all"
                        >
                            Apply for Another Position
                        </button>
                        <Link
                            href="/careers"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-900 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-gold-400 hover:text-navy-900 transition-all shadow-lg"
                        >
                            Back to Home
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </motion.div>
            </div >
        );
    }

    return (
        <div className="lg:col-span-5">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-slate-50 p-4 md:p-6 rounded-[2rem] border border-slate-100 sticky top-28"
            >
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                    Apply for this position
                </h3>
                <p className="text-slate-500 text-sm mb-8">
                    Complete the form below and we'll be in touch.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                    {/* Full Name */}
                    <div className="md:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="John Doe"
                            className={`w-full mt-1 px-4 py-2.5 rounded-xl bg-white border ${errors.name ? "border-red-400" : "border-slate-200"
                                } outline-none focus:border-gold-400 transition-colors text-sm`}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{errors?.name?.message}</p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div className="md:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="john@example.com"
                            className={`w-full mt-1 px-4 py-2.5 rounded-xl bg-white border ${errors.email ? "border-red-400" : "border-slate-200"
                                } outline-none focus:border-gold-400 transition-colors text-sm`}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{errors?.name?.message}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Phone Number *
                        </label>
                        <input
                            type="text"
                            {...register("phone")}
                            placeholder="+91 98467 32587"
                            className={`w-full mt-1 px-4 py-2.5 rounded-xl bg-white border ${errors.phone ? "border-red-400" : "border-slate-200"
                                } outline-none focus:border-gold-400 transition-colors text-sm`}
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{errors?.phone?.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="md:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Your City *
                        </label>
                        <input
                            type="text"
                            {...register("city")}
                            placeholder="e.g. Panjim"
                            className={`w-full mt-1 px-4 py-2.5 rounded-xl bg-white border ${errors.city ? "border-red-400" : "border-slate-200"
                                } outline-none focus:border-gold-400 transition-colors text-sm`}
                        />
                        {errors.city && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{errors?.city?.message}</p>
                        )}
                    </div>

                    {/* Select Position Dropdown */}
                    <div className="md:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Target Position *
                        </label>
                        <div className="relative mt-1 group">
                            <select
                                {...register("position")}
                                className={`w-full px-4 py-2.5 rounded-xl bg-white border ${errors.position ? "border-red-400" : "border-slate-200"
                                    } outline-none focus:border-gold-400 transition-all text-sm appearance-none cursor-pointer pr-10`}
                            >
                                <option value="">Choose a position</option>
                                <option value="Luxury Property Consultant">
                                    Luxury Property Consultant
                                </option>
                                <option value="Portfolio Manager">Portfolio Manager</option>
                                <option value="Digital Marketing Specialist">
                                    Digital Marketing Specialist
                                </option>
                                <option value="Operations Associate">Operations Associate</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-navy-900/80 group-focus-within:text-gold-400 transition-colors">
                                <ChevronDown size={16} strokeWidth={2.5} />
                            </div>
                        </div>
                        {errors.position && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{errors?.position?.message}</p>
                        )}
                    </div>

                    {/* Experience Level */}
                    <div className="md:col-span-1">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Experience Level *
                        </label>
                        <div className="relative mt-1 group">
                            <select
                                {...register("experience")}
                                className={`w-full px-4 py-2.5 rounded-xl bg-white border ${errors.experience ? "border-red-400" : "border-slate-200"
                                    } outline-none focus:border-gold-400 transition-all text-sm appearance-none cursor-pointer pr-10`}
                            >
                                <option value="">Select experience</option>
                                <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                                <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                                <option value="Senior Level (6-10 years)">
                                    Senior Level (6-10 years)
                                </option>
                                <option value="Expert Level (10+ years)">Expert Level (10+ years)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-navy-900/80 group-focus-within:text-gold-400 transition-colors">
                                <ChevronDown size={16} strokeWidth={2.5} />
                            </div>
                        </div>
                        {errors.experience && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{errors?.experience?.message}</p>
                        )}
                    </div>

                    {/* Resume Upload */}
                    <div className="md:col-span-2">
                        <label className="text-[10px] uppercase font-bold text-navy-900/80 tracking-widest ml-1">
                            Resume / CV *
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="file"
                                id="resume"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                            />
                            <label
                                htmlFor="resume"
                                className={`flex items-center justify-between w-full px-5 py-4 border-2 border-dashed ${formError.resume ? "border-red-400" : "border-slate-200"
                                    } rounded-xl bg-white hover:bg-slate-50 hover:border-gold-400 transition-all cursor-pointer`}
                            >
                                <div className="flex items-center gap-3">
                                    <Upload className="text-navy-900/80" size={18} />
                                    <span className="text-xs font-bold text-slate-500">
                                        {resume ? resume.name : "Upload PDF or Doc"}
                                    </span>
                                </div>
                                {!resume && (
                                    <span className="text-[10px] text-slate-300 font-medium">
                                        Max 5MB
                                    </span>
                                )}
                            </label>
                        </div>
                        {formError?.resume && (
                            <p className="text-xs text-red-500 mt-1 ml-1">{formError?.resume}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-2">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer w-full py-3.5 bg-navy-900 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-gold-400 hover:text-navy-900 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin h-4 w-4"
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
                                    Submitting...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </motion.button>
                    </div>

                    {/* Error Message */}
                    {Object.keys(errors).length > 0 && (
                        <div className="md:col-span-2">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-sm text-red-600">
                                    {"Failed to submit application. Please try again."}
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
}