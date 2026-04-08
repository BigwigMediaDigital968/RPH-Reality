import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  sheetId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilters {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
}

export interface EmployeesResponse {
  success: boolean;
  data: Employee[];
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
    active: number;
    inactive: number;
  };
}

export const getEmployees = async (filters: EmployeeFilters = {}): Promise<EmployeesResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await axios.get(`${API_BASE_URL}/employees?${params.toString()}`);
  return response.data;
};

export const getEmployeeById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
  return response.data;
};

export const createEmployee = async (data: Partial<Employee>) => {
  const response = await axios.post(`${API_BASE_URL}/employees`, data);
  return response.data;
};

export const updateEmployee = async (id: string, data: Partial<Employee>) => {
  const response = await axios.put(`${API_BASE_URL}/employees/${id}`, data);
  return response.data;
};

export const toggleEmployeeStatus = async (id: string) => {
  const response = await axios.patch(`${API_BASE_URL}/employees/${id}/toggle-status`);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
  return response.data;
};

export const getActiveEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees/active`);
  return response.data;
};