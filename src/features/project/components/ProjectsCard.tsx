"use client";

import React from "react";
import { useGetProjects } from "../hooks";
import { Loader } from "lucide-react";
import { ProjectType } from "../type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const ProjectsCard = () => {
  const { data: projects, isPending, isError } = useGetProjects();
  const router = useRouter();
  if (isPending)
    return (
      <div className="mx-auto w-[50px] h-[50px] mt-4">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  if (isError) return <div>Error...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {(projects as ProjectType[]).map((project) => (
        <Card
          key={project.id}
          onClick={() => router.push(`/dashboard/${project.id}`)}
        >
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>{project.description}</h1>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsCard;
