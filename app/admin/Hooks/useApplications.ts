// hooks/useApplications.ts
import { applicationsApi,
  GetApplicationsParams,
  CreateApplicationData,
  UpdateApplicationData,
  Application, } from "@/app/lib/api/applications";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner"; // or your toast library

// Query Keys
export const applicationKeys = {
  all: ["applications"] as const,
  lists: () => [...applicationKeys.all, "list"] as const,
  list: (params: GetApplicationsParams) =>
    [...applicationKeys.lists(), params] as const,
  details: () => [...applicationKeys.all, "detail"] as const,
  detail: (id: string) => [...applicationKeys.details(), id] as const,
  stats: () => [...applicationKeys.all, "stats"] as const,
};

// Get Applications Hook
export const useApplications = (params: GetApplicationsParams = {}) => {
  return useQuery({
    queryKey: applicationKeys.list(params),
    queryFn: () => applicationsApi.getApplications(params),
    staleTime: 30000, // 30 seconds
    retry: 2,
  });
};

// Get Single Application Hook
export const useApplication = (id: string) => {
  return useQuery({
    queryKey: applicationKeys.detail(id),
    queryFn: () => applicationsApi.getApplicationById(id),
    enabled: !!id,
  });
};

// Get Application Stats Hook
export const useApplicationStats = () => {
  return useQuery({
    queryKey: applicationKeys.stats(),
    queryFn: () => applicationsApi.getApplicationStats(),
    staleTime: 60000, // 1 minute
  });
};

// Create Application Hook
export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationData) =>
      applicationsApi.createApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });
      toast.success("Application submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit application");
    },
  });
};

// Update Application Hook
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApplicationData }) =>
      applicationsApi.updateApplication(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: applicationKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });
      toast.success("Application updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update application");
    },
  });
};

// Update Application Status Hook
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Application["status"] }) =>
      applicationsApi.updateApplicationStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: applicationKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });
      toast.success("Application status updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update application status"
      );
    },
  });
};

// Delete Application Hook
export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicationsApi.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });
      toast.success("Application deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete application");
    },
  });
};

// Bulk Update Applications Hook
export const useBulkUpdateApplications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, update }: { ids: string[]; update: UpdateApplicationData }) =>
      applicationsApi.bulkUpdateApplications(ids, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });
      toast.success("Applications updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update applications"
      );
    },
  });
};

// Bulk Delete Applications Hook
export const useBulkDeleteApplications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => applicationsApi.bulkDeleteApplications(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });
      toast.success("Applications deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete applications"
      );
    },
  });
};