"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserCheck,
  Eye,
  Star,
  Briefcase,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  projects: string[];
  performanceScore: number;
  lastEvaluationDate: string;
  avatar?: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "김민수",
    role: "Senior Developer",
    email: "kim.minsu@company.com",
    projects: ["Project Alpha", "API Integration"],
    performanceScore: 4.5,
    lastEvaluationDate: "2024-01-15",
  },
  {
    id: "2",
    name: "이지영",
    role: "UI/UX Designer",
    email: "lee.jiyoung@company.com",
    projects: ["Project Alpha", "Dashboard UI"],
    performanceScore: 4.8,
    lastEvaluationDate: "2024-01-12",
  },
  {
    id: "3",
    name: "박준호",
    role: "Backend Developer",
    email: "park.junho@company.com",
    projects: ["Project Beta", "API Integration"],
    performanceScore: 4.2,
    lastEvaluationDate: "2024-01-10",
  },
  {
    id: "4",
    name: "최수진",
    role: "Product Manager",
    email: "choi.sujin@company.com",
    projects: ["Project Alpha", "Dashboard UI"],
    performanceScore: 4.6,
    lastEvaluationDate: "2024-01-08",
  },
  {
    id: "5",
    name: "정현우",
    role: "Frontend Developer",
    email: "jung.hyunwoo@company.com",
    projects: ["Dashboard UI"],
    performanceScore: 3.9,
    lastEvaluationDate: "2024-01-05",
  },
  {
    id: "6",
    name: "한소영",
    role: "QA Engineer",
    email: "han.soyoung@company.com",
    projects: ["Project Alpha", "Project Beta"],
    performanceScore: 4.3,
    lastEvaluationDate: "2024-01-03",
  },
];

type SortMode = "alphabetical" | "performance";

export function TeamOverview() {
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>("alphabetical");
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);

  const sortTeamMembers = (mode: SortMode) => {
    const sorted = [...mockTeamMembers].sort((a, b) => {
      if (mode === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else {
        return b.performanceScore - a.performanceScore;
      }
    });
    setTeamMembers(sorted);
    setSortMode(mode);
  };

  const handleViewReport = (memberId: string) => {
    // Navigate to individual member report
    router.push(`/team/member/${memberId}`);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-primary";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 4.5) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 4.0) return <Star className="h-4 w-4 text-primary" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
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
            <h1 className="text-3xl font-bold text-gray-900">팀원 전체보기</h1>
            <p className="text-gray-600">
              팀원 전체의 성과 관리 리포트를 볼 수 있는 페이지입니다
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">정렬:</span>
          <Select
            value={sortMode}
            onValueChange={(value: SortMode) => sortTeamMembers(value)}
          >
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
                <p className="text-2xl font-bold text-primary">
                  {teamMembers.length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  점수가 오른 팀원
                </p>
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
                    teamMembers.reduce(
                      (sum, m) => sum + m.performanceScore,
                      0
                    ) / teamMembers.length
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
                <p className="text-sm font-medium text-gray-600">
                  현재 진행 중인 프로젝트 수
                </p>
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
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-gray-900">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewReport(member.id)}
                  className="border-primary/30 text-primary hover:bg-primary hover:text-white"
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
                  <span className="text-sm font-medium text-gray-700">
                    이번 분기 점수
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${getPerformanceColor(
                      member.performanceScore
                    )}`}
                  >
                    {member.performanceScore.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">/5.0</span>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  현재 진행 중인 프로젝트
                </p>
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
                  최근 업데이트 일:{" "}
                  {new Date(member.lastEvaluationDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
