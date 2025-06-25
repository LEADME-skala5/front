'use client';

import { useEffect, useState } from 'react';
import { PeerEvaluation } from '@/components/evaluation/peer';
import { useUserStore } from '@/store/useUserStore';

export default function PeerEvaluationPage() {
  const { user } = useUserStore();
  const [initialKeywords, setInitialKeywords] = useState([]);
  const [peers, setPeers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const [keywordsRes, peersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/keywords`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/peer-evaluation/peers/${user.id}`),
        ]);

        const [keywordsData, peersData] = await Promise.all([keywordsRes.json(), peersRes.json()]);

        setInitialKeywords(keywordsData);
        setPeers(peersData);
      } catch (error) {
        console.error('평가 페이지 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (!user) {
    return <div className="p-6 text-center">로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div className="p-6 text-center">불러오는 중...</div>;
  }

  if (!peers || peers.length === 0) {
    return <div className="p-6 text-center text-muted-foreground">평가할 동료가 없습니다.</div>;
  }

  return (
    <div className="p-6">
      <PeerEvaluation initialKeywords={initialKeywords} peers={peers} />
    </div>
  );
}
