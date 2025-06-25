import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PerformanceReportPage } from '@/components/performance/performance-report-page';

interface ReportDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;

  if (!accessToken) {
    redirect('/login');
  }
  const { id } = await params;
  const reportId = Number.parseInt(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <PerformanceReportPage reportId={reportId} />
    </div>
  );
}
