"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { CheckCircle, BarChart2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Project from "./Projects";
import AddProject from "./AddProject";
const SideBar = () => {
  const router = useRouter();
  return (
    <Sidebar className="lg:w-64 ">
      <SidebarHeader className="p-4 flex justify-between items-center dark:bg-background">
        <Link href="/" className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6" />
          <span className="text-lg font-bold ">TaskMaster</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        {/* Stats Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/dashboard")}>
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Statistics
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <Project />
            <AddProject />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter className="bg-background">
        <div className="flex justify-between items-center px-4 py-2">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
