'use client';

import {
  Home,
  FileText,
  Settings,
  BarChart3,
  TrendingUp,
  ClipboardCheck,
  Users,
  UserCheck,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '@/public/logo.png';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: '대시보드',
    url: '/dashboard',
    icon: Home,
    requiresTeamLead: false,
  },
  {
    title: '위클리 리포트',
    url: '/reports',
    icon: FileText,
    requiresTeamLead: false,
  },
  {
    title: '성과관리 결과',
    url: '/performance',
    icon: TrendingUp,
    requiresTeamLead: false,
  },
  {
    title: '성과관리 기준 설정',
    url: '/evaluation/setup',
    icon: ClipboardCheck,
    requiresTeamLead: true,
  },
  {
    title: '팀원 전체 보기',
    url: '/team/overview',
    icon: UserCheck,
    requiresTeamLead: true,
  },
  {
    title: '동료 평가',
    url: '/evaluation/peer',
    icon: Users,
    requiresTeamLead: false,
  },
  {
    title: '설정',
    url: '/settings',
    icon: Settings,
    requiresTeamLead: false,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isTeamLead, setIsTeamLead] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'member';
    setIsTeamLead(userRole === 'teamlead');
  }, []);

  const isActiveRoute = (url: string) => {
    const mainPath = pathname.split('?')[0];
    return mainPath === url;
  };

  const visibleMenuItems = menuItems.filter((item) => !item.requiresTeamLead || isTeamLead);

  return (
    <Sidebar className="border-r border-primary/20 bg-white">
      <SidebarHeader className="bg-white">
        <div className="flex items-center gap-2 px-2 py-2 ">
          <Image src={logo} alt="로고" width={50} height={50} />
          <span className="font-semibold">목록</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    className={
                      isActiveRoute(item.url)
                        ? 'bg-secondary text-white'
                        : 'hover:text-secondary text-black '
                    }
                  >
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
