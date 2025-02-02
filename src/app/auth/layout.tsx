import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
