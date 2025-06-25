// 수정된 page.tsx
import { TeamEvaluation } from '@/components/team/team-evaluation';
import { TeamReport } from '@/components/team/team-report';
import { cookies } from 'next/headers';

interface Task {
  taskId: number;
  name: string;
  isEvaluated: boolean;
  grade: number | null;
}

interface User {
  userId: number;
  name: string;
  position: string;
  email: string;
  tasks: Task[];
  quarterScore: number | null;
  lastUpdated: string | null;
}

interface ApiResponse {
  evaluated: boolean;
  users: User[];
}

interface PageProps {
  params: { organizationId: string };
}

async function getEvaluationData(organizationId: string): Promise<ApiResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quantitative-evaluation/${organizationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
        credentials: 'include',
      }
    );
    console.log('accessToken', accessToken);

    if (!res.ok) throw new Error('API 요청 실패');
    return await res.json();
  } catch (error) {
    console.error(error);
    return { evaluated: false, users: [] };
  }
}

export default async function Page({ params }: PageProps) {
  const { organizationId } = params;
  const { evaluated, users } = await getEvaluationData(organizationId);

  // API 응답 → 컴포넌트 데이터 형식 변환
  const teamMembers = users.map((user) => ({
    id: user.userId.toString(),
    name: user.name,
    role: user.position,
    email: user.email,
    projects: user.tasks.map((task) => task.name),
    performanceScore: user.quarterScore || 0, // null 대체값
    lastEvaluationDate: user.lastUpdated || '', // null 대체값
  }));

  return (
    <div className="p-6">
      {evaluated ? (
        <TeamReport teamMembers={teamMembers} />
      ) : (
        <TeamEvaluation teamMembers={teamMembers} />
      )}
    </div>
  );
}
