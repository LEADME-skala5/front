'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, Download } from 'lucide-react';

interface Report {
  id: string;
  type: string;
  evaluatedYear: number;
  evaluatedQuarter: number | null;
  createdAt: string;
  title: string;
  startDate: string;
  endDate: string;
  user: {
    userId: number;
    name: string;
    department: string;
  };
}

interface ReportsResponse {
  personalReports: Report[];
  teamReports: Report[];
}

interface PerformanceFeedbackListProps {
  selectedType: 'personal' | 'team';
  userId: number;
}

export function PerformanceFeedbackList({ selectedType, userId }: PerformanceFeedbackListProps) {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    async function fetchReports(userId: number): Promise<ReportsResponse> {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/reports`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('리포트 데이터를 불러오는데 실패했습니다.');
      }

      return res.json();
    }

    async function loadReports() {
      try {
        const data = await fetchReports(userId);
        const selected = selectedType === 'personal' ? data.personalReports : data.teamReports;
        setReports(selected);
      } catch (error) {
        console.error(error);
      }
    }

    loadReports();
  }, [selectedType, userId]);

  const handleReportClick = (reportId: string, type: string) => {
    router.push(`/performance/reports/${reportId}?type=${type}`);
  };

  const handleDownload = (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation();
    console.log(`Downloading report ${reportId}`);
  };

  const getTypeColor = (type: string) => {
    if (type.includes('quarter')) return 'bg-blue-100 text-blue-800';
    if (type.includes('annual')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getTypeHoverColor = (type: string) => {
    if (type.includes('quarter')) return 'hover:bg-blue-200 hover:text-blue-900';
    if (type.includes('annual')) return 'hover:bg-purple-200 hover:text-purple-900';
    return 'hover:bg-gray-200 hover:text-gray-900';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'personal-quarter':
        return '개인 분기';
      case 'personal-annual':
        return '개인 연말';
      case 'team-quarter':
        return '팀 분기';
      case 'team-annual':
        return '팀 연말';
      default:
        return '알 수 없음';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          리포트 내역
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleReportClick(report.id, report.type)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{report.createdAt}</span>
                      <span>•</span>
                      <User className="h-4 w-4" />
                      <span>{report.user.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      기간:{report.startDate} ~ {report.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    className={`${getTypeColor(report.type)} ${getTypeHoverColor(report.type)}`}
                  >
                    {getTypeLabel(report.type)}
                  </Badge>

                  <Button variant="outline" size="sm" onClick={(e) => handleDownload(e, report.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
