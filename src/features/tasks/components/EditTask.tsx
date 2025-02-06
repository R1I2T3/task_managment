import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import InputFormControl from "@/components/Input";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema, updateTaskType } from "../schema";
import SelectFormControl from "@/components/Select";
import { useUpdateTask } from "../hooks";
import { tasksType } from "../type";
const EditTask = ({ task }: { task: tasksType }) => {
  const form = useForm<updateTaskType>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.due_date,
      priority: task.priority,
      status: task.status,
    },
  });
  const { mutateAsync, isPending } = useUpdateTask(task.id);
  const editTask = async () => {
    try {
      await mutateAsync(form.getValues());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Project Details</DialogTitle>
        <DialogDescription className="hidden">
          This is Modal for adding Project
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editTask)}
            className="flex flex-col gap-3"
          >
            <InputFormControl label="Title" name="title" />
            <InputFormControl label="Description" name="description" />
            <InputFormControl label="Due Date" name="dueDate" type="date" />
            <SelectFormControl
              options={["low", "medium", "high", "urgent"]}
              name="priority"
              label="Select priority of task"
              placeholder="Select priority"
            />
            <SelectFormControl
              options={["todo", "in_progress", "done"]}
              name="status"
              label="Select status of task"
              placeholder="Select status"
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Editing..." : "Edit Project"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
