'use client';

import { useState } from 'react';
import { PerformanceHeader } from '@/components/performance/performance-header';
import { PerformanceMetrics } from '@/components/performance/performance-metrics';
import { PerformanceFilters } from '@/components/performance/performance-filters';
import { PerformanceFeedbackList } from '@/components/performance/performance-feedback-list';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function PerformancePage() {
  const [selectedType, setSelectedType] = useState<'individual' | 'team'>('individual');

  return (
    <div className="p-6 space-y-6">
      <PerformanceHeader />
      {/* <PerformanceFilters /> */}
      <PerformanceMetrics />

      <ToggleGroup
        type="single"
        value={selectedType}
        onValueChange={(value) => {
          if (value) setSelectedType(value as 'individual' | 'team');
        }}
        className="flex w-fit border rounded-md p-1 bg-muted"
      >
        <ToggleGroupItem
          value="individual"
          className={`px-4 py-2 text-sm font-medium rounded-md data-[state=on]:bg-primary data-[state=on]:text-white`}
        >
          개인 보고서
        </ToggleGroupItem>
        <ToggleGroupItem
          value="team"
          className={`px-4 py-2 text-sm font-medium rounded-md data-[state=on]:bg-white data-[state=on]:text-primary`}
        >
          팀 보고서
        </ToggleGroupItem>
      </ToggleGroup>
      {/* Performance Feedback Reports List */}
      <PerformanceFeedbackList selectedType={selectedType} />
    </div>
  );
}
