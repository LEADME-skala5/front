'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Download,
  Share,
  Star,
  TrendingUp,
  Target,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

interface PerformanceReportDetailProps {
  reportId: number;
}

// Updated reportData with modern content structure
const reportData: { [key: number]: any } = {
  1: {
    id: 1,
    type: 'year-end',
    title: '2023 Annual Performance Report',
    employee: {
      name: '박준호',
      department: 'Product Management',
      period: '2023-01-01 ~ 2023-12-31',
    },
    finalScore: 4.6,
    skValues: [
      {
        category: 'User Focus',
        score: 4.5,
        summary: 'Consistently demonstrates user-centered thinking across all initiatives',
      },
      {
        category: 'Passionate',
        score: 4.7,
        summary: 'Shows exceptional enthusiasm for product development and team success',
      },
      {
        category: 'Professional',
        score: 4.6,
        summary: 'Maintains high standards of expertise and continues skill development',
      },
      {
        category: 'Proactive',
        score: 4.8,
        summary: 'Takes initiative in identifying opportunities and addressing challenges',
      },
      {
        category: 'People',
        score: 4.4,
        summary: 'Builds strong relationships across teams and manages stakeholder expectations',
      },
    ],
    quarterlyPerformance: [
      {
        quarter: 'Q1',
        rating: '2nd',
        summary: 'Successfully launched new platform features with positive user feedback',
      },
      {
        quarter: 'Q2',
        rating: '3rd',
        summary: 'Led cross-functional initiative to improve system performance',
      },
      {
        quarter: 'Q3',
        rating: '1st',
        summary: 'Achieved 100% of quarterly OKRs with exceptional stakeholder satisfaction',
      },
      {
        quarter: 'Q4',
        rating: '2nd',
        summary: 'Completed annual strategy planning with clear execution roadmap',
      },
    ],
    keyAchievements: [
      'Led successful product strategy resulting in 25% user growth',
      'Implemented new development processes improving team efficiency by 30%',
      'Mentored 2 junior PMs and contributed to hiring 3 new team members',
    ],
    peerFeedback: [
      {
        type: 'positive',
        keywords: [
          'Strategic thinking',
          'Leadership',
          'Accountability',
          'Organization',
          'Communication',
        ],
      },
      {
        type: 'negative',
        keywords: ['Technical depth', 'Documentation thoroughness', 'Meeting efficiency'],
      },
    ],
    growthSuggestions: [
      'Enhance technical knowledge in key platform areas',
      'Develop more structured documentation processes',
      'Improve meeting facilitation and time management skills',
    ],
    finalComment:
      '박준호 has been a cornerstone of the Product Management team throughout 2023, consistently driving strategic initiatives and delivering exceptional results.',
  },
  2: {
    id: 2,
    type: '분기 리포트',
    title: '2024 4분기 성과 리포트',
    employee: {
      name: '김민철',
      department: '클라우드 개발 3팀',
      startDate: '2024-10-07',
      endDate: '2024-12-27',
    },
    finalScore: 4.5,
    teamGoals: [
      {
        goalName: 'Cloud Professional 업무 진행 통한 BR/UR 개선',
        assigned: '배정',
        content: [
          'Cloud Professional Service 비용절감 패키지 v1.0 개발',
          'BR/UR 개선 제안서 작성 및 팀 내 승인 완료',
        ],
        contributionCount: 2,
      },
      {
        goalName: 'CSP 파트너쉽 강화 통한 원가개선',
        assigned: '미배정',
        content: [],
        contributionCount: 0,
      },
      {
        goalName: 'Cloud 마케팅 및 홍보 통한 대외 Cloud 고객확보',
        assigned: '배정',
        content: [
          'Korea Cloud Summit 2024 부스 설계 및 준비 작업 완료',
          '현대중공업 대상 Manufacturing IoT와 Cloud 연계 Private 이벤트 기획',
        ],
        contributionCount: 2,
      },
      {
        goalName: '글로벌 사업 Tech-presales 진행',
        assigned: '미배정',
        content: [],
        contributionCount: 0,
      },
    ],
    keyAchievements: [
      '총 수행 활동: 9건 (목표 대비 평가)',
      '목표 참여도: 2/4개 목표 참여 (50% 커버리지)',
      'Cloud Professional 업무 진행 통한 BR/UR 개선: 4건',
      'Cloud 마케팅 및 홍보 통한 대외 cloud 고객확보: 5건',
    ],
    peerFeedback: [
      {
        type: 'positive',
        keywords: [
          '열정/몰입',
          '긍정에너지',
          '협업역량',
          '책임감',
          '회복탄력성',
          '문제해결력',
          '신뢰성',
        ],
      },
      {
        type: 'negative',
        keywords: ['감정 표현 부족', '감정조절 미흡', '이기적 태도'],
      },
    ],
    quarterlyPerformanceSummary: {
      summaryText:
        '김민철 매니저님은 2024-10-07 ~ 2024-12-27 기간 동안 총 12건의 활동을 수행하며 특히 Cloud Professional 업무와 Cloud 마케팅 및 홍보 분야에서 두드러진 성과를 보였습니다. Cloud Professional 서비스 비용절감 패키지 v1.0 개발 및 BR/UR 개선 제안서 작성을 통해 내부 프로세스 개선에 기여하였으며, 이는 4건의 활동을 통해 목표 달성에 중요한 역할을 하였습니다. 또한, Korea Cloud Summit 2024 부스 설계 및 현대중공업 대상 Private 이벤트 기획을 포함한 5건의 활동으로 고객 확보 및 리드 생성에 크게 기여하였습니다. 그러나 글로벌 사업 Tech-presales 및 CSP 파트너십 강화 분야에서는 활동이 없어 이 부분에 대한 개선이 필요합니다',
      compareText: '김민철 매니저님은 클라우드 직무자들 중 상위 30%에 위치하고 있습니다.',
    },
    workAttitude: [
      '고객 만족도와 타부서 협업 참여도 항목에서 상위 20% 이내의 성과를 보여주어, 고객 중심의 문제 해결력과 조직 내 협업 역량이 탁월함을 보여줍니다.',
      '고객피드백 반영, 자기계발계획 이행률, 사내 교육 참여도, 발표 주도 항목은 상위 21~40 % 이내에 해당하여, 고객 응대와 자기 발전, 조직 내 발표 역량이 안정적인 수준입니다.',
      '후배 / 신입 멘토링, 사내 행사 참여도, 커밋 수, 업무 채팅 수 항목 또한 상위 21~40 % 이내로, 조직 기여와 업무 몰입도에서 양호한 성과를 보입니다.',
      '출장 횟수, 오버타임 근무 시간, 자기평가 - 타인평가 일치도 항목 역시 상위 21~40 % 이내에 해당하여, 업무 실행력과 자기 인식의 일관성이 안정적입니다.',
    ],
    growthSuggestions: [
      '이번 분기 동안 Cloud Professional 업무와 Cloud 마케팅 및 홍보 활동에서 높은 성과를 보였습니다. 특히, Cloud Professional Service 비용절감 패키지 개발과 대규모 리드 확보를 통해 상위 20%의 성과를 보였으며, 이를 통해 고객 중심의 문제 해결력과 응대 역량에 탁월함을 입증하였습니다.',
      '그러나 글로벌 사업 Tech - presales와 CSP 파트너쉽 강화 관련 활동에는 주요 활동이 없었으며, 이 부분에 대한 개선이 필요해 보입니다.글로벌 시장 진출을 위한 활동을 강화하고, CSP 파트너쉽을 통한 원가 개선에 더욱 집중해보는 것이 도움이 될 수 있습니다.',
      '동료 피드백에서는 열정 / 몰입, 긍정에너지, 협업역량 등의 긍정적인 키워드가 언급되었으나, 감정 표현 부족, 감정조절 미흡, 이기적 태도 등의 보완 키워드도 확인되었습니다.이에 따라, 감정 표현을 조금 더 유연하게 전달하고, 협업 시 타인의 의견을 존중하는 태도를 보여주는 것이 도움이 될 수 있습니다.',
      '마지막으로, 자기평가 - 타인 평가 일치도 항목에서 상위 21~40 % 의 성과를 보였습니다.이를 통해 자기 인식과 타인의 평가 간 일치도가 양호한 수준임을 확인할 수 있으나, 이를 더욱 향상시키기 위해 자신의 업무 수행에 대한 평가를 주기적으로 점검하고, 필요한 경우 타인의 피드백을 적극적으로 수용해보는 것도 좋겠습니다.',
    ],
    finalComment:
      '김민철 매니저님은 이번 분기 동안 Cloud Professional 업무와 Cloud 마케팅 활동을 중심으로 높은 성과를 도출하였습니다.\n주요 업무로는 Cloud Professional Service 비용절감 패키지 개발, BR/UR 개선 제안서 작성, Cloud 자원최적화 Service 패키지 완성 등이 있었으며, 고객 만족도와 고객피드백 반영, 타부서 협업 참여도 등에서 상위 20%의 성과를 보였습니다.\n동료 피드백에서는 열정/몰입, 협업역량, 책임감 등의 키워드가 반복적으로 언급되어, 팀 내에서의 협업과 책임감 있는 업무 수행에서 강점을 드러냈습니다.\n이번 분기는 김민철님의 고객 중심적 접근과 철저한 시장 분석을 통한 목표 지향적 결과 도출이 돋보였던 시기로 평가할 수 있습니다.\n다만, CSP 파트너쉽 관련 활동 강화와 동료 피드백에서 언급된 감정 표현 부족, 협업능력 부족 등의 측면에서 추가적인 보완이 이루어진다면 향후 성과의 완성도를 더욱 높일 수 있을 것입니다.',
  },
};

