import { PeerEvaluation } from '@/components/evaluation/peer';

// TODO: API 응답 관련 수정해야함

async function getPeerEvaluationKeywords() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/keywords`);
  if (!res.ok) return [];
  return res.json();
}

async function getPeers() {
  const userId = 3;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/peers/${userId}`);
  if (!res.ok) return [];
  return res.json();
}

export default async function PeerEvaluationPage() {
  const initialKeywords = await getPeerEvaluationKeywords();
  const peers = await getPeers();

  return (
    <div className="p-6">
      <PeerEvaluation initialKeywords={initialKeywords} peers={peers} />
    </div>
  );
}
