import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskType, updateTaskType } from "./schema";
import { toast } from "sonner";
import { useParams } from "next/navigation";
export const useCreateTask = () => {
  const { project } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (tasks: createTaskType) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
      });
      if (!res.ok) {
        throw new Error("Failed to create task");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create task");
    },
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["project", project] });
    },
  });
  return mutation;
};

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient();
  const { project } = useParams();
  const mutation = useMutation({
    mutationFn: async (task: updateTaskType) => {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update task");
    },
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project", project] });
    },
  });
  return mutation;
};

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();
  const { project } = useParams();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete task");
    },
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["project", project] });
    },
  });
  return mutation;
};
