import { PeerEvaluation } from '@/components/evaluation/peer';

async function getPeerEvaluationKeywords() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/keywords`);
  if (!res.ok) return [];
  return res.json();
}

export default async function PeerEvaluationPage() {
  const initialKeywords = await getPeerEvaluationKeywords();
  return (
    <div className="p-6">
      <PeerEvaluation initialKeywords={initialKeywords} />
    </div>
  );
}
