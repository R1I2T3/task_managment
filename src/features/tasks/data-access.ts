import { db } from "@/lib/db";
import { projects, tasks } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { createTaskType, updateTaskType } from "./schema";

export const CheckProjectBelongToUser = async (
  projectId: string,
  userId: string
) => {
  try {
    const project = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.owner_id, userId)));
    if (project.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const CreateTasks = async (data: createTaskType) => {
  try {
    const task = await db
      .insert(tasks)
      .values({
        title: data.title,
        description: data.description,
        due_date: new Date(data.dueDate),
        priority: data.priority,
        status: data.status,
        project_id: data.projectId,
      })
      .returning();
    return task;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const CheckTaskBelongToUser = async (userId: string, taskId: string) => {
  try {
    const task = await db.select().from(tasks).where(eq(tasks.id, taskId));
    const project = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.id, task[0].project_id), eq(projects.owner_id, userId))
      );
    if (project.length === 0) {
      return;
    }
    return task;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const UpdateTask = async (data: updateTaskType, taskId: string) => {
  try {
    const task = (
      await db
        .update(tasks)
        .set({
          ...data,
        })
        .where(eq(tasks.id, taskId))
        .returning()
    )[0];
    return task;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const DeleteTask = async (taskId: string) => {
  try {
    await db.delete(tasks).where(eq(tasks.id, taskId));
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};
