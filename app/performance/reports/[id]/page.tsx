import { PerformanceReportDetail } from "@/components/performance/performance-report-detail";

interface PerformanceReportPageProps {
  params: {
    id: string;
  };
}

export default async function PerformanceReportPage({
  params,
}: PerformanceReportPageProps) {
  const { id } = await params;
  const reportId = Number.parseInt(id);

  return (
    <div className="p-6">
      <PerformanceReportDetail reportId={reportId} />
    </div>
  );
}
