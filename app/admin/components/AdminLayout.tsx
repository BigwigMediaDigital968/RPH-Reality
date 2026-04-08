// app/admin/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    ChevronDown,
    Users2,
} from "lucide-react";

interface MenuItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Lead Management", href: "/admin/leads", icon: Users },
    { name: "Employee Management", href: "/admin/employees", icon: Users2 },
    { name: "Career Applications", href: "/admin/careers", icon: Briefcase },
    { name: "Projects", href: "/admin/projects", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...");
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-off-white">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen w-64 bg-navy-900 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-20 items-center justify-between border-b border-navy-800 px-6">
                        <div>
                            <h1 className="font-display text-2xl font-bold text-gold-400">
                                RPH Admin
                            </h1>
                            <p className="text-xs text-navy-100">Dashboard</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-navy-100 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/admin" &&
                                        pathname.startsWith(item.href));

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-sans font-medium transition-all ${isActive
                                                ? "bg-gold-400 text-navy-900"
                                                : "text-navy-100 hover:bg-navy-800 hover:text-white"
                                                }`}
                                        >
                                            <Icon size={20} />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="border-t border-navy-800 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-sans font-medium text-navy-100 hover:bg-red-900/20 hover:text-red-400 transition-all"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                />
            )}

            {/* Main Content Area */}
            <div className="lg:pl-64">
                {/* Top Navbar */}
                <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-white px-6 shadow-sm">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-navy-900"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Page Title - visible on desktop */}
                    <div className="hidden lg:block">
                        <h2 className="font-display text-2xl font-bold text-navy-900">
                            {menuItems.find((item) => {
                                if (pathname === item.href) return true;
                                if (
                                    item.href !== "/admin" &&
                                    pathname.startsWith(item.href)
                                )
                                    return true;
                                return false;
                            })?.name || "Dashboard"}
                        </h2>
                    </div>

                    {/* Mobile title */}
                    <h2 className="font-display text-xl font-bold text-navy-900 lg:hidden">
                        RPH Admin
                    </h2>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-2 hover:bg-cream transition-colors"
                        >
                            <div className="h-8 w-8 rounded-full bg-gold-400 flex items-center justify-center">
                                <User size={18} className="text-navy-900" />
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-sans font-semibold text-navy-900">
                                    Admin User
                                </p>
                                <p className="text-xs text-text-muted">Administrator</p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-navy-900 transition-transform ${profileOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-white shadow-lg">
                                <div className="p-2">
                                    <Link
                                        href="/admin/profile"
                                        className="block rounded px-4 py-2 text-sm font-sans text-navy-900 hover:bg-cream"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/admin/settings"
                                        className="block rounded px-4 py-2 text-sm font-sans text-navy-900 hover:bg-cream"
                                    >
                                        Settings
                                    </Link>
                                    <hr className="my-2 border-border" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded px-4 py-2 text-left text-sm font-sans text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="min-h-[calc(100vh-5rem)] p-6">{children}</main>
            </div>
        </div>
    );
}