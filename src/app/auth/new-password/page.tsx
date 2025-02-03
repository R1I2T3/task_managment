import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPasswordForm from "@/features/auth/components/NewPasswordForm";
import { Suspense } from "react";
const NewPasswordPage = () => {
  return (
    <Suspense>
      <Card className="w-[90%] md:w-[70%] lg:w-[50%]">
        <CardHeader>
          <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-blue-500 dark:text-blue-600">
            Forgot password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default NewPasswordPage;
