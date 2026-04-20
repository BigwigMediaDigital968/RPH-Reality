"use client";
import { useState, useEffect } from "react";
import {
    Search,
    UserPlus,
    Eye,
    Edit,
    Trash2,
    X,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertCircle,
    CheckCircle,
    Power,
    Mail,
    Phone,
    FileSpreadsheet,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    toggleEmployeeStatus,
    deleteEmployee,
    type Employee,
    type EmployeeFilters,
} from "@/app/lib/api/employee";
import { formatDate } from "@/app/utils/date";

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

export default function EmployeeManagement() {
    const queryClient = useQueryClient();

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Modal states
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState<{
        open: boolean;
        employee: Employee | null;
    }>({
        open: false,
        employee: null,
    });
    const [viewModal, setViewModal] = useState<{
        open: boolean;
        employee: Employee | null;
    }>({
        open: false,
        employee: null,
    });
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        employeeId: string | null;
    }>({
        open: false,
        employeeId: null,
    });

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        sheetId: "",
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
    const filters: EmployeeFilters = {
        page,
        limit,
        isActive: statusFilter !== "all" ? statusFilter : undefined,
        search: debouncedSearch || undefined,
    };

    // Queries
    const { data: employeesData, isLoading, error } = useQuery({
        queryKey: ["employees", filters],
        queryFn: () => getEmployees(filters),
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setCreateModal(false);
            resetForm();
            showToast("Employee created successfully", "success");
        },
        onError: (error: any) => {
            showToast(
                error.response?.data?.message || "Failed to create employee",
                "error"
            );
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Employee> }) =>
            updateEmployee(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setEditModal({ open: false, employee: null });
            resetForm();
            showToast("Employee updated successfully", "success");
        },
        onError: (error: any) => {
            showToast(
                error.response?.data?.message || "Failed to update employee",
                "error"
            );
        },
    });

    const toggleStatusMutation = useMutation({
        mutationFn: toggleEmployeeStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            showToast("Employee status updated successfully", "success");
        },
        onError: () => {
            showToast("Failed to update employee status", "error");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setDeleteModal({ open: false, employeeId: null });
            showToast("Employee deactivated successfully", "success");
        },
        onError: () => {
            showToast("Failed to deactivate employee", "error");
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

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            sheetId: "",
        });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editModal.employee) {
            updateMutation.mutate({
                id: editModal.employee._id,
                data: formData,
            });
        }
    };

    const openEditModal = (employee: Employee) => {
        setFormData({
            name: employee.name,
            email: employee.email,
            phone: employee.phone || "",
            sheetId: employee.sheetId,
        });
        setEditModal({ open: true, employee });
    };

    const openViewModal = (employee: Employee) => {
        setViewModal({ open: true, employee });
    };

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, statusFilter]);

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
            <div className="hidden flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-navy-900">
                        Employee Management
                    </h1>
                    <p className="text-sm font-sans text-text-muted mt-1">
                        Manage your team members
                    </p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setCreateModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                >
                    <UserPlus size={18} />
                    Add Employee
                </button>
            </div>

            {/* Stats Cards */}
            {employeesData?.stats && (
                <div className="grid grid-cols-3 gap-4">
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setStatusFilter("all")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">Total</p>
                        <p className="text-2xl font-display font-bold text-navy-900 mt-1">
                            {employeesData.stats.all}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setStatusFilter("true")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">Active</p>
                        <p className="text-2xl font-display font-bold text-green-600 mt-1">
                            {employeesData.stats.active}
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setStatusFilter("false")}
                    >
                        <p className="text-sm font-sans text-text-muted uppercase">
                            Inactive
                        </p>
                        <p className="text-2xl font-display font-bold text-gray-600 mt-1">
                            {employeesData.stats.inactive}
                        </p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Search */}

                    <div className="relative flex-grow">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone or sheet ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-wrap items-center gap-3 md:w-auto">
                        <div className="relative flex-1 md:flex-none md:min-w-[140px]">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="all">All Employees</option>
                                <option value="true">Active Only</option>
                                <option value="false">Inactive Only</option>
                            </select>

                        </div>
                        <button
                            onClick={() => {
                                resetForm();
                                setCreateModal(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
                        >
                            <UserPlus size={18} />
                            Add Employee
                        </button>
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
                        Failed to load employees. Please try again.
                    </p>
                </div>
            )}

            {/* Employees Table */}
            {!isLoading && !error && (
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-cream">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Sheet ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {employeesData?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center">
                                            <p className="text-text-muted font-sans">
                                                No employees found
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    employeesData?.data?.map((employee: Employee) => (
                                        <tr key={employee._id} className="hover:bg-cream/30">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-sans font-medium text-navy-900">
                                                    {employee.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm font-sans text-text-secondary">
                                                    <Mail size={14} className="text-text-muted" />
                                                    {employee.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm font-sans text-text-secondary">
                                                    <Phone size={14} className="text-text-muted" />
                                                    {employee.phone || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm font-sans text-text-secondary">
                                                    <FileSpreadsheet
                                                        size={14}
                                                        className="text-text-muted"
                                                    />
                                                    {employee.sheetId}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        toggleStatusMutation.mutate(employee._id)
                                                    }
                                                    className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${employee.isActive
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        } transition-colors`}
                                                >
                                                    {employee.isActive ? "Active" : "Inactive"}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                                {formatDate(employee.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openViewModal(employee)}
                                                        className="p-2 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => openEditModal(employee)}
                                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Employee"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            toggleStatusMutation.mutate(employee._id)
                                                        }
                                                        className={`p-2 rounded-lg transition-colors ${employee.isActive
                                                            ? "text-orange-500 hover:bg-orange-50"
                                                            : "text-green-500 hover:bg-green-50"
                                                            }`}
                                                        title={
                                                            employee.isActive
                                                                ? "Deactivate Employee"
                                                                : "Activate Employee"
                                                        }
                                                    >
                                                        <Power size={18} />
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
                    {employeesData?.pagination && (
                        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-sans text-text-muted">
                                    Showing{" "}
                                    <span className="font-semibold">
                                        {(employeesData.pagination.page - 1) *
                                            employeesData.pagination.limit +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold">
                                        {Math.min(
                                            employeesData.pagination.page *
                                            employeesData.pagination.limit,
                                            employeesData.pagination.total
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold">
                                        {employeesData.pagination.total}
                                    </span>{" "}
                                    employees
                                </p>
                                <select
                                    value={limit}
                                    onChange={(e) => setLimit(Number(e.target.value))}
                                    className="px-3 py-1 border border-border rounded-lg text-sm font-sans"
                                >
                                    <option value={10}>10 per page</option>
                                    <option value={25}>25 per page</option>
                                    <option value={50}>50 per page</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={!employeesData.pagination.hasPrevPage}
                                    className="flex items-center gap-1 px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from(
                                        { length: employeesData.pagination.totalPages },
                                        (_, i) => i + 1
                                    )
                                        .filter(
                                            (p) =>
                                                p === 1 ||
                                                p === employeesData.pagination.totalPages ||
                                                Math.abs(p - employeesData.pagination.page) <= 1
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
                                                    className={`px-3 py-2 rounded-lg text-sm font-sans font-semibold transition-colors ${p === employeesData.pagination.page
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
                                    disabled={!employeesData.pagination.hasNextPage}
                                    className="flex items-center gap-1 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Create Modal */}
            {createModal && (
                <Modal
                    onClose={() => {
                        setCreateModal(false);
                        resetForm();
                    }}
                    title="Add New Employee"
                >
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Enter employee name"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="employee@example.com"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="+91 1234567890"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Google Sheet ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.sheetId}
                                onChange={(e) =>
                                    setFormData({ ...formData, sheetId: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                placeholder="Enter Google Sheet ID"
                            />
                            <p className="text-xs font-sans text-text-muted mt-1">
                                This is used for Google Sheets integration
                            </p>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setCreateModal(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createMutation.isPending}
                                className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {createMutation.isPending && (
                                    <Loader2 className="animate-spin" size={16} />
                                )}
                                Create Employee
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Edit Modal */}
            {editModal.open && editModal.employee && (
                <Modal
                    onClose={() => {
                        setEditModal({ open: false, employee: null });
                        resetForm();
                    }}
                    title="Edit Employee"
                >
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                                Google Sheet ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.sheetId}
                                onChange={(e) =>
                                    setFormData({ ...formData, sheetId: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditModal({ open: false, employee: null });
                                    resetForm();
                                }}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={updateMutation.isPending}
                                className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {updateMutation.isPending && (
                                    <Loader2 className="animate-spin" size={16} />
                                )}
                                Update Employee
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* View Modal */}
            {viewModal.open && viewModal.employee && (
                <Modal
                    onClose={() => setViewModal({ open: false, employee: null })}
                    title="Employee Details"
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900">
                                    Name
                                </label>
                                <p className="text-sm font-sans text-text-secondary mt-1">
                                    {viewModal.employee.name}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900">
                                    Status
                                </label>
                                <p className="text-sm font-sans text-text-secondary mt-1">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${viewModal.employee.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {viewModal.employee.isActive ? "Active" : "Inactive"}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900">
                                    Email
                                </label>
                                <p className="text-sm font-sans text-text-secondary mt-1">
                                    {viewModal.employee.email}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900">
                                    Phone
                                </label>
                                <p className="text-sm font-sans text-text-secondary mt-1">
                                    {viewModal.employee.phone || "N/A"}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900">
                                    Google Sheet ID
                                </label>
                                <p className="text-sm font-sans text-text-secondary mt-1">
                                    {viewModal.employee.sheetId}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-sans font-semibold text-navy-900">
                                    Created At
                                </label>
                                <p className="text-sm font-sans text-text-secondary mt-1">
                                    {formatDate(viewModal.employee.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// Modal Component
function Modal({
    children,
    onClose,
    title,
}: {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-navy-900">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-cream rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}