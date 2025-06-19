'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, CheckCircle, ClipboardCheck, Star } from 'lucide-react';
import { useWeeklyEvaluationStore } from '@/store/weeklyEvaluationStore';

interface QualitativeEvaluationProps {
  memberId: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  memberContribution: string;
  aiSummary: string;
  status: 'completed' | 'in-progress';
  duration: string;
}

const evaluationOptions = [
  {
    value: 5,
    label: '탁월',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    selectedColor: 'bg-green-600',
    textColor: 'text-white',
  },
  {
    value: 4,
    label: '우수',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    selectedColor: 'bg-blue-600',
    textColor: 'text-white',
  },
  {
    value: 3,
    label: '보통',
    color: 'bg-primary',
    hoverColor: 'hover:bg-primary/90',
    selectedColor: 'bg-primary',
    textColor: 'text-white',
  },
  {
    value: 2,
    label: '미흡',
    color: 'bg-yellow-300',
    hoverColor: 'hover:bg-yellow-300',
    selectedColor: 'bg-yellow-300',
    textColor: 'text-white',
  },
  {
    value: 1,
    label: '부족',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-500',
    selectedColor: 'bg-red-500',
    textColor: 'text-white',
  },
];

const mockMemberTasks: { [key: string]: any } = {
  '1': {
    member: { id: '1', name: '김민수', role: '시니어 개발자', department: '엔지니어링팀' },
    tasks: [
      {
        id: 1,
        title: '유저 인증 시스템 구현',
        description: 'OAuth 연동을 포함한 인증 시스템 전면 개편',
        memberContribution: '...',
        aiSummary: '...',
        status: 'completed',
        duration: '6주',
      },
      {
        id: 2,
        title: 'API 성능 최적화',
        description: '기존 REST API의 응답 속도 개선 및 서버 부하 감소',
        memberContribution: '...',
        aiSummary: '...',
        status: 'completed',
        duration: '4주',
      },
      {
        id: 3,
        title: '모바일 앱 백엔드 연동',
        description: '새로운 모바일 기능 지원을 위한 백엔드 서비스 개발',
        memberContribution: '...',
        aiSummary: '...',
        status: 'in-progress',
        duration: '8주 (진행 중)',
      },
      {
        id: 4,
        title: '코드 리뷰 프로세스 개선',
        description: '팀의 코드 리뷰 프로세스를 개선하고 품질 기준 수립',
        memberContribution: '...',
        aiSummary: '...',
        status: 'completed',
        duration: '3주',
      },
    ],
  },
};

async function createWeeklyEvaluation(selectedScores: { [taskId: number]: number }) {
  const payload = {
    evaluatorUserId: 1,
    evaluateeUserId: 2,
    evaluations: Object.entries(selectedScores).map(([taskId, grade]) => ({
      taskId: Number(taskId),
      grade,
    })),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quantitative-evaluation/weekly`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  console.log(res);

  if (!res.ok) return [];
  return res.json();
}

export function WeeklyEvaluation({ memberId }: QualitativeEvaluationProps) {
  const router = useRouter();
  const { selectedScores, setScore, clearScores } = useWeeklyEvaluationStore();
  const [isSaved, setIsSaved] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const memberData = mockMemberTasks[memberId];

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const getEvaluationColor = (value: number) => {
    const option = evaluationOptions.find((opt) => opt.value === value);
    return option?.color || 'bg-gray-400';
  };

  if (!memberData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Member Not Found</h2>
        <p className="text-gray-600 mt-2">The requested team member could not be found.</p>
        <Button onClick={() => router.push('/team/overview')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team Overview
        </Button>
      </div>
    );
  }

  const { member, tasks } = memberData;
  const completedEvaluations = Object.keys(selectedScores).length;
  const totalTasks = tasks.length;

  const handleSave = async () => {
    console.log(selectedScores);
    const YEAR = 2025;
    const QUARTER = 2;

    const res = await createWeeklyEvaluation(selectedScores);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/team/overview')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team Overview
        </Button>
        <span className="text-sm text-gray-600">
          Progress: {completedEvaluations}/{totalTasks} tasks evaluated
        </span>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" /> Qualitative Evaluation -{' '}
                {member.name}
              </CardTitle>
              <p className="text-gray-600">
                {member.role} • {member.department}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                각 업무별 기여도를 탁월, 우수, 보통, 미흡, 부족 중 하나로 선택해 주세요.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {showValidation && (
        <Alert variant="destructive">
          <AlertDescription>모든 업무에 대한 평가를 완료한 후 저장해 주세요.</AlertDescription>
        </Alert>
      )}

      {isSaved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            정성 평가가 성공적으로 저장되었습니다. 팀 개요 화면으로 이동합니다.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {tasks.map((task: Task, index: number) => (
          <Card key={task.id} className="border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                      Task {index + 1}
                    </span>
                    {task.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                      {task.status === 'completed' ? '진행 완료' : '진행 중 '}
                    </Badge>
                    <span className="text-sm text-gray-500">업무 수행 기간 : {task.duration}</span>
                  </div>
                </div>
                {selectedScores[task.id] && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getEvaluationColor(selectedScores[task.id])}`}
                    />
                    <span className="text-sm font-medium text-gray-700">평가 완료</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> 팀원 기여 내용
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="whitespace-pre-line text-sm text-gray-700">
                    {task.memberContribution}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">AI 분석 요약 </h4>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">{task.aiSummary}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">등급 평가</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                  {evaluationOptions.map((option) => {
                    const isSelected = selectedScores[task.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setScore(task.id, option.value)}
                        className={`relative p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                          isSelected
                            ? `${option.selectedColor} border-transparent ${option.textColor} shadow-lg scale-105`
                            : `bg-white border-gray-200 text-gray-700 ${option.hoverColor} hover:border-gray-300 hover:shadow-md`
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <div className="font-medium text-sm ">{option.label}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSave}
          disabled={completedEvaluations !== totalTasks || isSaved}
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
