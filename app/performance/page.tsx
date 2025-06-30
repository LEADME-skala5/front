import { cookies } from 'next/headers';
import { PerformanceHeader } from '@/components/performance/performance-header';
import { PerformanceMetrics } from '@/components/performance/performance-metrics';
import { ToggleGroupClient } from '@/components/performance/toggle-group-client';

function extractUserIdFromToken(token: string): number | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
    return decodedPayload.id ?? null;
  } catch (e) {
    console.error('토큰 디코딩 실패:', e);
    return null;
  }
}

export default async function PerformancePage() {
  const accessToken = (await cookies()).get('accessToken')?.value;
  const userId = accessToken ? extractUserIdFromToken(accessToken) : null;
  console.log('accessToken', accessToken);

  if (!userId) return <div>로그인이 필요합니다.</div>;

  return (
    <div className="p-6 space-y-6">
      <PerformanceHeader />
      <PerformanceMetrics />
      <ToggleGroupClient userId={userId} />
    </div>
  );
}
