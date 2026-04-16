import { ImageItem, ImagePayload } from "@/app/types";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  purpose: "sale" | "rent" | "lease";
  location: string;
  brochure: string;
  builder: string;
  images: string[];
  price: string;
  bedrooms: string;
  bathrooms: string;
  areaSqft: string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  googleMapUrl: string;
  videoLink: string;
  extraHighlights: string[];
  instagramLink: string;
  extraDetails: string;
  faqs: FAQ[];
  metatitle: string;
  metadescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  search?: string;
  purpose?: string;
  type?: string;
  location?: string;
  bedrooms?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
  listingStatus?: "featured"| "new"| "hot"| "premium"| "standard"
}

export interface PropertiesResponse {
  success: boolean;
  data: Property[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: {
    all: number;
    sale: number;
    rent: number;
    lease: number;
  };
}




export const createProperty = async (data: Partial<Property>, images: ImageItem[], brochure?: File | null) => {
  const formData = new FormData();

  // Add property data
  formData.append("data", JSON.stringify(data));

  // Build images payload
  const imagesPayload: ImagePayload[] = images.map((img) => ({
    id: img.id,
    type: img.isNew ? "new" : "existing",
    url: img.isNew ? undefined : img.url,
    order: img.order,
  }));

  formData.append("imagesPayload", JSON.stringify(imagesPayload));

  // Add new image files
  images.forEach((img) => {
    if (img.isNew && img.file) {
      formData.append(`images[${img.id}]`, img.file);
    }
  });

  if (brochure) {
    formData.append("brochure", brochure);
  }

  const response = await axios.post(`${API_BASE_URL}/properties`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProperty = async (
  id: string,
  data: Partial<Property>,
  images: ImageItem[],
  brochure?: File | null,
  removeBrochure?: boolean
) => {
  const formData = new FormData();

  // Add property data
  formData.append("data", JSON.stringify(data));

  // Build images payload
  const imagesPayload: ImagePayload[] = images.map((img) => ({
    id: img.id,
    type: img.isNew ? "new" : "existing",
    url: img.isNew ? undefined : img.url,
    order: img.order,
  }));

  formData.append("imagesPayload", JSON.stringify(imagesPayload));

  // Add new image files
  images.forEach((img) => {
    if (img.isNew && img.file) {
      formData.append(`images[${img.id}]`, img.file);
    }
  });

   if (brochure) {
    formData.append("brochure", brochure);
  }

  // Add remove brochure flag
  if (removeBrochure) {
    formData.append("removeBrochure", "true");
  }

  const response = await axios.put(`${API_BASE_URL}/properties/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getProperties = async (filters: PropertyFilters = {}): Promise<PropertiesResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await axios.get(`${API_BASE_URL}/properties?${params.toString()}`);
  return response.data;
};

export const getPropertyById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
  return response.data;
};

export const getPropertyBySlug = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/properties/slug/${slug}`);
  return response.data;
};

{/**export const createProperty = async (data: Partial<Property>) => {
  const response = await axios.post(`${API_BASE_URL}/properties`, data);
  return response.data;
};

export const updateProperty = async (id: string, data: Partial<Property>) => {
  const response = await axios.put(`${API_BASE_URL}/properties/${id}`, data);
  return response.data;
}; */}

export const deleteProperty = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/properties/${id}`);
  return response.data;
};

export const getUniqueLocations = async () => {
  const response = await axios.get(`${API_BASE_URL}/properties/locations`);
  return response.data;
};

export const getUniqueTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/properties/types`);
  return response.data;
};