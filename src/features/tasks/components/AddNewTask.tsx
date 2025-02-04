"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { createTaskSchema, createTaskType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputFormControl from "@/components/Input";
import { useParams } from "next/navigation";
import SelectFormControl from "@/components/Select";
const AddNewTask = () => {
  const { project } = useParams();
  const form = useForm<createTaskType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "low",
      status: "todo",
      projectId: project as string,
    },
  });
  const addTask = async () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <PlusCircle /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogDescription className="hidden">
          This modal will be used for adding new Task
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addTask)}
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
            <Button type="submit">Add Task</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTask;
