/* eslint-disable @typescript-eslint/no-explicit-any */
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
      return data.data;
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
    onMutate: async (newProject: ProjectUpdateType) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previousProjects = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["projects"], (old: any) => {
        return old.map((project: any) => {
          if (project.id === projectId) {
            return { ...project, ...newProject };
          }
          return project;
        });
      });
      return { previousProjects };
    },
    onError: (error, newProject, context) => {
      console.log(error);
      queryClient.setQueryData(["projects"], context?.previousProjects);
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
    onMutate: async (variable) => {
      console.log(variable);
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previousProjects = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["projects"], (old: any) => {
        return old.filter((project: any) => project.id !== projectId);
      });
      return { previousProjects };
    },
    onError: (error, variable, context) => {
      console.log(error);
      queryClient.setQueryData(["projects"], context?.previousProjects);
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
      if (!res.ok) {
        throw new Error("Failed to fetch Projects");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
