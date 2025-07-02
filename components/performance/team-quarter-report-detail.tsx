'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Download,
  Share,
  TrendingUp,
  Target,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Award,
  Star,
} from 'lucide-react';

interface TeamQuarterReportDetailProps {
  reportData: any;
}

export function TeamQuarterReportDetail({ reportData }: TeamQuarterReportDetailProps) {
  const router = useRouter();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/performance')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          이전 페이지
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            공유
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            다운로드
          </Button>
        </div>
      </div>
      {/* Report Header */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                <Users className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900">{reportData.title}</CardTitle>
              <span>{reportData.user.name} 팀장님</span>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{reportData.user.department}</span>
                <span>
                  {reportData.startDate} ~ {reportData.endDate}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Team Goals Achievement*/}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />팀 목표 달성도
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.teamGoals.map((goal: any, index: number) => (
              <div key={index} className="p-4 bg-primary/5 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{goal.goalName}</h4>
                  <Badge
                    variant="outline"
                    className={` text-sm mr-5 ${
                      goal.grade === 'A'
                        ? 'bg-green-100 text-green-800 border-green-300'
                        : goal.grade === 'B'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                  >
                    {goal.grade}
                  </Badge>
                </div>

                <div className="text-sm text-gray-600">
                  {Array.isArray(goal.content) && goal.content.length > 0 ? (
                    <ul className="space-y-1">
                      {goal.content.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-neutral-700 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Team Achievements
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            주요 팀 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportData.keyAchievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Member Analysis */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            팀원별 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 rounded-lg font-medium text-sm text-gray-700 border-b">
              <div className="col-span-1 text-center">순위</div>
              <div className="col-span-2">이름</div>
              <div className="col-span-3">직무</div>
              <div className="col-span-4">주요 키워드</div>
              <div className="col-span-2 text-center">직군별 상위</div>
            </div>

            {/* Member Rows */}
            {reportData.memberAnalysis.map((member: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 p-3 hover:bg-gray-50 rounded-lg border-b border-gray-100 transition-colors"
              >
                <div className="col-span-1 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold">
                    {member.rank}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 flex items-center gap-1">
                      {member.name}(
                      <Star className="h-3 w-3 text-primary" />
                      <span>{member.score.toFixed(2)}</span>)
                    </span>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm text-gray-900">{member.role}</div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-wrap gap-1">
                    {member.peerKeywords.map((keyword: string, keywordIndex: number) => (
                      <Badge
                        key={keywordIndex}
                        variant="secondary"
                        className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <Badge
                    variant="outline"
                    className={`${
                      member.overallRank.includes('5%') || member.overallRank.includes('10%')
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : member.overallRank.includes('15%') || member.overallRank.includes('20%')
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {member.overallRank}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            HR 제안사항
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.hrSuggestions.map((suggestion: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm text-black">
                  <strong>{suggestion.target}</strong>: {suggestion.recommendation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            조직 차원 권고사항
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportData.orgSuggestions && (
              <CardContent>
                <p className="text-gray-700"> {reportData.orgSuggestions.suggestion}</p>
              </CardContent>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Final Comments */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            종합 평가
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {reportData.finalComment}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
