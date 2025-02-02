"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputFormControl from "@/components/Input";
const NewPasswordForm = () => {
  const form = useForm();
  const onSubmit = async () => {};
  const isExecuting = false;
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="New Password" name="new_password" />
          <InputFormControl label="Confirm Password" name="confirm_password" />
        </FormProvider>
        <Button
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl disabled:bg-blue-800"
          disabled={isExecuting}
        >
          {isExecuting ? "Resetting Password" : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
