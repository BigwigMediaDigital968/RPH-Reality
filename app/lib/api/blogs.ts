import axios from "axios";
export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogImage {
  url: string;
  publicId: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  blogImage: BlogImage;
  tags: string[];
  category: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  faqs: FAQ[];
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  faqSchema?: object;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  tags?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
}

export interface BlogsResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    categories: string[];
    tags: string[];
  };
}

export interface BlogStatsResponse {
  success: boolean;
  data: {
    total: number;
    published: number;
    draft: number;
    totalViews: number;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getBlogs = async (filters: BlogFilters = {}): Promise<BlogsResponse> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await axios.get(`${API_BASE_URL}/blogs?${params.toString()}`);
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/blogs/slug/${slug}`);
  return response.data;
};

export const getBlogStats = async (): Promise<BlogStatsResponse> => {
  const response = await axios.get(`${API_BASE_URL}/blogs/stats`);
  return response.data;
};

export const createBlog = async (data: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/blogs`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBlog = async (id: string, data: FormData) => {
  const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`);
  return response.data;
};

export const uploadContentImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `${API_BASE_URL}/blogs/upload-content-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};