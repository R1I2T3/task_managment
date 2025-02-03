import { z } from "zod";

export const ProjectCreationSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export const ProjectUpdateSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
});

export const ProjectDeletionSchema = z.object({
  id: z.string().nonempty(),
});
export type ProjectCreationType = z.infer<typeof ProjectCreationSchema>;
export type ProjectUpdateType = z.infer<typeof ProjectUpdateSchema>;
export type ProjectDeletionSchema = z.infer<typeof ProjectDeletionSchema>;
