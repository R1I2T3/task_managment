import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  dueDate: z.string().transform((val) => new Date(val).toISOString()),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum(["todo", "in_progress", "done"]),
  projectId: z.string(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  dueDate: z
    .string()
    .transform((val) => new Date(val).toISOString())
    .optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
});
export type createTaskType = z.infer<typeof createTaskSchema>;
export type updateTaskType = z.infer<typeof updateTaskSchema>;
