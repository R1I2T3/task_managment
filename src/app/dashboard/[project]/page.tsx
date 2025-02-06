"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useGetProject } from "@/features/project/hooks";
import { Loader } from "lucide-react";
import { ProjectWithTasks } from "@/features/project/type";
import CalendarWithTasks from "@/features/tasks/components/Calendar";
import { TaskStatistics } from "@/features/tasks/components/TaskStats";
const Project = () => {
  const session = authClient.useSession();
  const { project } = useParams();
  const { data, isPending, isError } = useGetProject(project as string);
  if (!session) {
    return redirect("/");
  }
  if (isPending)
    return (
      <div className="mx-auto w-[50px] h-[50px] mt-4">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  if (isError) return <div>Error...</div>;
  console.log(data);
  return (
    <>
      {/* Task Filtering and Search */}
      <Card className="mt-4 lg:mt-6">
        <CardHeader>
          <CardTitle>Search and Filter Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input placeholder="Search tasks..." className="flex-1" />
            <Button className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          {/* Add filter options here */}
        </CardContent>
      </Card>

      {/* Calendar Widget */}
      <Card className="mt-4 lg:mt-6 mb-3">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <CalendarWithTasks
              className="rounded-md border"
              // @ts-expect-error: Fix this
              tasks={(data as ProjectWithTasks).tasks.map((task) => ({
                ...task,
                due_date: task.due_date.toString(),
              }))}
            />
          </div>
        </CardContent>
      </Card>

      <TaskStatistics
        // @ts-expect-error: Fix this
        tasks={(data as ProjectWithTasks).tasks}
      />
    </>
  );
};

export default Project;
