import AdminGuard from "../components/AdminGuard";
import AdminLayout from "./components/AdminLayout";
import Providers from "./components/queryProvider";

export default function AdminLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AdminGuard>
                <Providers>
                    <AdminLayout>{children}</AdminLayout>
                </Providers>
            </AdminGuard>
        </>
    );
}
