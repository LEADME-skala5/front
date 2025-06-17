'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QualitativeEvaluation } from '@/components/team/qualitative-evaluation';

interface EvaluatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EvaluatePage({ params }: EvaluatePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'member';
    if (userRole !== 'teamlead') {
      router.push('/dashboard');
      return;
    }
    setIsTeamLead(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  if (!isTeamLead) {
    return null;
  }

  return (
    <div className="p-6">
      <QualitativeEvaluation memberId={id} />
    </div>
  );
}
