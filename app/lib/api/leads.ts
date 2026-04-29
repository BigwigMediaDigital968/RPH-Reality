import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  purpose: string;
  note: string;
  adminNote: string;
  status: "new" | "assigned" | "contacted" | "closed";
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  assignedAt?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
  purpose?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
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
    new: number;
    assigned: number;
    contacted: number;
    closed: number;
  };
}

export const getLeads = async (filters: LeadFilters = {}): Promise<LeadsResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await axios.get(`${API_BASE_URL}/leads?${params.toString()}`);
  return response.data;
};

export const getLeadById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/leads/${id}`);
  return response.data;
};

export const createLead = async (data: Partial<Lead>) => {
  const response = await axios.post(`${API_BASE_URL}/leads`, data);
  return response.data;
};

export const updateLead = async (id: string, data: Partial<Lead>) => {
  const response = await axios.put(`${API_BASE_URL}/leads/${id}`, data);
  return response.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const response = await axios.put(`${API_BASE_URL}/leads/${id}`, { status });
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/leads/${id}`);
  return response.data;
};

export const assignLead = async (id: string, employeeId: string) => {
  const response = await axios.post(`${API_BASE_URL}/leads/${id}/assign`, { employeeId });
  return response.data;
};

export const getActiveEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees/active`);
  return response.data;
};

export const exportLeads = async (filters: LeadFilters = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await axios.get(`${API_BASE_URL}/leads/export?${params.toString()}`, {
    responseType: 'blob'
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `leads-${new Date().toISOString()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};