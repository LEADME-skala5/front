'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Download,
  Share,
  Star,
  TrendingUp,
  FileText,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

interface IndividualYearEndReportDetailProps {
  reportData: any;
}

export function IndividualYearEndReportDetail({ reportData }: IndividualYearEndReportDetailProps) {
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
                <span>{reportData.user.job}</span>
                <span>
                  {reportData.startDate} ~ {reportData.endDate}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {reportData.finalScore.toFixed(1)}
                </span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <p className="text-sm text-gray-600">연간 점수</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      {reportData.skValues && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              성과 평가
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.skValues.map((item: any, index: number) => (
                <div key={index}>
                  {item.category === '4P' && item.values ? (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.category}</h3>
                      {item.values.map((value: any, valueIndex: number) => (
                        <div
                          key={valueIndex}
                          className="p-4 bg-primary/5 rounded-lg border border-primary/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{value.category}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-primary" />
                              <span className="font-bold text-primary">
                                {value.score.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{value.summary}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.category}</h4>
                        {item.score && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-primary" />
                            <span className="font-bold text-primary">{item.score.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      {item.summary && <p className="text-sm text-gray-700">{item.summary}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quarterly Performance */}
      {reportData.quarterlyPerformance && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              분기별 업무 성과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.quarterlyPerformance.map((quarter: any, index: number) => (
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
            {reportData.peerFeedback.map((feedback: any, index: number) => (
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
            <div className="text-gray-700 leading-relaxed">
              {' '}
              <ReactMarkdown>{reportData.finalComment}</ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
