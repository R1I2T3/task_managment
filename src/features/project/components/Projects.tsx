import React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useGetProjects } from "../hooks";
import { Loader } from "lucide-react";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import { ProjectType } from "../type";
const Project = () => {
  const router = useRouter();
  const { data: projects, isPending, isError } = useGetProjects();
  if (isPending)
    return (
      <div className="mx-auto w-[50px] h-[50px] mt-4">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  if (isError) return <div>Error...</div>;
  console.log(projects);
  return (
    <SidebarMenu>
      {projects.map((project: ProjectType) => (
        <SidebarMenuItem key={project.id} className="flex justify-between">
          <SidebarMenuButton
            onClick={() => router.push(`/dashboard/${project.id}`)}
          >
            {project.name}
          </SidebarMenuButton>
          <div className="flex gap-2">
            <EditProject
              name={project.name}
              description={project.description}
              id={project.id}
            />
            <DeleteProject id={project.id} />
          </div>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default Project;
