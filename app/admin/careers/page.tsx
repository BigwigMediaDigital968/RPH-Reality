// app/admin/careers/page.tsx
"use client";

import { useState } from "react";
import { Search, Download, Eye, FileText, Trash2, Loader2 } from "lucide-react";

import {
    useApplications,
    useUpdateApplicationStatus,
    useDeleteApplication,
} from "../Hooks/useApplications";
import { Application } from "@/app/lib/api/applications";

export default function CareerApplications() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    // Fetch applications with filters
    const { data, isLoading, isError, error } = useApplications({
        page: currentPage,
        limit,
        search: searchTerm,
        status: statusFilter === "all" ? undefined : statusFilter,
    });

    // Mutations
    const updateStatus = useUpdateApplicationStatus();
    const deleteApplication = useDeleteApplication();

    const getStatusColor = (status: Application["status"]) => {
        const colors = {
            pending: "bg-blue-100 text-blue-700",
            reviewed: "bg-yellow-100 text-yellow-700",
            interviewed: "bg-purple-100 text-purple-700",
            rejected: "bg-red-100 text-red-700",
            hired: "bg-green-100 text-green-700",
        };
        return colors[status];
    };

    const handleStatusChange = (id: string, status: Application["status"]) => {
        updateStatus.mutate({ id, status });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this application?")) {
            deleteApplication.mutate(id);
        }
    };

    const handleExport = async () => {
        try {
            // You can implement export functionality here
            const blob = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/applications/export?${new URLSearchParams(
                    {
                        search: searchTerm,
                        ...(statusFilter !== "all" && { status: statusFilter }),
                    }
                )}`
            ).then((res) => res.blob());

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `applications-${new Date().toISOString()}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-600 font-semibold mb-2">Error loading applications</p>
                    <p className="text-sm text-text-muted">
                        {(error as any)?.response?.data?.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex flex-col justify-between md:flex-row md:items-center gap-4">
                    <div className="md:col-span-2">
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search by name, email or position..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:w-auto">
                        <div className="relative flex-1 md:flex-none md:min-w-[140px]">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page on filter
                                }}
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="interviewed">Interviewed</option>
                                <option value="rejected">Rejected</option>
                                <option value="hired">Hired</option>
                            </select>
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                        >
                            <Download size={18} />
                            Export Applications
                        </button>
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-cream">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Candidate
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Position
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Experience
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin text-gold-500" size={24} />
                                            <span className="text-text-muted">Loading applications...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : data?.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <p className="text-text-muted">No applications found</p>
                                    </td>
                                </tr>
                            ) : (
                                data?.data.map((app: any) => (
                                    <tr key={app._id} className="hover:bg-cream/30">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-sans font-medium text-navy-900">
                                                {app.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-sans text-text-secondary">
                                                {app.email || "N/A"}
                                            </div>
                                            <div className="text-xs font-sans text-text-muted">
                                                {app.phone || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-sans text-text-secondary">
                                            {app.position || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                            {app.experience}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={app.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        app._id,
                                                        e.target.value as Application["status"]
                                                    )
                                                }
                                                disabled={updateStatus.isPending}
                                                className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                                                    app.status
                                                )} border-0 cursor-pointer hover:opacity-80 transition-opacity`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="interviewed">Interviewed</option>
                                                <option value="rejected">Rejected</option>
                                                <option value="hired">Hired</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                            {formatDate(app.appliedDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => window.open(`/admin/careers/${app._id}`, "_blank")}
                                                    className="p-2 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <a
                                                    href={app.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-navy-500 hover:bg-navy-50 rounded-lg transition-colors"
                                                    title="View Resume"
                                                >
                                                    <FileText size={18} />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(app._id)}
                                                    disabled={deleteApplication.isPending}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete Application"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {data && data.data.length > 0 && (
                    <div className="border-t border-border px-6 py-4 flex items-center justify-between">
                        <p className="text-sm font-sans text-text-muted">
                            Showing{" "}
                            <span className="font-semibold">
                                {(currentPage - 1) * limit + 1}-
                                {Math.min(currentPage * limit, data.pagination.totalCount)}
                            </span>{" "}
                            of <span className="font-semibold">{data.pagination.totalCount}</span>{" "}
                            applications
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={!data.pagination.hasPrevPage}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1)
                                    .filter(
                                        (page) =>
                                            page === 1 ||
                                            page === data.pagination.totalPages ||
                                            Math.abs(page - currentPage) <= 1
                                    )
                                    .map((page, index, array) => (
                                        <>
                                            {index > 0 && array[index - 1] !== page - 1 && (
                                                <span key={`ellipsis-${page}`} className="px-2 text-text-muted">
                                                    ...
                                                </span>
                                            )}
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-2 rounded-lg text-sm font-sans font-semibold transition-colors ${currentPage === page
                                                    ? "bg-gold-400 text-navy-900"
                                                    : "border border-border text-navy-900 hover:bg-cream"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        </>
                                    ))}
                            </div>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(data.pagination.totalPages, prev + 1)
                                    )
                                }
                                disabled={!data.pagination.hasNextPage}
                                className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}