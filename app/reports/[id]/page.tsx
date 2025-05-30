import { ReportDetailView } from "@/components/reports/report-detail-view";

interface ReportDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ReportDetailPage({
  params,
}: ReportDetailPageProps) {
  const { id } = await params;
  const reportId = Number.parseInt(id);

  return (
    <div className="p-6">
      <ReportDetailView reportId={reportId} />
    </div>
  );
}
