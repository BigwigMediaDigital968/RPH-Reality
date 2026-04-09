"use client";
import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Plus,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertCircle,
    CheckCircle,
    MapPin,
    Home,
    Bed,
    Bath,
    Maximize,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    getProperties,
    deleteProperty,
    getUniqueLocations,
    getUniqueTypes,
    type Property,
    type PropertyFilters,
} from "@/app/lib/api/properties";
import { formatDate } from "@/app/utils/date";
import Image from "next/image";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function PropertiesPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [purposeFilter, setPurposeFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [locationFilter, setLocationFilter] = useState<string>("all");
    const [bedroomsFilter, setBedroomsFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    // Modal states
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        propertyId: string | null;
        propertyTitle: string | null;
    }>({
        open: false,
        propertyId: null,
        propertyTitle: null,
    });

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

    // Debounced search
    const debouncedSearch = useDebounce(searchTerm, 500);

    // Build filters
    const filters: PropertyFilters = {
        page,
        limit,
        purpose: purposeFilter !== "all" ? purposeFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
        location: locationFilter !== "all" ? locationFilter : undefined,
        bedrooms: bedroomsFilter !== "all" ? bedroomsFilter : undefined,
        search: debouncedSearch || undefined,
    };

    // Queries
    const { data: propertiesData, isLoading, error } = useQuery({
        queryKey: ["properties", filters],
        queryFn: () => getProperties(filters),
    });

    const { data: locationsData } = useQuery({
        queryKey: ["locations"],
        queryFn: getUniqueLocations,
    });

    const { data: typesData } = useQuery({
        queryKey: ["types"],
        queryFn: getUniqueTypes,
    });

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
            setDeleteModal({ open: false, propertyId: null, propertyTitle: null });
            showToast("Property deleted successfully", "success");
        },
        onError: () => {
            showToast("Failed to delete property", "error");
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

    const getPurposeColor = (purpose: string) => {
        const colors: Record<string, string> = {
            buy: "bg-green-100 text-green-700",
            rent: "bg-blue-100 text-blue-700",
            lease: "bg-purple-100 text-purple-700",
        };
        return colors[purpose] || colors.buy;
    };

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, purposeFilter, typeFilter, locationFilter, bedroomsFilter]);

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-navy-900">
                        Property Management
                    </h1>
                    <p className="text-sm font-sans text-text-muted mt-1">
                        Manage all your property listings
                    </p>
                </div>
                <button
                    onClick={() => router.push("/admin/properties/create")}
                    className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                >
                    <Plus size={18} />
                    Add Property
                </button>
            </div>

            {/* Stats Cards */}
            {propertiesData?.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setPurposeFilter("all")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">
                            Total Properties
                        </p>
                        <p className="text-2xl font-display font-bold text-navy-900 mt-1">
                            {propertiesData.stats.all}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setPurposeFilter("buy")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">
                            For Sale
                        </p>
                        <p className="text-2xl font-display font-bold text-green-600 mt-1">
                            {propertiesData.stats.buy}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setPurposeFilter("rent")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">
                            For Rent
                        </p>
                        <p className="text-2xl font-display font-bold text-blue-600 mt-1">
                            {propertiesData.stats.rent}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setPurposeFilter("lease")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">
                            For Lease
                        </p>
                        <p className="text-2xl font-display font-bold text-purple-600 mt-1">
                            {propertiesData.stats.lease}
                        </p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg border border-border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Purpose Filter */}
                    <div className="relative">
                        <select
                            value={purposeFilter}
                            onChange={(e) => setPurposeFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="all">All Purposes</option>
                            <option value="buy">For Sale</option>
                            <option value="rent">For Rent</option>
                            <option value="lease">For Lease</option>
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div className="relative">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="all">All Types</option>
                            {typesData?.data?.map((type: string) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Location Filter */}
                    <div className="relative">
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="all">All Locations</option>
                            {locationsData?.data?.map((location: string) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="animate-spin text-gold-400" size={40} />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-sans text-sm">
                        Failed to load properties. Please try again.
                    </p>
                </div>
            )}

            {/* Properties Grid */}
            {!isLoading && !error && (
                <>
                    {propertiesData?.data?.length === 0 ? (
                        <div className="bg-white rounded-lg border border-border p-12 text-center">
                            <Home className="mx-auto text-text-muted mb-4" size={48} />
                            <p className="text-text-muted font-sans text-lg">
                                No properties found
                            </p>
                            <button
                                onClick={() => router.push("/admin/properties/create")}
                                className="mt-4 px-6 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                            >
                                Add Your First Property
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {propertiesData?.data?.map((property: Property) => (
                                <div
                                    key={property._id}
                                    className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {/* Property Image */}
                                    <div className="relative h-48 bg-cream">
                                        {property.images && property.images.length > 0 ? (
                                            <Image
                                                src={property.images[0]}
                                                alt={property.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <Home className="text-text-muted" size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getPurposeColor(
                                                    property.purpose
                                                )}`}
                                            >
                                                {property.purpose}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="p-4">
                                        <h3 className="font-display text-lg font-bold text-navy-900 mb-2 line-clamp-2">
                                            {property.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                                            <MapPin size={16} />
                                            <span className="font-sans">{property.location}</span>
                                        </div>

                                        {property.price && (
                                            <p className="text-xl font-display font-bold text-gold-600 mb-3">
                                                ₹{property.price}
                                            </p>
                                        )}

                                        {/* Property Features */}
                                        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                                            {property.bedrooms && (
                                                <div className="flex items-center gap-1">
                                                    <Bed size={16} />
                                                    <span className="font-sans">{property.bedrooms}</span>
                                                </div>
                                            )}
                                            {property.bathrooms && (
                                                <div className="flex items-center gap-1">
                                                    <Bath size={16} />
                                                    <span className="font-sans">{property.bathrooms}</span>
                                                </div>
                                            )}
                                            {property.areaSqft && (
                                                <div className="flex items-center gap-1">
                                                    <Maximize size={16} />
                                                    <span className="font-sans">{property.areaSqft} sqft</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Type Badge */}
                                        {property.type && (
                                            <div className="mb-4">
                                                <span className="px-3 py-1 bg-cream text-navy-900 rounded-full text-xs font-sans font-semibold">
                                                    {property.type}
                                                </span>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 pt-4 border-t border-border">
                                            <button
                                                onClick={() =>
                                                    router.push(`/admin/properties/edit/${property._id}`)
                                                }
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                                            >
                                                <Edit size={16} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setDeleteModal({
                                                        open: true,
                                                        propertyId: property._id,
                                                        propertyTitle: property.title,
                                                    })
                                                }
                                                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-sans font-semibold hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {propertiesData?.pagination && propertiesData.pagination.totalPages > 1 && (
                        <div className="bg-white rounded-lg border border-border px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-sans text-text-muted">
                                    Showing{" "}
                                    <span className="font-semibold">
                                        {(propertiesData.pagination.page - 1) *
                                            propertiesData.pagination.limit +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold">
                                        {Math.min(
                                            propertiesData.pagination.page *
                                            propertiesData.pagination.limit,
                                            propertiesData.pagination.total
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold">
                                        {propertiesData.pagination.total}
                                    </span>{" "}
                                    properties
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={!propertiesData.pagination.hasPrevPage}
                                    className="flex items-center gap-1 px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from(
                                        { length: propertiesData.pagination.totalPages },
                                        (_, i) => i + 1
                                    )
                                        .filter(
                                            (p) =>
                                                p === 1 ||
                                                p === propertiesData.pagination.totalPages ||
                                                Math.abs(p - propertiesData.pagination.page) <= 1
                                        )
                                        .map((p, i, arr) => (
                                            <>
                                                {i > 0 && arr[i - 1] !== p - 1 && (
                                                    <span key={`ellipsis-${p}`} className="px-2">
                                                        ...
                                                    </span>
                                                )}
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    className={`px-3 py-2 rounded-lg text-sm font-sans font-semibold transition-colors ${p === propertiesData.pagination.page
                                                        ? "bg-gold-400 text-navy-900"
                                                        : "border border-border text-navy-900 hover:bg-cream"
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            </>
                                        ))}
                                </div>
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={!propertiesData.pagination.hasNextPage}
                                    className="flex items-center gap-1 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() =>
                            setDeleteModal({ open: false, propertyId: null, propertyTitle: null })
                        }
                    />
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <h3 className="font-display text-xl font-bold text-navy-900 mb-2">
                                Delete Property
                            </h3>
                            <p className="text-sm font-sans text-text-secondary mb-4">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold">{deleteModal.propertyTitle}</span>?
                                This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() =>
                                        setDeleteModal({
                                            open: false,
                                            propertyId: null,
                                            propertyTitle: null,
                                        })
                                    }
                                    className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (deleteModal.propertyId) {
                                            deleteMutation.mutate(deleteModal.propertyId);
                                        }
                                    }}
                                    disabled={deleteMutation.isPending}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-sans font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {deleteMutation.isPending && (
                                        <Loader2 className="animate-spin" size={16} />
                                    )}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}