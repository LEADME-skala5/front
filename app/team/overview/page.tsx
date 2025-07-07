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

function extractOrganizationIdFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
    return decodedPayload.organizationId?.toString() || null;
  } catch (e) {
    console.error('토큰 디코딩 실패:', e);
    return null;
  }
}

async function getEvaluationData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) throw new Error('accessToken 누락');

    const organizationId = extractOrganizationIdFromToken(accessToken);
    if (!organizationId) throw new Error('organizationId 추출 실패');

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

export default async function Page() {
  const { evaluated, users } = await getEvaluationData();
  // const response = await getEvaluationData();
  // const evaluated = false;
  // const users = response.users;
  // API 응답 → 컴포넌트 데이터 형식 변환
  const teamMembers = users.map(
    (user: {
      userId: { toString: () => any };
      name: any;
      position: any;
      email: any;
      tasks: any[];
      quarterScore: any;
      lastUpdated: any;
      recentReportId: string;
    }) => ({
      id: user.userId.toString(),
      name: user.name,
      role: user.position,
      email: user.email,
      projects: user.tasks.map((task) => task.name),
      performanceScore: user.quarterScore || 0, // null 대체값
      lastEvaluationDate: user.lastUpdated || '', // null 대체값
      recentReportId: user.recentReportId,
    })
  );

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
