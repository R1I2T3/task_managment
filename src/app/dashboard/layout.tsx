"use client";
import SideBar from "@/features/project/components/sidebar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import AddNewTask from "@/features/tasks/components/AddNewTask";
import { usePathname } from "next/navigation";
const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <SidebarTrigger className="lg:hidden">
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
              Dashboard
            </h1>
            {pathname !== "/dashboard" && <AddNewTask />}
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
