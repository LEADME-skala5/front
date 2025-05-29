"use client"

import { Home, FileText, Settings, BarChart3, MessageCircle, TrendingUp, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Chat rooms data
const chatRooms = [
  { id: "general", name: "General Chat", url: "/chatbot?room=general" },
  { id: "productivity", name: "Productivity Tips", url: "/chatbot?room=productivity" },
  { id: "project-help", name: "Project Help", url: "/chatbot?room=project-help" },
  { id: "task-management", name: "Task Management", url: "/chatbot?room=task-management" },
]

// Main menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Report Archive",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Performance Management",
    url: "/performance",
    icon: TrendingUp,
  },
  {
    title: "Chatbot",
    url: "/chatbot",
    icon: MessageCircle,
    hasSubmenu: true,
    submenu: chatRooms,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Close dropdown when navigating to a different main page
  useEffect(() => {
    const mainPath = pathname.split("?")[0] // Remove query params
    const currentMainItem = menuItems.find((item) => item.url === mainPath)

    if (currentMainItem && !currentMainItem.hasSubmenu) {
      setOpenDropdown(null)
    } else if (mainPath === "/chatbot") {
      setOpenDropdown("Chatbot")
    }
  }, [pathname])

  const handleDropdownToggle = (itemTitle: string) => {
    setOpenDropdown(openDropdown === itemTitle ? null : itemTitle)
  }

  const isActiveRoute = (url: string) => {
    const mainPath = pathname.split("?")[0]
    return mainPath === url
  }

  const isActiveSubmenu = (submenuUrl: string) => {
    return pathname === submenuUrl || pathname.startsWith(submenuUrl)
  }

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
                  {item.hasSubmenu ? (
                    <Collapsible
                      open={openDropdown === item.title}
                      onOpenChange={() => handleDropdownToggle(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={isActiveRoute(item.url)}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.id}>
                              <SidebarMenuSubButton asChild isActive={isActiveSubmenu(subItem.url)}>
                                <Link href={subItem.url}>
                                  <span>{subItem.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActiveRoute(item.url)}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
