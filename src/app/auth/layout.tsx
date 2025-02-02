import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen  bg-background flex flex-col ">
      <div className="flex justify-end my-3 mr-3">
        <ModeToggle />
      </div>
      <div className="flex-grow flex justify-center items-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
