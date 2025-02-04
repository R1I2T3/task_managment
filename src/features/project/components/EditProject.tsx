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
import { useUpdateProject } from "../hooks";
import { ProjectType } from "../type";
import { ProjectUpdateType, ProjectUpdateSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
const EditProject = ({ name, description, id }: ProjectType) => {
  console.log(name, description, id);
  const form = useForm<ProjectUpdateType>({
    resolver: zodResolver(ProjectUpdateSchema),
    defaultValues: {
      name,
      description,
    },
  });
  const { mutateAsync, isPending } = useUpdateProject(id);
  const editProject = async (values: ProjectUpdateType) => {
    await mutateAsync(values);
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
            onSubmit={form.handleSubmit(editProject)}
            className="flex flex-col gap-3"
          >
            <InputFormControl label="Enter Project title" name="name" />
            <InputFormControl
              label="Enter Project Description"
              name="description"
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

export default EditProject;
