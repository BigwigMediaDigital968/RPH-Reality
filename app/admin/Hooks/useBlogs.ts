// hooks/useBlogs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BlogFilters, createBlog, deleteBlog, getBlogById, getBlogs, getBlogStats, updateBlog } from "@/app/lib/api/blogs";

export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters: BlogFilters) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
  stats: () => [...blogKeys.all, "stats"] as const,
};

export const useBlogs = (filters: BlogFilters = {}) => {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => getBlogs(filters),
    staleTime: 30000,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
};

export const useBlogStats = () => {
  return useQuery({
    queryKey: blogKeys.stats(),
    queryFn: () => getBlogStats(),
    staleTime: 60000,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
      toast.success("Blog created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create blog");
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateBlog(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
      toast.success("Blog updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update blog");
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
      toast.success("Blog deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    },
  });
};