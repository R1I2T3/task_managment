"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectCreationType, ProjectUpdateType } from "./schema";
import { toast } from "sonner";

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/project");
      const data = await res.json();
      return data;
    },
  });
  return query;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: ProjectCreationType) => {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
  });
  return mutation;
};

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: ProjectUpdateType) => {
      const res = await fetch(`/api/project/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
    },
  });
  return mutation;
};

export const useDeleteProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/project/${projectId}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
  });
  return mutation;
};

export const useGetProject = (projectId: string) => {
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/project/${projectId}`);
      const data = await res.json();
      return data;
    },
  });
  return query;
};
