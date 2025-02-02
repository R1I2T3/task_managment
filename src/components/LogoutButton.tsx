"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
const LogoutButton = () => {
  const handleLogout = async () => {
    await authClient.signOut();
  };
  return (
    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-lg font-semibold"
      onClick={handleLogout}
    >
      <LogOut className="h-6 w-6" />
    </Button>
  );
};

export default LogoutButton;
