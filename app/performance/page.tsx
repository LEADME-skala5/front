import { PerformanceHeader } from '@/components/performance/performance-header';
import { PerformanceMetrics } from '@/components/performance/performance-metrics';
import { PerformanceFilters } from '@/components/performance/performance-filters';
import { PerformanceFeedbackList } from '@/components/performance/performance-feedback-list';

export default function PerformancePage() {
  return (
    <div className="p-6 space-y-6">
      <PerformanceHeader />
      {/* <PerformanceFilters /> */}
      <PerformanceMetrics />

      {/* Performance Feedback Reports List */}
      <PerformanceFeedbackList />
    </div>
  );
}
