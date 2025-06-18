'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, Download } from 'lucide-react';

const feedbackReports = [
  {
    id: 1,
    title: '개인 분기 보고서',
    type: '개인 분기 보고서',
    date: '2026-01-15',
    author: 'Virtual 홍길동 & X.Cel',
    period: '2026-01-01 ~ 2026-11-30',
    status: 'completed',
  },
  {
    id: 2,
    title: '개인 연말 보고서',
    type: '개인 연말 보고서',
    date: '2026-10-01',
    author: 'Virtual 홍길동 & X.Cel',
    period: '2026-07-01 ~ 2026-09-26 (26년 3분기)',
    status: 'completed',
  },
  {
    id: 3,
    title: '팀 분기 보고서',
    type: '팀 분기 보고서',
    date: '2026-07-15',
    author: 'Performance Team',
    period: '2026-04-01 ~ 2026-06-30',
    status: 'completed',
  },
  {
    id: 4,
    title: '팀 연말 보고서',
    type: '팀 연말 보고서',
    date: '2026-04-10',
    author: 'HR Department',
    period: '2026-01-01 ~ 2026-03-31',
    status: 'completed',
  },
];

const getTypeColor = (type: string) => {
  if (type.includes('분기')) return 'bg-blue-100 text-blue-800';
  if (type.includes('연말')) return 'bg-purple-100 text-purple-800';
  return 'bg-gray-100 text-gray-800'; // 기본값
};

export function PerformanceFeedbackList() {
  const router = useRouter();

  const handleReportClick = (reportId: number) => {
    router.push(`/performance/reports/${reportId}`);
  };

  const handleDownload = (e: React.MouseEvent, reportId: number) => {
    e.stopPropagation();
    // Simulate download functionality
    console.log(`Downloading report ${reportId}`);
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
          {feedbackReports.map((report) => (
            <div
              key={report.id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleReportClick(report.id)}
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
                      <span>{report.date}</span>
                      <span>•</span>
                      <User className="h-4 w-4" />
                      <span>{report.author}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">기간: {report.period}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
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
