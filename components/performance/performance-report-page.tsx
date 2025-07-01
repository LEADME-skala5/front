'use client';

import { useEffect, useState } from 'react';
import { IndividualQuarterReportDetail } from './individual-quarter-report-detail';
import { IndividualYearEndReportDetail } from './individual-year-end-report-detail';
import { TeamQuarterReportDetail } from './team-quarter-report-detail';
import { TeamYearEndReportDetail } from './team-year-end-report-detail';

interface PerformanceReportPageProps {
  reportId: string;
}

type ReportType = 'personal-quarter' | 'personal-annual' | 'team-quarter' | 'team-annual';

interface Report {
  id: number;
  performanceType: ReportType;
  title: string;
  content: string;
  evaluatedYear: number;
  evaluatedQuarter: number | null;
  createdAt: string;
  startDate: string;
  endDate: string;
  user: {
    userId: number;
    name: string;
    department: string;
  };
}

interface Report {
  id: number;
  type: ReportType;
  title: string;
  content: string;
  evaluatedYear: number;
  evaluatedQuarter: number | null;
  createdAt: string;
  startDate: string;
  endDate: string;
  user: {
    userId: number;
    name: string;
    department: string;
  };
}

export function PerformanceReportPage({ reportId }: PerformanceReportPageProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('리포트 로딩 실패');
        }

        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error(error);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">로딩 중...</div>;
  }

  if (!report) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">The requested performance report could not be found.</p>
      </div>
    );
  }

  // 타입에 따라 적절한 컴포넌트 렌더링
  switch (report.type) {
    case 'personal-quarter':
      return <IndividualQuarterReportDetail reportData={report} />;
    case 'personal-annual':
      return <IndividualYearEndReportDetail reportData={report} />;
    case 'team-quarter':
      return <TeamQuarterReportDetail reportData={report} />;
    case 'team-annual':
      return <TeamYearEndReportDetail reportData={report} />;
    default:
      return (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Unknown Report Type</h2>
          <p className="text-gray-600 mt-2">지원하지 않는 리포트 타입입니다.</p>
        </div>
      );
  }
}
