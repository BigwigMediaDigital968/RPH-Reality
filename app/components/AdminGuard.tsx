// app/admin/components/AdminGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin-auth");
        if (!token) {
            router.replace("/login");
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return null;

    return <>{children}</>;
}