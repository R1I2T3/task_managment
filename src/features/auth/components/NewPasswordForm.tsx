"use client";

import { useState } from "react";
import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputFormControl from "@/components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema, NewPasswordType } from "../schema";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
const NewPasswordForm = () => {
  const form = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const onSubmit = async (formData: NewPasswordType) => {
    if (formData.new_password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    if (!searchParams.has("token")) {
      toast.error("Invalid Token");
      return;
    }
    setIsExecuting(true);
    const token = searchParams.get("token");
    try {
      await authClient.resetPassword({
        newPassword: formData.new_password,
        token: token || "",
      });
      router.replace("/auth/login");
      toast.success("Password reset successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
    } finally {
      setIsExecuting(false);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl
            label="New Password"
            name="new_password"
            type="password"
          />
          <InputFormControl
            label="Confirm Password"
            name="confirm_password"
            type="password"
          />
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
