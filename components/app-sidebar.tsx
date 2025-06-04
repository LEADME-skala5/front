"use client";

import {
  Home,
  FileText,
  Settings,
  BarChart3,
  TrendingUp,
  ClipboardCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    requiresTeamLead: false,
  },
  {
    title: "Report Archive",
    url: "/reports",
    icon: FileText,
    requiresTeamLead: false,
  },
  {
    title: "Performance Management",
    url: "/performance",
    icon: TrendingUp,
    requiresTeamLead: false,
  },
  {
    title: "성과관리 기준 설정",
    url: "/evaluation/setup",
    icon: ClipboardCheck,
    requiresTeamLead: true,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    requiresTeamLead: false,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isTeamLead, setIsTeamLead] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "member";
    setIsTeamLead(userRole === "teamlead");
  }, []);

  const isActiveRoute = (url: string) => {
    const mainPath = pathname.split("?")[0];
    return mainPath === url;
  };

  const visibleMenuItems = menuItems.filter(
    (item) => !item.requiresTeamLead || isTeamLead
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <BarChart3 className="h-6 w-6" />
          <span className="font-semibold">WorkFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActiveRoute(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
