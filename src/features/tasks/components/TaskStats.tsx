"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
  project_id: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
};

type TaskStatisticsProps = {
  tasks: Task[];
};

export function TaskStatistics({ tasks }: TaskStatisticsProps) {
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const filteredTasks = tasks.filter(
    (task) =>
      (!priorityFilter || task.priority === priorityFilter) &&
      (!statusFilter || task.status === statusFilter)
  );

  const priorityData = [
    {
      name: "Low",
      value: filteredTasks.filter((t) => t.priority === "low").length,
    },
    {
      name: "Medium",
      value: filteredTasks.filter((t) => t.priority === "medium").length,
    },
    {
      name: "High",
      value: filteredTasks.filter((t) => t.priority === "high").length,
    },
  ];

  const statusData = [
    {
      name: "Todo",
      value: filteredTasks.filter((t) => t.status === "todo").length,
    },
    {
      name: "In Progress",
      value: filteredTasks.filter((t) => t.status === "in_progress").length,
    },
    {
      name: "Done",
      value: filteredTasks.filter((t) => t.status === "done").length,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select
            onValueChange={(value) =>
              setPriorityFilter(value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setStatusFilter(value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
