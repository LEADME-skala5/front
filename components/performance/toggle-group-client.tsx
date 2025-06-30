'use client';

import { useState } from 'react';
import { PerformanceFeedbackList } from '@/components/performance/performance-feedback-list';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Props {
  userId: number;
}

export function ToggleGroupClient({ userId }: Props) {
  const [selectedType, setSelectedType] = useState<'individual' | 'team'>('individual');

  return (
    <>
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
      <PerformanceFeedbackList selectedType={selectedType} userId={userId} />
    </>
  );
}
