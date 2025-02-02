import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
const ForgotPasswordPage = () => {
  return (
    <Card className="w-[90%] md:w-[70%] lg:w-[50%]">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-blue-500 dark:text-blue-600">
          Forgot password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
