"use client";
import PropertyForm from "@/app/admin/components/PropertyForm";
import { useParams } from "next/navigation";

export default function EditPropertyPage() {
    const params = useParams();
    const propertyId = params.id as string;

    return <PropertyForm mode="edit" propertyId={propertyId} />;
}