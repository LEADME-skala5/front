import { TeamEvaluation } from '@/components/team/team-evaluation';
import { TeamReport } from '@/components/team/team-report';

// Mock API call - replace with your actual API
async function getTeamEvaluationStatus() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data - replace with actual API response
  // Return true if team has been evaluated, false if not
  return Math.random() > 0.5; // Random for demonstration
}

export default async function TeamOverviewPage() {
  // const hasBeenEvaluated = await getTeamEvaluationStatus();
  const hasBeenEvaluated = true;

  return <div className="p-6">{hasBeenEvaluated ? <TeamReport /> : <TeamEvaluation />}</div>;
}
