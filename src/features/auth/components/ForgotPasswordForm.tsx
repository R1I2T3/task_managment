"use client";

import React from "react";
import InputFormControl from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
const ForgotPasswordForm = () => {
  const form = useForm();
  const onSubmit = async () => {};
  const isExecuting = false;
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
        </FormProvider>
        <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl">
          {isExecuting ? "Sending mail" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
