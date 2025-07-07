'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, CheckCircle, ClipboardCheck, Sparkles, FileText } from 'lucide-react';
import { useWeeklyEvaluationStore } from '@/store/weeklyEvaluationStore';

/* ------------------------------------------------------------------ */
/* 1. 타입 선언                                                         */
/* ------------------------------------------------------------------ */
interface WeeklyEvaluationProps {
  memberId: string;
}

interface TeamGoal {
  goalName: string;
  assigned: string;
  contributionCount: number;
  /** 팀원이 실제로 수행한 핵심 기여 내용 하나의 문단 */
  aggregatedContribution: string;
  /** AI 가 생성한 한 줄 / 여러 줄 요약 */
  aiSummary: string;
}

interface UserInfo {
  department: string;
  name: string;
  job: string;
  userId: number;
}

interface WeeklyEvaluationData {
  teamGoals: TeamGoal[];
  user: UserInfo;
}

/* ------------------------------------------------------------------ */
/* 2. MOCK 데이터                                                       */
/* ------------------------------------------------------------------ */
const mockWeeklyEvaluationData: WeeklyEvaluationData = {
  teamGoals: [
    {
      goalName: 'AI 업무 적용',
      assigned: '배정',
      contributionCount: 5,
      aggregatedContribution:
        '· AI Agent의 업무 적용 효과를 정량적으로 측정하고 보고했습니다.\n· 팀 내 Copilot, ChatGPT 활용 사례를 문서화해 전파했습니다.',
      aiSummary: 'AI 자동화 도구 도입으로 업무 효율 23% ↑, 구성원 디지털 역량 15% ↑로 분석됨.',
    },
    {
      goalName: 'ESG 사업 수익 창출',
      assigned: '배정',
      contributionCount: 5,
      aggregatedContribution:
        '· ESG 사업 포트폴리오를 재분석하고 신규 매출 기회 3건 발굴.\n· 총 12억 원 규모 예상 수익 산출.',
      aiSummary: '탄소저감·순환경제 분야에서 12억 원 규모 신규 매출 기회 확보, ROI 18% 예상.',
    },
    {
      goalName: '신규 ESG BM 발굴',
      assigned: '배정',
      contributionCount: 6,
      aggregatedContribution:
        '· 외부 파트너와 친환경 인증 BM 타당성 조사.\n· 3개 아이디어 중 1개 PoC 단계 진입.',
      aiSummary: '친환경 인증 서비스 상용화 가능성 70%, 6개월 내 MVP 출시 전망.',
    },
    {
      goalName: '조직문화 혁신',
      assigned: '배정',
      contributionCount: 7,
      aggregatedContribution:
        '· 조직문화 설문 214건 분석, 4대 개선 과제 도출.\n· 4P 문화 피드백 세션 정례 운영.',
      aiSummary: '직원 만족도 상승세 지속, 4P 문화 인지도 65% → 78% 향상.',
    },
  ],
  user: {
    department: 'ESG전략담당',
    name: '임성민',
    job: '친환경 프로젝트 관리',
    userId: 100,
  },
};

/* ------------------------------------------------------------------ */
/* 3. 평가(라디오) 옵션                                                 */
/* ------------------------------------------------------------------ */
const evaluationOptions = [
  {
    value: 5,
    label: '탁월',
    color: 'bg-green-500',
    hover: 'hover:bg-green-600',
    selected: 'bg-green-600',
  },
  {
    value: 4,
    label: '우수',
    color: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    selected: 'bg-blue-600',
  },
  {
    value: 3,
    label: '보통',
    color: 'bg-primary',
    hover: 'hover:bg-primary/90',
    selected: 'bg-primary',
  },
  {
    value: 2,
    label: '미흡',
    color: 'bg-yellow-300',
    hover: 'hover:bg-yellow-300',
    selected: 'bg-yellow-300',
  },
  {
    value: 1,
    label: '부족',
    color: 'bg-red-500',
    hover: 'hover:bg-red-500',
    selected: 'bg-red-500',
  },
];

/* ------------------------------------------------------------------ */
/* 4. 실제 → MOCK 전환 함수                                            */
/* ------------------------------------------------------------------ */
async function fetchWeeklyEvaluationData(): Promise<WeeklyEvaluationData | null> {
  // 개발 단계에서는 항상 mock 사용
  return mockWeeklyEvaluationData;
  /*
  // 실서버 사용 시:
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quantitative-evaluation/weekly/${userId}`);
  if (!res.ok) return null;
  return res.json();
  */
}

