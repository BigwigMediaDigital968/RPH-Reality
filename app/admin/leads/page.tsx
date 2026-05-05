"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  UserPlus,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
  assignLead,
  getActiveEmployees,
  exportLeads,
  type Lead,
  type LeadFilters,
} from "@/app/lib/api/leads";
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

type CleanedLead = {
  "S.No": number;
  name: string;
  phone: string;
  email: string;
  city: string;
  purpose: string;
  note: string;
  adminNote: string;
  status: "new" | "assigned" | "contacted" | "closed";
  assignedTo: string;
  source: string;
  sheetSynced: string;
  createdAt: string;
  updatedAt: string;
  assignedAt: string;
};

export default function LeadManagement() {
  const queryClient = useQueryClient();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [purposeFilter, setPurposeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modal states
  const [viewModal, setViewModal] = useState<{
    open: boolean;
    lead: Lead | null;
  }>({
    open: false,
    lead: null,
  });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    leadId: string | null;
  }>({
    open: false,
    leadId: null,
  });
  const [assignModal, setAssignModal] = useState<{
    open: boolean;
    leadId: string | null;
  }>({
    open: false,
    leadId: null,
  });
  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    leadId: string | null;
    currentStatus: string | null;
  }>({
    open: false,
    leadId: null,
    currentStatus: null,
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

  // Build filters object
  const filters: LeadFilters = {
    page,
    limit,
    status: statusFilter !== "all" ? statusFilter : undefined,
    purpose: purposeFilter !== "all" ? purposeFilter : undefined,
    search: debouncedSearch || undefined,
    sort: sortOrder,
    sortBy,
  };

  // Queries
  const {
    data: leadsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leads", filters],
    queryFn: () => getLeads(filters),
  });

  const { data: employeesData } = useQuery({
    queryKey: ["activeEmployees"],
    queryFn: getActiveEmployees,
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setDeleteModal({ open: false, leadId: null });
      showToast("Lead deleted successfully", "success");
    },
    onError: () => {
      showToast("Failed to delete lead", "error");
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateLeadStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setStatusModal({ open: false, leadId: null, currentStatus: null });
      showToast("Status updated successfully", "success");
    },
    onError: () => {
      showToast("Failed to update status", "error");
    },
  });

  const assignMutation = useMutation({
    mutationFn: ({
      leadId,
      employeeId,
    }: {
      leadId: string;
      employeeId: string;
    }) => assignLead(leadId, employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setAssignModal({ open: false, leadId: null });
      showToast("Lead assigned successfully", "success");
    },
    onError: () => {
      showToast("Failed to assign lead", "error");
    },
  });

  // Helper functions
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };

  const handleViewLead = async (leadId: string) => {
    try {
      const response = await getLeadById(leadId);
      setViewModal({ open: true, lead: response.data });
    } catch (error) {
      showToast("Failed to load lead details", "error");
    }
  };

