// app/admin/careers/page.tsx
"use client";

import { useState } from "react";
import { Search, Download, Eye, FileText } from "lucide-react";

interface CareerApplication {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    experience: string;
    resume: string;
    status: "pending" | "reviewing" | "shortlisted" | "rejected";
    date: string;
}

const mockApplications: CareerApplication[] = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+91 98765 43210",
        position: "Real Estate Agent",
        experience: "3 years",
        resume: "resume_alice.pdf",
        status: "pending",
        date: "2024-01-15",
    },
    {
        id: 2,
        name: "Bob Williams",
        email: "bob@example.com",
        phone: "+91 98765 43211",
        position: "Property Manager",
        experience: "5 years",
        resume: "resume_bob.pdf",
        status: "reviewing",
        date: "2024-01-14",
    },
    {
        id: 3,
        name: "Carol Davis",
        email: "carol@example.com",
        phone: "+91 98765 43212",
        position: "Marketing Executive",
        experience: "2 years",
        resume: "resume_carol.pdf",
        status: "shortlisted",
        date: "2024-01-13",
    },
];

export default function CareerApplications() {
    const [applications] = useState<CareerApplication[]>(mockApplications);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const getStatusColor = (status: CareerApplication["status"]) => {
        const colors = {
            pending: "bg-blue-100 text-blue-700",
            reviewing: "bg-yellow-100 text-yellow-700",
            shortlisted: "bg-green-100 text-green-700",
            rejected: "bg-red-100 text-red-700",
        };
        return colors[status];
    };

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-navy-900">
                        Career Applications
                    </h1>
                    <p className="text-sm font-sans text-text-muted mt-1">
                        Manage job applications and candidates
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors">
                    <Download size={18} />
                    Export Applications
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search by name, email or position..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-white"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                        </select>
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
                            {filteredApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-cream/30">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-sans font-medium text-navy-900">
                                            {app.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-sans text-text-secondary">
                                            {app.email}
                                        </div>
                                        <div className="text-xs font-sans text-text-muted">
                                            {app.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-sans text-text-secondary">
                                        {app.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {app.experience}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                                                app.status
                                            )}`}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {app.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-navy-500 hover:bg-navy-50 rounded-lg transition-colors">
                                                <FileText size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-border px-6 py-4 flex items-center justify-between">
                    <p className="text-sm font-sans text-text-muted">
                        Showing{" "}
                        <span className="font-semibold">1-{filteredApplications.length}</span> of{" "}
                        <span className="font-semibold">{applications.length}</span> applications
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