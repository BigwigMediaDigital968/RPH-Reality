// lib/api/applications.api.ts
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

// Types
export interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  position: string;
  experience: string;
  resume: {
    url: string;
    pupublicId: string;
  };
  status: "pending" | "reviewed" | "interviewed" | "rejected" | "hired";
  appliedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApplicationsResponse {
  success: boolean;
  data: Application[];
  pagination: PaginationMeta;
}

export interface ApplicationResponse {
  success: boolean;
  data: Application;
  message?: string;
}

export interface ApplicationStatsResponse {
  success: boolean;
  data: {
    totalApplications: number;
    statusBreakdown: Array<{ _id: string; count: number }>;
    positionBreakdown: Array<{ _id: string; count: number }>;
    recentApplications: number;
  };
}

export interface GetApplicationsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  position?: string;
  experience?: string;
  city?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export interface CreateApplicationData {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  position?: string;
  experience: string;
  resume: string;
}

export interface UpdateApplicationData {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  position?: string;
  experience?: string;
  resume?: string;
  status?: Application["status"];
}

// API Client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API Functions
export const applicationsApi = {
  // Get all applications with pagination and filters
  getApplications: async (
    params: GetApplicationsParams = {}
  ): Promise<ApplicationsResponse> => {
    const response = await apiClient.get<ApplicationsResponse>("/applications", {
      params,
    });
    return response.data;
  },

  // Get single application by ID
  getApplicationById: async (id: string): Promise<ApplicationResponse> => {
    const response = await apiClient.get<ApplicationResponse>(`/applications/${id}`);
    return response.data;
  },

  // Create new application
  createApplication: async (
    data: CreateApplicationData
  ): Promise<ApplicationResponse> => {
    const response = await apiClient.post<ApplicationResponse>("/applications", data);
    return response.data;
  },

  // Update application
  updateApplication: async (
    id: string,
    data: UpdateApplicationData
  ): Promise<ApplicationResponse> => {
    const response = await apiClient.put<ApplicationResponse>(
      `/applications/${id}`,
      data
    );
    return response.data;
  },

  // Update application status only
  updateApplicationStatus: async (
    id: string,
    status: Application["status"]
  ): Promise<ApplicationResponse> => {
    const response = await apiClient.patch<ApplicationResponse>(
      `/applications/${id}/status`,
      { status }
    );
    return response.data;
  },

  // Delete application
  deleteApplication: async (id: string): Promise<ApplicationResponse> => {
    const response = await apiClient.delete<ApplicationResponse>(`/applications/${id}`);
    return response.data;
  },

  // Get application statistics
  getApplicationStats: async (): Promise<ApplicationStatsResponse> => {
    const response = await apiClient.get<ApplicationStatsResponse>(
      "/applications/stats"
    );
    return response.data;
  },

  // Bulk update applications
  bulkUpdateApplications: async (
    ids: string[],
    update: UpdateApplicationData
  ): Promise<{ success: boolean; message: string; data: any }> => {
    const response = await apiClient.patch("/applications/bulk-update", {
      ids,
      update,
    });
    return response.data;
  },

  // Bulk delete applications
  bulkDeleteApplications: async (
    ids: string[]
  ): Promise<{ success: boolean; message: string; data: any }> => {
    const response = await apiClient.delete("/applications/bulk-delete", {
      data: { ids },
    });
    return response.data;
  },

  // Export applications (download CSV/Excel)
  exportApplications: async (params: GetApplicationsParams = {}): Promise<Blob> => {
    const response = await apiClient.get("/applications/export", {
      params,
      responseType: "blob",
    });
    return response.data;
  },
};