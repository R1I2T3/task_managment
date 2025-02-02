"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputFormControl from "@/components/Input";
import Link from "next/link";
import { LoginSchema, LoginType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isExecuting, setIsExecuting] = useState(false);
  const onSubmit = async (formData: LoginType) => {
    setIsExecuting(true);
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            toast.error("Please verify your email address");
          }
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Login success");
          router.replace("/");
        },
      }
    );
    setIsExecuting(false);
  };
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
