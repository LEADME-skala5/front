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
            팀원별 분석 (40명)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 rounded-lg font-medium text-sm text-gray-700 border-b">
              <div className="col-span-1 text-center">순위</div>
              <div className="col-span-2">이름</div>
              <div className="col-span-4">직무</div>
              <div className="col-span-3">주요 키워드</div>
              <div className="col-span-2 text-center">직군별 상위</div>
            </div>

            {/* Member Rows */}
            {Array.from({ length: 40 }, (_, index) => {
              const rank = index + 1;
              const sampleNames = [
                '김민수',
                '이영희',
                '박준호',
                '최서연',
                '정우진',
                '한소영',
                '오태현',
                '임지은',
                '강동훈',
                '윤미래',
                '조현우',
                '신예린',
                '배성호',
                '문지혜',
                '서준영',
                '홍수빈',
                '노승현',
                '권민정',
                '황재석',
                '송다은',
                '안준혁',
                '유채원',
                '장민기',
                '전소희',
                '고영수',
                '남지원',
                '도현석',
                '류미경',
                '마준서',
                '방예진',
                '사지훈',
                '아름다',
                '자현우',
                '차민영',
                '카준호',
                '타소연',
                '파영진',
                '하준수',
                '갑민정',
                '을지은',
              ];

              const sampleKeywords = [
                ['리더십', '협업', '문제해결'],
                ['창의성', '소통', '전문성'],
                ['책임감', '적극성', '신뢰성'],
                ['분석력', '효율성', '성실함'],
                ['혁신', '팀워크', '목표달성'],
                ['책임감', '실행력', '멘토링'],
                ['고객지향', '품질관리', '개선'],
                ['기술력', '학습능력', '협조'],
              ];

              const percentiles = [
                '상위 5%',
                '상위 10%',
                '상위 15%',
                '상위 20%',
                '상위 25%',
                '상위 30%',
              ];

              const name = sampleNames[index] || `팀원${rank}`;
              const keywords = sampleKeywords[index % sampleKeywords.length];
              const percentile = percentiles[Math.floor(index / 7) % percentiles.length];

              return (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 p-3 hover:bg-gray-50 rounded-lg border-b border-gray-100 transition-colors"
                >
                  <div className="col-span-1 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        rank <= 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : rank <= 10
                            ? 'bg-green-100 text-green-800'
                            : rank <= 20
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {rank}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{name} (4.5)</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">SLA 100% 달성, 신규 운영 노팅</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex flex-wrap gap-1">
                      {keywords.map((keyword: string, keywordIndex: number) => (
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
                        percentile.includes('5%') || percentile.includes('10%')
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : percentile.includes('15%') || percentile.includes('20%')
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {percentile}
                    </Badge>
                  </div>
                </div>
              );
            })}
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
