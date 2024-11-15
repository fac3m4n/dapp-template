"use client";

import * as React from "react";
import {
  BookOpen,
  GalleryVerticalEnd,
  Home,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Docs",
      url: "#",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex justify-center items-center text-sm text-muted-foreground">
        Sidebar Footer
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
