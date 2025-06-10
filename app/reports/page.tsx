import { ReportList } from '@/components/reports/report-list';
import { ReportFilters } from '@/components/reports/report-filters';

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Report Archive</h1>
      </div>
      <ReportFilters />
      <ReportList />
    </div>
  );
}
