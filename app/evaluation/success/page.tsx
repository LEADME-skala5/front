'use client';

import { useRouter } from 'next/navigation';
import Check from '@/assets/check.svg';

export default function PeerEvaluationComplete() {
  const router = useRouter();

  const handleGoMain = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100 pb-12 px-4">
      <div className="w-full max-w-[800px] h-[600px] bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center mt-20  px-6 py-12">
        <Check className="w-25 h-25 mb-6" />
        <h1 className="text-2xl font-bold mb-4">동료 평가 완료</h1>
        <p className="text-base text-gray-600 mb-1 text-center">
          모든 팀원에 대한 평가가 성공적으로 제출되었습니다.
        </p>
        <p className="text-base text-gray-600 text-center">
          당신의 피드백은 팀의 성장에 큰 도움이 됩니다.
        </p>

        <button
          onClick={handleGoMain}
          className="mt-20  w-[400px]  h-14 rounded-xl bg-primary text-white text-lg font-semibold hover:bg-secondary transition"
        >
          메인으로 가기
        </button>
      </div>
    </div>
  );
}
