// app/admin/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, FileText, Briefcase, TrendingUp, Building2 } from "lucide-react";
import { getLeads } from "../lib/api/leads";
import { getBlogStats } from "../lib/api/blogs";
import { applicationsApi } from "../lib/api/applications";
import { getProperties } from "../lib/api/properties";
import { formatDate } from "../utils/date";
import Link from "next/link";

interface StatCardProps {
    title: string;
    value: string | number;
    change: string;
    icon: React.ElementType;
    trend: "up" | "down";
}

const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => {
    return (
        <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-gold-50 flex items-center justify-center">
                    <Icon className="text-gold-500" size={24} />
                </div>
                <span
                    className={`text-xs font-sans font-semibold ${trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {change}
                </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-navy-900 mb-1">
                {value}
            </h3>
            <p className="text-sm font-sans text-text-muted">{title}</p>
        </div>
    );
};

export default function AdminDashboard() {

    const filters = {
        page: 1,
        limit: 5,
    }

    const { data: leadsData } = useQuery({
        queryKey: ["leads", filters],
        queryFn: () => getLeads(filters)
    });

    const { data: blogStats } = useQuery({
        queryKey: ["blog-stats"],
        queryFn: () => getBlogStats()
    });

    const { data: appStats } = useQuery({
        queryKey: ["application-stats"],
        queryFn: () => applicationsApi.getApplicationStats()
    });

    const { data: propertyStats } = useQuery({
        queryKey: ["property-stats"],
        queryFn: () => getProperties({ page: 1, limit: 1 })
    });


    const stats = [
        {
            title: "Total Leads",
            value: leadsData?.stats.all || 0,
            change: "+12.5%",
            icon: Users,
            trend: "up" as const,
        },
        {
            title: "Total Blogs",
            value: blogStats?.data.total || 0,
            change: "+8.2%",
            icon: FileText,
            trend: "up" as const,
        },
        {
            title: "Total Properties",
            value: propertyStats?.stats.all || 0,
            change: "+5.4%",
            icon: Building2,
            trend: "up" as const,
        },
        {
            title: "Career Applications",
            value: appStats?.data.totalApplications || 0,
            change: "+15.3%",
            icon: Briefcase,
            trend: "up" as const,
        },

    ];

    const recentLeads = leadsData?.data;

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Recent Leads Table */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                    <h3 className="font-display text-xl font-bold text-navy-900">
                        Recent Leads
                    </h3>
                    <p className="text-sm font-sans text-text-muted mt-1">
                        Latest enquiries from your website
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-cream">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Purpose
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentLeads?.map((lead) => (
                                <tr key={lead._id} className="hover:bg-cream/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans font-medium text-navy-900">
                                        {lead.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {lead.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {lead.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-gold-100 text-gold-600">
                                            {lead.purpose}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                                        {formatDate(lead.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans">
                                        <button className="text-gold-500 hover:text-gold-600 font-semibold">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-border px-6 py-4">
                    <Link href={`/admin/leads`} className="text-sm font-sans font-semibold text-gold-500 hover:text-gold-600">
                        View All Leads →
                    </Link>
                </div>
            </div>
        </div>
    );
}