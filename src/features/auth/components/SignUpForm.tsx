"use client";

import { useState } from "react";
import InputFormControl from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpSchema, signupType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
const SignUpForm = () => {
  const form = useForm<signupType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const onSubmit = async (formData: signupType) => {
    setIsExecuting(true);
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.username,
      },
      {
        onSuccess: async () => {
          await authClient.sendVerificationEmail({
            email: formData.email,
            callbackURL: "/",
          });
          toast.success(
            "Account created successfully,Verification Email is sent to your email address"
          );
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
    setIsExecuting(false);
  };
  return (
    <Form {...form}>
      <form
        className="w-full space-y-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
          <InputFormControl label="Username" name="username" />
          <InputFormControl label="Password" name="password" type="password" />
          <div className="flex justify-end">
            <Link
              href={"/auth/login"}
              className="w-full text-sm text-blue-600 hover:underline underline-offset-2 text-right"
            >
              {"Login to account"}
            </Link>
          </div>

          <Button
            disabled={isExecuting}
            className="bg-blue-600 text-white w-full"
          >
            {isExecuting ? "pending..." : "Signup"}
          </Button>
        </FormProvider>
      </form>
    </Form>
  );
};

export default SignUpForm;
