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
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{reportData.employee.department}</span>
                <span>
                  {reportData.employee.startDate} ~ {reportData.employee.endDate}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Team Goals Achievement */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />팀 목표 달성도
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.teamGoals.map((goal: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{goal.goalName}</h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        goal.comparison === '우수'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : goal.comparison === '상위권'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      }`}
                    >
                      {goal.achievement} ({goal.comparison})
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {Array.isArray(goal.content) ? (
                    goal.content.length > 0 ? (
                      <ul className="space-y-1">
                        {goal.content.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )
                  ) : (
                    <span>{goal.content}</span>
                  )}
                </div>
                {goal.teamAvg && (
                  <div className="mt-2 text-xs text-gray-500">팀 평균: {goal.teamAvg}</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Team Achievements */}
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
      </Card>

      {/* Member Analysis */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            팀원별 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.memberAnalysis.map((member: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.mainAchievement}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {member.overallRank}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{member.valueDetails}</p>
                <div className="flex flex-wrap gap-1">
                  {member.peerKeywords.map((keyword: string, keywordIndex: number) => (
                    <Badge
                      key={keywordIndex}
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-800"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contribution Criteria */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            기여도 평가 기준
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportData.contributionCriteria.evaluationBasis.map(
              (criteria: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{criteria}</p>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* HR Suggestions & Org Recommendations */}
      <div className="grid grid-cols-1 gap-6">
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
                  <h4 className="font-medium text-gray-900 mb-1">{suggestion.target}</h4>
                  <p className="text-sm text-gray-700">{suggestion.recommendation}</p>
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
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">개선 키워드:</span>{' '}
                {reportData.orgSuggestions.suggestion}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">권장 액션:</span> {reportData.orgSuggestions.action}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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
