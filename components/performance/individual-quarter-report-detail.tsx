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
  Info,
  Target,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

import * as Tooltip from '@radix-ui/react-tooltip';

interface IndividualQuarterReportDetailProps {
  reportData: any;
}

export function IndividualQuarterReportDetail({ reportData }: IndividualQuarterReportDetailProps) {
  const router = useRouter();

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
                {getInitials(reportData.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900">{reportData.title}</CardTitle>
              <span>{reportData.user.name}</span>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{reportData.user.department}</span>

                <span>
                  {reportData.startDate} ~ {reportData.endDate}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2 justify-end">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {reportData.finalScore.toFixed(1)}
                </span>
                <span className="text-gray-500">/5.0</span>
              </div>
              {/* <p className="text-sm text-gray-600">분기 점수</p> */}
              <p className="text-black font-bold leading-relaxed mb-2">{reportData.compareText}</p>
              <div className="flex mt-2 justify-end">
                {/* 직무 순위 */}
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2 justify-end">
                    <span>
                      {reportData.rank.job_name} 중{' '}
                      <span className="text-primary font-bold text-base">
                        {reportData.rank.same_job_rank}등
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-end ml-2">
                    <span>
                      {reportData.user.department} 중{' '}
                      <span className="text-primary font-bold text-base">
                        {reportData.rank.organization_rank}등
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Team Goals */}
      <Tooltip.Provider>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              업무 수행 내역
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.teamGoals.map((goal: any, index: number) => (
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

                  <div className="text-sm text-gray-600 space-y-2 mt-2">
                    {goal.contents && goal.contents.length > 0 ? (
                      <ul className="space-y-3">
                        {goal.contents.map((item: any, itemIndex: number) => (
                          <li key={itemIndex}>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="font-medium text-gray-600">{item.description}</span>

                              {item.reference?.length > 0 && (
                                <Tooltip.Root>
                                  <Tooltip.Trigger asChild>
                                    <button
                                      type="button"
                                      className="ml-1 mt-[2px] text-gray-400 hover:text-primary"
                                    >
                                      <Info className="w-4 h-4" />
                                    </button>
                                  </Tooltip.Trigger>

                                  <Tooltip.Content
                                    className="bg-white p-3 rounded-md shadow-lg border text-sm text-left w-72 z-50 animate-fade-in transition-opacity duration-300 ease-out"
                                    side="bottom"
                                    align="start"
                                    sideOffset={5}
                                  >
                                    <ul className="space-y-2">
                                      {item.reference.map((ref: any, refIndex: number) => (
                                        <li key={refIndex}>
                                          <div className="font-semibold text-gray-900">
                                            {ref.label}
                                          </div>
                                          <div className="text-gray-600">{ref.excerpt}</div>
                                        </li>
                                      ))}
                                    </ul>
                                    <Tooltip.Arrow className="fill-white" />
                                  </Tooltip.Content>
                                </Tooltip.Root>
                              )}
                            </div>
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
      </Tooltip.Provider>

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
            {reportData.keyAchievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Performance Summary */}
      {reportData.quarterlyPerformanceSummary && (
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
                  {reportData.quarterlyPerformanceSummary.summaryText}
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
          {reportData.peerFeedback.map((feedback: any, index: number) => {
            if (feedback.type === 'summary') {
              return (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mt-5 mb-2">피드백 요약</h4>
                  <p className="text-gray-700 whitespace-pre-line">{feedback.text}</p>
                </div>
              );
            }

            return (
              <div key={index}>
                <h4 className="font-medium text-gray-900 mt-5 mb-2 capitalize">
                  {feedback.type === 'positive' ? '강점' : '보완할 점'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(feedback.type === 'positive'
                    ? feedback.keywords
                    : feedback.keywords?.slice(0, Math.ceil(feedback.keywords.length / 2)) || []
                  ).map((keyword: any, keyIndex: number) => (
                    <Badge
                      key={keyIndex}
                      variant="secondary"
                      className={`pdf-badge ${
                        feedback.type === 'positive'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      }`}
                    >
                      {keyword.keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Work Attitude & Growth Suggestions */}
      <div className="grid grid-cols-1 gap-6">
        {reportData.workAttitude && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                업무실행 및 태도
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.workAttitude.map((attitude: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{attitude}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Final Comments */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            총평 및 성장 방향
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