const handleExport = () => {
  try {
    if (!leadsData || leadsData?.data?.length === 0) {
      showToast("No data to export", "error");
      return;
    }

    // Convert JSON to CSV
        const cleanedData = leadsData.data.map((item:any, index:number) => ({
      "S.No": index + 1,
      name: item.name,
      phone: item.phone,
      email: item.email,
      city: item.city,
      purpose: item.purpose,
      note: item.note,
      adminNote: item.adminNote,
      status: item.status,
      assignedTo: item.assignedTo?.name || item.assignedTo?.email || "", // fix object
      source: item.source,
      sheetSynced: item.sheetSynced ? "Yes" : "No",
      createdAt: new Date(item.createdAt).toLocaleString(),
      updatedAt: new Date(item.updatedAt).toLocaleString(),
      assignedAt: item.assignedAt
        ? new Date(item.assignedAt).toLocaleString()
        : "",
    }));

    const headers = Object.keys(cleanedData[0]) as (keyof CleanedLead)[];

    const csvRows = [
      headers.join(","),
      ...cleanedData.map(row =>
        headers.map(field => `"${row[field] ?? ""}"`).join(",")
      ),
    ];


    const csvContent = csvRows.join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Leads exported successfully", "success");
  } catch (error) {
    showToast("Failed to export leads", "error");
  }
};

  const getStatusColor = (status: Lead["status"]) => {
    const colors = {
      new: "bg-blue-100 text-blue-700",
      assigned: "bg-purple-100 text-purple-700",
      contacted: "bg-yellow-100 text-yellow-700",
      closed: "bg-gray-100 text-gray-700",
    };
    return colors[status];
  };

  const getPurposeColor = (purpose: string) => {
    const colors: Record<string, string> = {
      buy: "bg-green-100 text-green-700",
      sell: "bg-orange-100 text-orange-700",
      rent: "bg-blue-100 text-blue-700",
      invest: "bg-purple-100 text-purple-700",
      others: "bg-gray-100 text-gray-700",
    };
    return colors[purpose] || colors.others;
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, purposeFilter]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
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
              className={`font-sans text-sm ${
                toast.type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {toast.message}
            </p>
          </div>
        </div>
      )}

      {/* Header */}

      {/* Stats Cards */}
      {leadsData?.stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(leadsData.stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setStatusFilter(key)}
            >
              <p className="text-sm font-sans text-text-muted uppercase">
                {key}
              </p>
              <p className="text-2xl font-display font-bold text-navy-900 mt-1">
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Left Side: Search Bar (Grows to fill space) */}
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
            />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Right Side: Filters Container */}
          <div className="flex flex-wrap items-center gap-3 md:w-auto">
            {/* Status Filter */}
            <div className="relative flex-1 md:flex-none md:min-w-[140px]">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                size={16}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="assigned">Assigned</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              {/* Optional: Add a custom chevron icon here if you want to replace default browser arrow */}
            </div>

            {/* Purpose Filter */}
            <div className="relative flex-1 md:flex-none md:min-w-[140px]">
              <select
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Purpose</option>
                <option value="buy">Buy</option>
                <option value="sell">Sale</option>
                <option value="other">Other</option>
                {/* <option value="rent">Rent</option>
                <option value="lease">Lease</option> */}
              </select>
            </div>

            {/* Export lead button */}
            <button
              onClick={handleExport}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans hover:bg-gold-500 transition-colors"
            >
              <Download size={18} />
              Export
            </button>

            {/* Placeholder for future filters: Simply duplicate the div above */}
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
            Failed to load leads. Please try again.
          </p>
        </div>
      )}

      {/* Leads Table */}
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
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                    Assigned To
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
                {leadsData?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <p className="text-text-muted font-sans">
                        No leads found
                      </p>
                    </td>
                  </tr>
                ) : (
                  leadsData?.data?.map((lead: Lead) => (
                    <tr key={lead._id} className="hover:bg-cream/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-sans font-medium text-navy-900">
                          {lead.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-sans text-text-secondary">
                          {lead.email || "N/A"}
                        </div>
                        <div className="text-xs font-sans text-text-muted">
                          {lead.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                        {lead.city || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getPurposeColor(
                            lead.purpose,
                          )}`}
                        >
                          {lead.purpose || "others"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                        {lead.assignedTo?.name || (
                          <span className="text-text-muted italic">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            setStatusModal({
                              open: true,
                              leadId: lead._id,
                              currentStatus: lead.status,
                            })
                          }
                          className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                            lead.status,
                          )} hover:opacity-80 transition-opacity`}
                        >
                          {lead.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewLead(lead._id)}
                            className="cursor-pointer p-2 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setAssignModal({ open: true, leadId: lead._id })
                            }
                            className="cursor-pointer p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Assign Lead"
                          >
                            <UserPlus size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({ open: true, leadId: lead._id })
                            }
                            className="cursor-pointer p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Lead"
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
          {leadsData?.pagination && (
            <div className="border-t border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm font-sans text-text-muted">
                  Showing{" "}
                  <span className="font-semibold">
                    {(leadsData.pagination.page - 1) *
                      leadsData.pagination.limit +
                      1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {Math.min(
                      leadsData.pagination.page * leadsData.pagination.limit,
                      leadsData.pagination.total,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">
                    {leadsData.pagination.total}
                  </span>{" "}
                  leads
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
                  disabled={!leadsData.pagination.hasPrevPage}
                  className="flex items-center gap-1 px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: leadsData.pagination.totalPages },
                    (_, i) => i + 1,
                  )
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === leadsData.pagination.totalPages ||
                        Math.abs(p - leadsData.pagination.page) <= 1,
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
                          className={`px-3 py-2 rounded-lg text-sm font-sans font-semibold transition-colors ${
                            p === leadsData.pagination.page
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
                  disabled={!leadsData.pagination.hasNextPage}
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

      {/* View Modal */}
      {viewModal.open && viewModal.lead && (
        <Modal
          onClose={() => setViewModal({ open: false, lead: null })}
          title="Lead Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Name
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Phone
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Email
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.email || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  City
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.city || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Purpose
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.purpose || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Status
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                      viewModal.lead.status,
                    )}`}
                  >
                    {viewModal.lead.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Source
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.source}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Created At
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {formatDate(viewModal.lead.createdAt)}
                </p>
              </div>
              {viewModal.lead.assignedTo && (
                <>
                  <div>
                    <label className="text-sm font-sans font-semibold text-navy-900">
                      Assigned To
                    </label>
                    <p className="text-sm font-sans text-text-secondary mt-1">
                      {viewModal.lead.assignedTo.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-sans font-semibold text-navy-900">
                      Assigned At
                    </label>
                    <p className="text-sm font-sans text-text-secondary mt-1">
                      {viewModal.lead.assignedAt
                        ? formatDate(viewModal.lead.assignedAt)
                        : "N/A"}
                    </p>
                  </div>
                </>
              )}
            </div>
            {viewModal.lead.note && (
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Note
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.note}
                </p>
              </div>
            )}
            {viewModal.lead.adminNote && (
              <div>
                <label className="text-sm font-sans font-semibold text-navy-900">
                  Admin Note
                </label>
                <p className="text-sm font-sans text-text-secondary mt-1">
                  {viewModal.lead.adminNote}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <Modal
          onClose={() => setDeleteModal({ open: false, leadId: null })}
          title="Delete Lead"
        >
          <div className="space-y-4">
            <p className="text-sm font-sans text-text-secondary">
              Are you sure you want to delete this lead? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal({ open: false, leadId: null })}
                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteModal.leadId) {
                    deleteMutation.mutate(deleteModal.leadId);
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
        </Modal>
      )}

      {/* Assign Modal */}
      {assignModal.open && (
        <Modal
          onClose={() => setAssignModal({ open: false, leadId: null })}
          title="Assign Lead"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                Select Employee
              </label>
              <select
                id="employee-select"
                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              >
                <option value="">Choose an employee...</option>
                {employeesData?.data?.map((employee: any) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name} - {employee.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setAssignModal({ open: false, leadId: null })}
                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const select = document.getElementById(
                    "employee-select",
                  ) as HTMLSelectElement;
                  const employeeId = select.value;
                  if (employeeId && assignModal.leadId) {
                    assignMutation.mutate({
                      leadId: assignModal.leadId,
                      employeeId,
                    });
                  }
                }}
                disabled={assignMutation.isPending}
                className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {assignMutation.isPending && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                Assign
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Change Modal */}
      {statusModal.open && (
        <Modal
          onClose={() =>
            setStatusModal({ open: false, leadId: null, currentStatus: null })
          }
          title="Update Status"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-sans font-semibold text-navy-900 mb-2 block">
                Select New Status
              </label>
              <select
                id="status-select"
                defaultValue={statusModal.currentStatus || ""}
                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              >
                <option value="new">New</option>
                <option value="assigned">Assigned</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setStatusModal({
                    open: false,
                    leadId: null,
                    currentStatus: null,
                  })
                }
                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const select = document.getElementById(
                    "status-select",
                  ) as HTMLSelectElement;
                  const status = select.value;
                  if (status && statusModal.leadId) {
                    statusMutation.mutate({
                      id: statusModal.leadId,
                      status,
                    });
                  }
                }}
                disabled={statusMutation.isPending}
                className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {statusMutation.isPending && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                Update
              </button>
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
