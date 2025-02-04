import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ProjectCreationSchema, ProjectCreationType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormControl from "@/components/Input";
import { useCreateProject } from "../hooks";
const AddProject = () => {
  const { mutateAsync, isPending } = useCreateProject();
  const form = useForm<ProjectCreationType>({
    resolver: zodResolver(ProjectCreationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const addNewProject = async (values: ProjectCreationType) => {
    await mutateAsync(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogDescription className="hidden">
          This is Modal for adding Project
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addNewProject)}
            className="flex flex-col gap-3"
          >
            <InputFormControl label="Enter Project title" name="title" />
            <InputFormControl
              label="Enter Project Description"
              name="description"
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Project"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
