import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const Project = () => {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      project: "Project A",
      priority: "High",
      dueDate: "2025-02-05",
    },
    {
      id: 2,
      title: "Task 2",
      project: "Project B",
      priority: "Medium",
      dueDate: "2025-02-10",
    },
    {
      id: 3,
      title: "Task 3",
      project: "Project C",
      priority: "Low",
      dueDate: "2025-02-15",
    },
  ];
  return (
    <>
      {/* Task Management Section */}
      <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All Tasks
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">
                  Completed
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0"
                    >
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {task.project}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : task.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-sm">{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              {/* Add content for other tabs */}
            </Tabs>
          </CardContent>
        </Card>

        {/* Dashboard Section */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Task Completion</h3>
                <progress value={75} max={100} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  75% of tasks completed
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Upcoming Deadlines</h3>
                <ul className="list-disc list-inside">
                  <li>Task 2 - Due in 3 days</li>
                  <li>Task 3 - Due in 8 days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Widget */}
      <Card className="mt-4 lg:mt-6">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar className="rounded-md border" />
          </div>
        </CardContent>
      </Card>

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
    </>
  );
};

export default Project;