export function PerformanceReportDetail({ reportId }: PerformanceReportDetailProps) {
  const router = useRouter();
  const report = reportData[reportId];

  if (!report) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">The requested performance report could not be found.</p>
        <Button onClick={() => router.push('/performance')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          이전
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

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
              <AvatarImage src="/.svg" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {getInitials(report.employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900">{report.title}</CardTitle>
              {/* <p className="text-lg text-gray-600">
                {report.employee.name} {report.employee.position}
              </p> */}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{report.employee.department}</span>
                <span>{report.employee.period}</span>
              </div>
              {/* <p className="text-sm text-gray-500 mt-1">Evaluator: {report.employee.evaluator}</p> */}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {report.finalScore.toFixed(1)}
                </span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <p className="text-sm text-gray-600">4분기 점수</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      {report.skValues && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              성과 평가
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {report.skValues.map((item: any, index: number) => (
                <div key={index} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{item.category}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">{item.score.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{item.summary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Final Comments */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            총평
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-black- font-bold leading-relaxed">
              {report.quarterlyPerformanceSummary.compareText}
            </p>
            <p className="text-gray-700 leading-relaxed">{report.finalComment}</p>
          </div>
        </CardContent>
      </Card>

      {/* Team Goals & Quarterly Performance */}
      <div className="grid grid-cols-1 gap-6">
        {report.teamGoals && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center w-full justify-start gap-2">
                <Target className="h-5 w-5 text-primary" />팀 목표 기여도
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.teamGoals.map((goal: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{goal.goalName}</h4>
                      <Badge
                        variant="default"
                        className={`${
                          goal.assigned.includes('미배정')
                            ? 'bg-gray-400 text-white pointer-events-none'
                            : 'hover:bg-primary/80 cursor-pointer'
                        }`}
                      >
                        {goal.assigned.includes('미배정')
                          ? goal.assigned
                          : `${goal.assigned} - ${goal.contributionCount}건`}
                      </Badge>
                    </div>
                    {/* Content 배열 형태로 처리 */}
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {report.quarterlyPerformance && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                분기별 업무 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.quarterlyPerformance.map((quarter: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{quarter.quarter}</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {quarter.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{quarter.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Achievements */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            주요 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.keyAchievements.map((assigned: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{assigned}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Performance Summary with compareText */}
      {report.quarterlyPerformanceSummary && report.quarterlyPerformanceSummary.summaryText && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              분기 종합 요약
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {report.quarterlyPerformanceSummary.summaryText}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Peer Feedback */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            동료평가 피드백
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.peerFeedback.map((feedback: any, index: number) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 mb-2 capitalize">
                  {feedback.type === 'positive' ? '강점' : '보완할 점'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {feedback.keywords.map((keyword: string, keyIndex: number) => (
                    <Badge
                      key={keyIndex}
                      variant="secondary"
                      className={
                        feedback.type === 'positive'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      }
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

      {/* Work Attitude & Growth Suggestions */}
      <div className="grid grid-cols-1 gap-6">
        {report.workAttitude && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                업무실행 및 태도
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.workAttitude.map((attitude: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{attitude}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              성장 방향
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.growthSuggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
