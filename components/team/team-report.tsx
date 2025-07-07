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
import { UserCheck, Eye, Star, Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  projects: string[];
  performanceScore: number;
  lastEvaluationDate: string;
  recentReportId: string;
}

interface TeamReportProps {
  teamMembers: TeamMember[];
}

type SortMode = 'alphabetical' | 'performance';

export function TeamReport({ teamMembers }: TeamReportProps) {
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>('performance');

  // 2. useMemo로 정렬된 팀원 목록 계산
  const sortedTeamMembers = useMemo(() => {
    return [...teamMembers].sort((a, b) => {
      if (sortMode === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else {
        return b.performanceScore - a.performanceScore;
      }
    });
  }, [teamMembers, sortMode]);

  // 3. 통계 데이터 계산
  const totalMembers = teamMembers.length;
  const highPerformers = teamMembers.filter((m) => m.performanceScore >= 4.5).length;
  const averageScore =
    teamMembers.length > 0
      ? (teamMembers.reduce((sum, m) => sum + m.performanceScore, 0) / teamMembers.length).toFixed(
          1
        )
      : '0.0';
  const uniqueProjects = new Set(teamMembers.flatMap((m) => m.projects)).size;

  const handleViewReport = (reportId: string) => {
    console.log(reportId);
    router.push(`/performance/reports/${reportId}`);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-primary';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 4.5) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 4.0) return <Star className="h-4 w-4 text-primary" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
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
            <h1 className="text-3xl font-bold text-gray-900">팀원 리포트 보기</h1>
            <p className="text-gray-600">팀원 전체의 성과 관리 리포트를 볼 수 있는 페이지입니다</p>
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
              <SelectItem value="performance">점수 높은 순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 팀원 수</p>
                <p className="text-2xl font-bold text-primary">{teamMembers.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">점수가 오른 팀원</p>
                <p className="text-2xl font-bold text-green-600">
                  {teamMembers.filter((m) => m.performanceScore >= 4.5).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">평균 점수</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(
                    teamMembers.reduce((sum, m) => sum + m.performanceScore, 0) / teamMembers.length
                  ).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">현재 진행 중인 프로젝트 수</p>
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
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('버튼 클릭 - reportId:', member.recentReportId);
                    handleViewReport(member.recentReportId);
                  }}
                  className="border-primary/30 text-primary hover:bg-primary hover:text-white bg-white"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  리포트 보기
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Performance Score */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getPerformanceIcon(member.performanceScore)}
                  <span className="text-sm font-medium text-gray-700">이번 분기 점수</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${getPerformanceColor(member.performanceScore)}`}
                  >
                    {member.performanceScore.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">/5.0</span>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">현재 진행 중인 프로젝트</p>
                <div className="flex flex-wrap gap-2">
                  {member.projects.map((project, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                    >
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Evaluation */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  최근 업데이트 일: {new Date(member.lastEvaluationDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
