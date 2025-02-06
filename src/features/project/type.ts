import { tasks } from "@/lib/db/schema";

export type ProjectType = {
  id: string;
  name: string;
  description: string;
};

export type ProjectWithTasks = {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  owner_id: string;
  tasks: (typeof tasks.$inferSelect)[];
};
