"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputFormControl from "@/components/Input";
import Link from "next/link";
const LoginForm = () => {
  const form = useForm();
  const onSubmit = async () => {};
  const isExecuting = false;
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
          <InputFormControl label="Password" name="password" type="password" />
          <div className="flex justify-between items-center">
            <Link
              href={"/auth/forgot-password"}
              className="text-sm hover:text-blue-500 hover:underline underline-offset-2"
            >
              {"Forgot password"}
            </Link>
            <Link
              href={"/auth/signup"}
              className="text-sm hover:text-blue-500 hover:underline underline-offset-2"
            >
              {"Create a account"}
            </Link>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl">
            {isExecuting ? "Login..." : "Login"}
          </Button>
        </FormProvider>
      </form>
    </Form>
  );
};

export default LoginForm;
