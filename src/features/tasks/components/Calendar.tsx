"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function CalendarWithTasks({ tasks }: { tasks: Task[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const taskDates = useMemo(() => {
    return tasks.map((task) => new Date(task.due_date));
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      format(new Date(task.due_date), "yyyy-MM-dd") ===
      format(date || new Date(), "yyyy-MM-dd")
  );

  return (
    <div className="flex  p-8 flex-col lg:flex-row gap-4">
      <div className="flex-1 mx-auto lg:mr-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow "
          modifiers={{ hasTask: taskDates }}
          modifiersStyles={{
            hasTask: {
              textDecoration: "underline",
              color: "var(--primary)",
              fontWeight: "bold",
            },
          }}
        />
      </div>
      <Card className="w-[80dvw] md:w-[400px] lg:w-[400px]">
        <CardHeader>
          <CardTitle>
            Tasks for {format(date || new Date(), "MMMM d, yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="mb-4 p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {task.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(task.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No tasks for this date
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