/* ================================================================== */
/*                      WeeklyEvaluation 컴포넌트                       */
/* ================================================================== */
export default function WeeklyEvaluation({ memberId }: WeeklyEvaluationProps) {
  const router = useRouter();
  const { selectedScores, setScore } = useWeeklyEvaluationStore();

  const [data, setData] = useState<WeeklyEvaluationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  /* 데이터 로드 */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const d = await fetchWeeklyEvaluationData();
        setData(d);
      } catch {
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [memberId]);

  /* 헬퍼 */
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const getColor = (value: number, selected = false) => {
    const opt = evaluationOptions.find((o) => o.value === value);
    if (!opt) return 'bg-gray-400';
    return selected ? opt.selected : opt.color;
  };

  const completed = Object.keys(selectedScores).length;
  const totalGoals = data?.teamGoals.length ?? 0;

  /* 저장 */
  const handleSave = () => {
    if (completed < totalGoals) {
      setShowValidation(true);
      return;
    }
    setIsSaved(true);
    setTimeout(() => router.push('/team/overview'), 1500);
  };

  /* 로딩 / 오류 */
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );

  if (error || !data)
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">데이터를 불러올 수 없습니다</h2>
        <p className="text-gray-600 mt-2">{error ?? '요청한 팀원 정보를 찾을 수 없습니다.'}</p>
        <Button onClick={() => router.push('/team/overview')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> 팀 개요로 돌아가기
        </Button>
      </div>
    );

  const { user, teamGoals } = data;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/team/overview')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> 팀 개요로 돌아가기
        </Button>
        <span className="text-sm text-gray-600">
          진행 상황: {completed}/{totalGoals} 목표 평가됨
        </span>
      </div>

      {/* 팀원 요약 카드 */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                주간 정량 평가 – {user.name}
              </CardTitle>
              <p className="text-gray-600">
                {user.job} • {user.department}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                각 팀 목표별 기여도를 탁월, 우수, 보통, 미흡, 부족 중 하나로 선택해 주세요.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 유효성 / 성공 알림 */}
      {showValidation && (
        <Alert variant="destructive">
          <AlertDescription>모든 목표 평가를 완료한 후 저장해 주세요.</AlertDescription>
        </Alert>
      )}
      {isSaved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            주간 정량 평가가 성공적으로 저장되었습니다. 팀 개요로 이동합니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 목표 카드 */}
      {teamGoals.map((goal, idx) => (
        <Card key={idx} className="border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                    목표 {idx + 1}
                  </span>
                  {goal.goalName}
                </CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <Badge>{goal.assigned}</Badge>
                  <span className="text-sm text-gray-500">기여 횟수: {goal.contributionCount}</span>
                </div>
              </div>
              {selectedScores[idx] && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getColor(selectedScores[idx])}`} />
                  <span className="text-sm font-medium text-gray-700">평가 완료</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 팀원 기여 내용 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                <FileText className="h-4 w-4 text-primary" />
                팀원 기여 내용
              </h4>
              <div className="bg-gray-50 border p-4 rounded-lg whitespace-pre-line text-sm text-gray-700">
                {goal.aggregatedContribution}
              </div>
            </div>

            {/* AI 분석 요약 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary" />
                AI 분석 요약
              </h4>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-gray-800">
                {goal.aiSummary}
              </div>
            </div>

            {/* 등급 평가 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">등급 평가</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {evaluationOptions.map((opt) => {
                  const chosen = selectedScores[idx] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setScore(idx, opt.value)}
                      className={`relative p-3 rounded-lg border-2 transition-all text-center ${
                        chosen
                          ? `${opt.selected} border-transparent text-white shadow-lg scale-105`
                          : `bg-white border-gray-200 text-gray-700 ${opt.hover} hover:border-gray-300 hover:shadow-md`
                      }`}
                    >
                      <span className="font-medium text-sm">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 저장 버튼 */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSave}
          disabled={completed !== totalGoals || isSaved}
          className="min-w-32"
        >
          {isSaved ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> 저장되었습니다
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> 평가 저장하기
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
