import { ContributionEvaluation } from '@/components/evaluation/contribution';

async function getPeers() {
  const userId = 1;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/peers/${userId}`);
  if (!res.ok) return [];
  return res.json();
}

export default async function ContributionEvaluationPage() {
  const peers = await getPeers();

  return (
    <div className="p-6">
      <ContributionEvaluation peers={peers} />
    </div>
  );
}
