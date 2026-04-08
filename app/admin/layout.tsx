import AdminLayout from "./components/AdminLayout";
import Providers from "./components/queryProvider";

export default function AdminLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Providers>
                <AdminLayout>{children}</AdminLayout>
            </Providers>
        </>
    );
}