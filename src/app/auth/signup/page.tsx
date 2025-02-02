import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/features/auth/components/SignUpForm";

const SignUp = () => {
  return (
    <Card className="w-[90%] md:w-[70%] lg:w-[50%] dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-blue-500 dark:text-blue-400">
          Signup
        </CardTitle>
      </CardHeader>
      <CardContent className="dark:text-slate-100">
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default SignUp;
