"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, Trash2 } from "lucide-react";

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    purpose: string;
    propertyType: string;
    status: "new" | "contacted" | "converted" | "closed";
    date: string;
}

const mockLeads: Lead[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 98765 43210",
        city: "Mumbai",
        purpose: "Buy",
        propertyType: "Villa",
        status: "new",
        date: "2024-01-15",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+91 98765 43211",
        city: "Delhi",
        purpose: "Rent",
        propertyType: "Apartment",
        status: "contacted",
        date: "2024-01-15",
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+91 98765 43212",
        city: "Bangalore",
        purpose: "Invest",
        propertyType: "Commercial",
        status: "converted",
        date: "2024-01-14",
    },
];

export default function LeadManagement() {
    const [leads] = useState<Lead[]>(mockLeads);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const getStatusColor = (status: Lead["status"]) => {
        const colors = {
            new: "bg-blue-100 text-blue-700",
            contacted: "bg-yellow-100 text-yellow-700",
            converted: "bg-green-100 text-green-700",
            closed: "bg-gray-100 text-gray-700",
        };
        return colors[status];
    };

    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm);
        const matchesStatus =
            statusFilter === "all" || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-navy-900">
                        Lead Management
                    </h1>
                    <p className="text-sm font-sans text-text-muted mt-1">
                        Manage all your property enquiries
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors">
                    <Download size={18} />
                    Export Leads
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search by name, email or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                            size={20}
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
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
                                <th className="hidden px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Property Type
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
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-cream/30">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-sans font-medium text-navy-900">
                                            {lead.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-sans text-text-secondary">
                                            {lead.email}
                                        </div>
                                        <div className="text-xs font-sans text-text-muted">
                                            {lead.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {lead.city}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-gold-100 text-gold-600">
                                            {lead.purpose}
                                        </span>
                                    </td>
                                    <td className="hidden px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {lead.propertyType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                                                lead.status
                                            )}`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {lead.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-border px-6 py-4 flex items-center justify-between">
                    <p className="text-sm font-sans text-text-muted">
                        Showing <span className="font-semibold">1-{filteredLeads.length}</span> of{" "}
                        <span className="font-semibold">{leads.length}</span> leads
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}