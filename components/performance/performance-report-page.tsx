'use client';

import { IndividualQuarterReportDetail } from './individual-quarter-report-detail';
import { IndividualYearEndReportDetail } from './individual-year-end-report-detail';
import { TeamQuarterReportDetail } from './team-quarter-report-detail';
import { TeamYearEndReportDetail } from './team-year-end-report-detail';

import {
  mockIndividualQuarter,
  mockIndividualYearEnd,
  mockTeamQuarter,
  mockTeamYearEnd,
} from '@/mock/data';

interface PerformanceReportPageProps {
  reportId: number;
}

const allReports = [
  ...mockIndividualQuarter,
  ...mockIndividualYearEnd,
  ...mockTeamQuarter,
  ...mockTeamYearEnd,
];

type ReportType = 'individual-quarter' | 'individual-year-end' | 'team-quarter' | 'team-year-end';

export function PerformanceReportPage({ reportId }: PerformanceReportPageProps) {
  console.log(allReports.map((r) => ({ id: r.id, type: r.type })));

  const report = allReports.find((r) => r.id === Number(reportId));

  if (!report) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">The requested performance report could not be found.</p>
      </div>
    );
  }

  // Route to appropriate component based on report type
  switch (report.type as ReportType) {
    case 'individual-quarter':
      return <IndividualQuarterReportDetail reportData={report} />;
    case 'individual-year-end':
      return <IndividualYearEndReportDetail reportData={report} />;
    case 'team-quarter':
      return <TeamQuarterReportDetail reportData={report} />;
    case 'team-year-end':
      return <TeamYearEndReportDetail reportData={report} />;
    default:
      return (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Unknown Report Type</h2>
          <p className="text-gray-600 mt-2">This report type is not supported yet.</p>
        </div>
      );
  }
}
