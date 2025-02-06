export type tasksType = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
};
