import { PerformanceHeader } from "@/components/performance/performance-header"
import { PerformanceMetrics } from "@/components/performance/performance-metrics"
import { GoalsSection } from "@/components/performance/goals-section"
import { ReviewsSection } from "@/components/performance/reviews-section"
import { PerformanceFilters } from "@/components/performance/performance-filters"

export default function PerformancePage() {
  return (
    <div className="p-6 space-y-6">
      <PerformanceHeader />
      <PerformanceFilters />
      <PerformanceMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalsSection />
        <ReviewsSection />
      </div>
    </div>
  )
}
