'use client';

import { useEffect, useState } from 'react';
import { PeerEvaluation } from '@/components/evaluation/peer';

// 쿠키에서 accessToken 추출
function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match?.[2];
}

// accessToken에서 userId 추출
function extractUserIdFromToken(token: string): number | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.id ?? null;
  } catch (e) {
    console.error('토큰 디코딩 실패:', e);
    return null;
  }
}

export default function PeerEvaluationPage() {
  const [initialKeywords, setInitialKeywords] = useState([]);
  const [peers, setPeers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = getCookie('accessToken');
    console.log('🍪 accessToken:', token);
    if (!token) return;
    const uid = extractUserIdFromToken(token);
    setUserId(uid);
    console.log('👤 추출된 userId:', uid);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [keywordsRes, peersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/keywords`, {
            credentials: 'include',
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/peers/${userId}`, {
            credentials: 'include',
          }),
        ]);

        const [keywordsData, peersData] = await Promise.all([keywordsRes.json(), peersRes.json()]);

        setInitialKeywords(keywordsData);
        setPeers(peersData);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return <div className="p-6 text-center">로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div className="p-6 text-center">불러오는 중...</div>;
  }

  if (peers.length === 0) {
    return <div className="p-6 text-center text-muted-foreground">평가할 동료가 없습니다.</div>;
  }

  return (
    <div className="p-6">
      <PeerEvaluation initialKeywords={initialKeywords} peers={peers} userId={userId} />
    </div>
  );
}
