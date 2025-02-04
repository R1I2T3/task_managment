import { db } from "@/lib/db";
import { ProjectCreationType, ProjectUpdateType } from "./schema";
import { projects, tasks } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
export const CreateProject = async (
  data: ProjectCreationType,
  owner_id: string
) => {
  try {
    const res = await db.insert(projects).values({
      name: data.title,
      description: data.description,
      owner_id: owner_id, // Replace with actual owner ID
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetMyProjects = async (owner_id: string) => {
  try {
    const res = await db
      .select()
      .from(projects)
      .where(eq(projects.owner_id, owner_id));
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UpdateProjectSchema = async (
  owner_id: string,
  projectId: string,
  data: ProjectUpdateType
) => {
  try {
    const res = await db
      .update(projects)
      .set({
        ...data,
      })
      .where(and(eq(projects.owner_id, owner_id), eq(projects.id, projectId)));
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const DeleteProject = async (owner_id: string, projectId: string) => {
  try {
    await db.delete(tasks).where(eq(tasks.project_id, projectId));
    await db.delete(projects).where(and(eq(projects.id, projectId)));
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const GetProjectWithTask = async (
  owner_id: string,
  projectId: string
) => {
  try {
    const res = await db
      .select()
      .from(projects)
      .leftJoin(tasks, eq(tasks.project_id, projects.id))
      .where(and(eq(projects.owner_id, owner_id), eq(projects.id, projectId)));
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
