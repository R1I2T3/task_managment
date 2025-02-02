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
import { CheckCircle, BarChart2, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const SideBar = () => {
  const projects = [
    { id: 1, name: "Project A" },
    { id: 2, name: "Project B" },
    { id: 3, name: "Project C" },
  ];
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
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem
                  key={project.id}
                  onClick={() => router.push(`/dashboard/${project.id}`)}
                >
                  <SidebarMenuButton>{project.name}</SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {projects.length < 5 && (
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            )}
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
