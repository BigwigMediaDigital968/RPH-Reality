"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    ArrowLeft,
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    X,
    Plus,
    Image as ImageIcon,
    Trash2,
} from "lucide-react";
import {
    createProperty,
    updateProperty,
    getPropertyById,
    type Property,
    type FAQ,
} from "@/app/lib/api/properties";

interface PropertyFormProps {
    mode: "create" | "edit";
    propertyId?: string;
}

export default function PropertyForm({ mode, propertyId }: PropertyFormProps) {
    const router = useRouter();

    // Toast state
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error";
    }>({
        show: false,
        message: "",
        type: "success",
    });

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        type: "",
        purpose: "buy" as "buy" | "rent" | "lease",
        location: "",
        brochure: "",
        builder: "",
        images: [] as string[],
        price: "",
        bedrooms: "",
        bathrooms: "",
        areaSqft: "",
        highlights: [] as string[],
        featuresAmenities: [] as string[],
        nearby: [] as string[],
        googleMapUrl: "",
        videoLink: "",
        extraHighlights: [] as string[],
        instagramLink: "",
        extraDetails: "",
        faqs: [] as FAQ[],
        metatitle: "",
        metadescription: "",
    });

    // Temporary input states for arrays
    const [imageInput, setImageInput] = useState("");
    const [highlightInput, setHighlightInput] = useState("");
    const [featureInput, setFeatureInput] = useState("");
    const [nearbyInput, setNearbyInput] = useState("");
    const [extraHighlightInput, setExtraHighlightInput] = useState("");
    const [faqQuestion, setFaqQuestion] = useState("");
    const [faqAnswer, setFaqAnswer] = useState("");

    // Fetch property data for edit mode
    const { data: propertyData, isLoading: isLoadingProperty } = useQuery({
        queryKey: ["property", propertyId],
        queryFn: () => getPropertyById(propertyId!),
        enabled: mode === "edit" && !!propertyId,
    });

    // Load property data into form
    useEffect(() => {
        if (mode === "edit" && propertyData?.data) {
            const property = propertyData.data;
            setFormData({
                title: property.title || "",
                slug: property.slug || "",
                description: property.description || "",
                type: property.type || "",
                purpose: property.purpose || "buy",
                location: property.location || "",
                brochure: property.brochure || "",
                builder: property.builder || "",
                images: property.images || [],
                price: property.price || "",
                bedrooms: property.bedrooms || "",
                bathrooms: property.bathrooms || "",
                areaSqft: property.areaSqft || "",
                highlights: property.highlights || [],
                featuresAmenities: property.featuresAmenities || [],
                nearby: property.nearby || [],
                googleMapUrl: property.googleMapUrl || "",
                videoLink: property.videoLink || "",
                extraHighlights: property.extraHighlights || [],
                instagramLink: property.instagramLink || "",
                extraDetails: property.extraDetails || "",
                faqs: property.faqs || [],
                metatitle: property.metatitle || "",
                metadescription: property.metadescription || "",
            });
        }
    }, [mode, propertyData]);

    // Mutations
    const createMutation = useMutation({
        mutationFn: createProperty,
        onSuccess: () => {
            showToast("Property created successfully", "success");
            setTimeout(() => {
                router.push("/admin/properties");
            }, 1500);
        },
        onError: (error: any) => {
            showToast(
                error.response?.data?.message || "Failed to create property",
                "error"
            );
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Property> }) =>
            updateProperty(id, data),
        onSuccess: () => {
            showToast("Property updated successfully", "success");
            setTimeout(() => {
                router.push("/admin/properties");
            }, 1500);
        },
        onError: (error: any) => {
            showToast(
                error.response?.data?.message || "Failed to update property",
                "error"
            );
        },
    });

    // Helper functions
    const showToast = (message: string, type: "success" | "error") => {
        setToast({ show: true, message, type });
        setTimeout(
            () => setToast({ show: false, message: "", type: "success" }),
            3000
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === "create") {
            createMutation.mutate(formData);
        } else if (mode === "edit" && propertyId) {
            updateMutation.mutate({ id: propertyId, data: formData });
        }
    };

    // Array manipulation helpers
    const addImage = () => {
        if (imageInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, imageInput.trim()],
            }));
            setImageInput("");
        }
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const addHighlight = () => {
        if (highlightInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                highlights: [...prev.highlights, highlightInput.trim()],
            }));
            setHighlightInput("");
        }
    };

    const removeHighlight = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            highlights: prev.highlights.filter((_, i) => i !== index),
        }));
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                featuresAmenities: [...prev.featuresAmenities, featureInput.trim()],
            }));
            setFeatureInput("");
        }
    };

    const removeFeature = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            featuresAmenities: prev.featuresAmenities.filter((_, i) => i !== index),
        }));
    };

    const addNearby = () => {
        if (nearbyInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                nearby: [...prev.nearby, nearbyInput.trim()],
            }));
            setNearbyInput("");
        }
    };

    const removeNearby = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            nearby: prev.nearby.filter((_, i) => i !== index),
        }));
    };

    const addExtraHighlight = () => {
        if (extraHighlightInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                extraHighlights: [...prev.extraHighlights, extraHighlightInput.trim()],
            }));
            setExtraHighlightInput("");
        }
    };

    const removeExtraHighlight = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            extraHighlights: prev.extraHighlights.filter((_, i) => i !== index),
        }));
    };

    const addFAQ = () => {
        if (faqQuestion.trim() && faqAnswer.trim()) {
            setFormData((prev) => ({
                ...prev,
                faqs: [
                    ...prev.faqs,
                    { question: faqQuestion.trim(), answer: faqAnswer.trim() },
                ],
            }));
            setFaqQuestion("");
            setFaqAnswer("");
        }
    };

    const removeFAQ = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index),
        }));
    };

    if (mode === "edit" && isLoadingProperty) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-gold-400" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${toast.type === "success"
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                            }`}
                    >
                        {toast.type === "success" ? (
                            <CheckCircle className="text-green-600" size={20} />
                        ) : (
                            <AlertCircle className="text-red-600" size={20} />
                        )}
                        <p
                            className={`font-sans text-sm ${toast.type === "success" ? "text-green-800" : "text-red-800"
                                }`}
                        >
                            {toast.message}
                        </p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/admin/properties")}
                        className="p-2 hover:bg-cream rounded-lg transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="font-display text-lg sm:text-xl font-bold text-navy-900">
                            {mode === "create" ? "Add New Property" : "Edit Property"}
                        </h1>
                        <p className="text-sm font-sans text-text-muted mt-1">
                            {mode === "create"
                                ? "Fill in the details to create a new property listing"
                                : "Update the property details"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Property Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., Luxury 3BHK Apartment in South Delhi"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="auto-generated if left empty"
                            />
                            <p className="text-xs font-sans text-text-muted mt-1">
                                Leave empty to auto-generate from title
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Purpose <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={formData.purpose}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        purpose: e.target.value as "buy" | "rent" | "lease",
                                    })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            >
                                <option value="buy">For Sale</option>
                                <option value="rent">For Rent</option>
                                <option value="lease">For Lease</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Property Type
                            </label>
                            <input
                                type="text"
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({ ...formData, type: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., Apartment, Villa, Plot"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., South Delhi, Gurgaon"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                                placeholder="Detailed description of the property..."
                            />
                        </div>
                    </div>
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Property Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Price
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., 1.5 Cr"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Bedrooms
                            </label>
                            <input
                                type="text"
                                value={formData.bedrooms}
                                onChange={(e) =>
                                    setFormData({ ...formData, bedrooms: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., 3"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Bathrooms
                            </label>
                            <input
                                type="text"
                                value={formData.bathrooms}
                                onChange={(e) =>
                                    setFormData({ ...formData, bathrooms: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., 2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Area (sqft)
                            </label>
                            <input
                                type="text"
                                value={formData.areaSqft}
                                onChange={(e) =>
                                    setFormData({ ...formData, areaSqft: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., 1500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Builder
                            </label>
                            <input
                                type="text"
                                value={formData.builder}
                                onChange={(e) =>
                                    setFormData({ ...formData, builder: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="e.g., DLF, Godrej"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Property Images
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={imageInput}
                                onChange={(e) => setImageInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                                className="flex-1 px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Enter image URL and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addImage}
                                className="px-4 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {formData.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-lg border border-border overflow-hidden aspect-square"
                                    >
                                        <img
                                            src={image}
                                            alt={`Property ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Highlights */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Highlights
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={highlightInput}
                                onChange={(e) => setHighlightInput(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && (e.preventDefault(), addHighlight())
                                }
                                className="flex-1 px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Add a highlight and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addHighlight}
                                className="px-4 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {formData.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg"
                                    >
                                        <span className="font-sans text-sm text-navy-900">
                                            {highlight}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeHighlight(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Features & Amenities */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Features & Amenities
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && (e.preventDefault(), addFeature())
                                }
                                className="flex-1 px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Add a feature and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-4 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {formData.featuresAmenities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.featuresAmenities.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg"
                                    >
                                        <span className="font-sans text-sm text-navy-900">
                                            {feature}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Nearby Places */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Nearby Places
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={nearbyInput}
                                onChange={(e) => setNearbyInput(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && (e.preventDefault(), addNearby())
                                }
                                className="flex-1 px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Add nearby place and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addNearby}
                                className="px-4 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {formData.nearby.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.nearby.map((place, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg"
                                    >
                                        <span className="font-sans text-sm text-navy-900">{place}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeNearby(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Extra Highlights */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Extra Highlights
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={extraHighlightInput}
                                onChange={(e) => setExtraHighlightInput(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && (e.preventDefault(), addExtraHighlight())
                                }
                                className="flex-1 px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Add extra highlight and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addExtraHighlight}
                                className="px-4 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {formData.extraHighlights.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.extraHighlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg"
                                    >
                                        <span className="font-sans text-sm text-navy-900">
                                            {highlight}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeExtraHighlight(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Links & Media */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        Links & Media
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Brochure URL
                            </label>
                            <input
                                type="url"
                                value={formData.brochure}
                                onChange={(e) =>
                                    setFormData({ ...formData, brochure: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="https://example.com/brochure.pdf"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Video Link
                            </label>
                            <input
                                type="url"
                                value={formData.videoLink}
                                onChange={(e) =>
                                    setFormData({ ...formData, videoLink: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Google Map URL
                            </label>
                            <input
                                type="url"
                                value={formData.googleMapUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, googleMapUrl: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="https://maps.google.com/..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Instagram Link
                            </label>
                            <input
                                type="url"
                                value={formData.instagramLink}
                                onChange={(e) =>
                                    setFormData({ ...formData, instagramLink: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="https://instagram.com/..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Extra Details
                            </label>
                            <textarea
                                rows={4}
                                value={formData.extraDetails}
                                onChange={(e) =>
                                    setFormData({ ...formData, extraDetails: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                                placeholder="Any additional details..."
                            />
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        FAQs
                    </h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    value={faqQuestion}
                                    onChange={(e) => setFaqQuestion(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                    placeholder="Enter FAQ question"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                    Answer
                                </label>
                                <textarea
                                    rows={3}
                                    value={faqAnswer}
                                    onChange={(e) => setFaqAnswer(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                                    placeholder="Enter FAQ answer"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addFAQ}
                                className="px-4 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                Add FAQ
                            </button>
                        </div>

                        {formData.faqs.length > 0 && (
                            <div className="space-y-3">
                                {formData.faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-cream rounded-lg border border-border"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <p className="font-sans font-semibold text-navy-900 mb-1">
                                                    Q: {faq.question}
                                                </p>
                                                <p className="font-sans text-sm text-text-secondary">
                                                    A: {faq.answer}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFAQ(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
                        SEO Information
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                value={formData.metatitle}
                                onChange={(e) =>
                                    setFormData({ ...formData, metatitle: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="SEO title for search engines"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Meta Description
                            </label>
                            <textarea
                                rows={3}
                                value={formData.metadescription}
                                onChange={(e) =>
                                    setFormData({ ...formData, metadescription: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none"
                                placeholder="SEO description for search engines"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center gap-4 justify-end sticky bottom-0 bg-white border-t border-border p-4 -mx-6">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/properties")}
                        className="px-6 py-3 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="flex items-center gap-2 px-6 py-3 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50"
                    >
                        {(createMutation.isPending || updateMutation.isPending) && (
                            <Loader2 className="animate-spin" size={18} />
                        )}
                        <Save size={18} />
                        {mode === "create" ? "Create Property" : "Update Property"}
                    </button>
                </div>
            </form>
        </div>
    );
}