'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCheck, Briefcase, Star } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  projects: string[];
  avatar?: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: '김민수',
    role: 'Senior Developer',
    email: 'kim.minsu@company.com',
    projects: ['Project Alpha', 'API Integration'],
  },
  {
    id: '2',
    name: '이지영',
    role: 'UI/UX Designer',
    email: 'lee.jiyoung@company.com',
    projects: ['Project Alpha', 'Dashboard UI'],
  },
  {
    id: '3',
    name: '박준호',
    role: 'Backend Developer',
    email: 'park.junho@company.com',
    projects: ['Project Beta', 'API Integration'],
  },
  {
    id: '4',
    name: '최수진',
    role: 'Product Manager',
    email: 'choi.sujin@company.com',
    projects: ['Project Alpha', 'Dashboard UI'],
  },
  {
    id: '5',
    name: '정현우',
    role: 'Frontend Developer',
    email: 'jung.hyunwoo@company.com',
    projects: ['Dashboard UI'],
  },
  {
    id: '6',
    name: '한소영',
    role: 'QA Engineer',
    email: 'han.soyoung@company.com',
    projects: ['Project Alpha', 'Project Beta'],
  },
];

type SortMode = 'alphabetical' | 'role';

export function TeamEvaluation() {
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>('alphabetical');
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);

  const sortTeamMembers = (mode: SortMode) => {
    const sorted = [...mockTeamMembers].sort((a, b) => {
      if (mode === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else {
        return a.role.localeCompare(b.role);
      }
    });
    setTeamMembers(sorted);
    setSortMode(mode);
  };

  const handleQualitativeEvaluation = (memberId: string) => {
    router.push(`/team/member/${memberId}/evaluate`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <UserCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">팀원 평가하기</h1>
            <p className="text-gray-600">팀원들의 정성평가를 진행할 수 있는 페이지입니다</p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">정렬:</span>
          <Select value={sortMode} onValueChange={(value: SortMode) => sortTeamMembers(value)}>
            <SelectTrigger className="w-48 border-primary/20 focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabetical">가나다순</SelectItem>
              <SelectItem value="role">역할별</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">평가 대상 팀원</p>
                <p className="text-2xl font-bold text-primary">{teamMembers.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">평가 진행률</p>
                <p className="text-2xl font-bold text-orange-600">0%</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">진행 중인 프로젝트</p>
                <p className="text-2xl font-bold text-blue-600">
                  {new Set(teamMembers.flatMap((m) => m.projects)).size}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            className="border-primary/20 hover:border-primary/40 transition-all duration-200 hover:shadow-lg"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={member.avatar || '/placeholder.svg'} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-gray-900">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleQualitativeEvaluation(member.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  정성평가하기
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Projects */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">현재 진행 중인 프로젝트</p>
                <div className="flex flex-wrap gap-2">
                  {member.projects.map((project, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200"
                    >
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
