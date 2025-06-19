'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WeeklyEvaluation } from '@/components/team/weeklyEvaluation';

interface EvaluatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EvaluatePage({ params }: EvaluatePageProps) {
  const { id } = use(params);

  return (
    <div className="p-6">
      <WeeklyEvaluation memberId={id} />
    </div>
  );
}
