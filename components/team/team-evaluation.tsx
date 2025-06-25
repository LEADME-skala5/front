'use client';

import { useState, useMemo } from 'react';
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
}

interface TeamEvaluationProps {
  teamMembers: TeamMember[]; // props로 팀 멤버 데이터 받기
}

type SortMode = 'alphabetical' | 'role';

export function TeamEvaluation({ teamMembers: initialTeamMembers }: TeamEvaluationProps) {
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>('alphabetical');

  // 1. props로 전달된 initialTeamMembers 사용
  // 2. useMemo로 정렬된 팀원 목록 계산
  const sortedTeamMembers = useMemo(() => {
    return [...initialTeamMembers].sort((a, b) => {
      if (sortMode === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else {
        return a.role.localeCompare(b.role);
      }
    });
  }, [initialTeamMembers, sortMode]);

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

  // 3. 통계 데이터 계산 (실제 데이터 기반)
  const totalMembers = initialTeamMembers.length;
  const uniqueProjects = new Set(initialTeamMembers.flatMap((m) => m.projects)).size;

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
          <Select value={sortMode} onValueChange={(value: SortMode) => setSortMode(value)}>
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
                <p className="text-2xl font-bold text-primary">{totalMembers}</p>
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
                <p className="text-2xl font-bold text-blue-600">{uniqueProjects}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedTeamMembers.map((member) => (
          <Card
            key={member.id}
            className="border-primary/20 hover:border-primary/40 transition-all duration-200 hover:shadow-lg"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    {/* <AvatarImage src={member.avatar || '/placeholder.svg'} /> */}
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
