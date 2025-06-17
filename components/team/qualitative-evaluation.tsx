'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, CheckCircle, ClipboardCheck, Star } from 'lucide-react';

interface QualitativeEvaluationProps {
  memberId: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  memberContribution: string;
  aiSummary: string;
  status: 'completed' | 'in-progress';
  duration: string;
}

interface Evaluation {
  taskId: string;
  rating: string;
}

const mockMemberTasks: { [key: string]: any } = {
  '1': {
    member: {
      id: '1',
      name: '김민수',
      role: '시니어 개발자',
      department: '엔지니어링팀',
    },
    tasks: [
      {
        id: 'task-1',
        title: '유저 인증 시스템 구현',
        description: 'OAuth 연동을 포함한 인증 시스템 전면 개편',
        memberContribution:
          '• 인증 시스템 아키텍처 설계 및 구현 주도\n• JWT 기반 보안 토큰 관리 시스템 개발\n• Google 및 GitHub OAuth 2.0 연동 구현\n• 유닛 및 통합 테스트 작성\n• 구현 과정에서 주니어 개발자 멘토링',
        aiSummary:
          '김민수 님은 이 중요한 프로젝트에서 탁월한 기술 리더십을 발휘했습니다. 아키텍처 결정은 매우 체계적이고 미래지향적이었으며, 결과적으로 강력하고 확장 가능한 인증 시스템이 구축되었습니다. 구현은 보안 요건을 초과 달성했고, 예정보다 앞서 완료되었습니다. 팀 전체가 새로운 인증 구조를 빠르게 이해하고 적용할 수 있도록 문서화와 가이드도 잘 이루어졌습니다. 또한 복잡한 OAuth 통합 과정을 안정적으로 수행해, 서비스 신뢰도를 크게 높였습니다.',
        status: 'completed' as const,
        duration: '6주',
      },
      {
        id: 'task-2',
        title: 'API 성능 최적화',
        description: '기존 REST API의 응답 속도 개선 및 서버 부하 감소',
        memberContribution:
          '• 성능 병목 지점을 분석하기 위해 프로파일링 도구 사용\n• DB 쿼리 최적화로 응답 시간 40% 단축\n• 자주 호출되는 데이터에 Redis 캐시 적용\n• 비효율적인 엔드포인트 리팩토링 및 에러 처리 개선\n• 최적화 전략을 문서화하여 팀에 공유',
        aiSummary:
          '주요 성능 문제를 체계적으로 파악하고 해결하며 매우 뛰어난 성과를 보여주었습니다. 성능 개선에 접근하는 방법이 명확하고 측정 가능한 성과를 내었으며, 기술적 전문성과 문제 해결 능력이 돋보였습니다. 성능 최적화 결과는 실제 사용자 경험 개선으로 이어졌고, 전체 트래픽 처리량 증가에도 안정적으로 대응할 수 있었습니다. 지식 공유를 통해 팀 내 성능 개선 역량도 함께 향상되었습니다.',

        status: 'completed' as const,
        duration: '4주',
      },
      {
        id: 'task-3',
        title: '모바일 앱 백엔드 연동',
        description: '새로운 모바일 기능 지원을 위한 백엔드 서비스 개발',
        memberContribution:
          '• 모바일 앱을 위한 RESTful API 설계 및 구현\n• WebSocket을 이용한 실시간 알림 시스템 구축\n• 오프라인 기능을 위한 데이터 동기화 처리 구현\n• 모바일 팀과 긴밀히 협업하여 원활한 통합 지원',
        aiSummary:
          '팀 간 협업과 기술 구현 모두 훌륭하게 수행했습니다. 백엔드 서비스는 잘 설계되고 문서화되어 모바일 앱 개발에 원활하게 연동되었으며, 사전 커뮤니케이션을 통해 통합 문제를 사전에 방지할 수 있었습니다. 실시간 알림 시스템과 오프라인 동기화 기능은 사용자 편의성을 높이는 핵심 요소로 작용했습니다. 복잡한 요구사항을 안정적으로 해결하며, 다른 팀원들에게도 신뢰를 주는 역할을 했습니다.',
        status: 'in-progress' as const,
        duration: '8주 (진행 중)',
      },
      {
        id: 'task-4',
        title: '코드 리뷰 프로세스 개선',
        description: '팀의 코드 리뷰 프로세스를 개선하고 품질 기준 수립',
        memberContribution:
          '• 코드 리뷰 가이드라인 및 베스트 프랙티스 수립\n• ESLint와 Prettier를 활용한 자동 코드 품질 검사 도입\n• 효과적인 코드 리뷰를 위한 팀 교육 세션 진행\n• 일관된 PR 작성을 위한 템플릿 제작\n• 유지보수가 쉬운 코드 작성을 위한 멘토링',
        aiSummary:
          '팀 개발 문화와 코드 품질 향상에 크게 기여했습니다. 리뷰 프로세스를 체계적으로 수립하여 코드 품질이 눈에 띄게 향상되었고, 팀 협업 역시 강화되었습니다. 정기적인 코드 리뷰 문화가 정착되면서 개발자 간 기술 공유도 자연스럽게 이루어졌습니다. 자동화 도구의 도입은 유지보수 효율성을 높이고 신규 팀원의 온보딩 속도를 개선하는 데에도 긍정적 영향을 주었습니다.',
        status: 'completed' as const,
        duration: '3주',
      },
    ],
  },

  '2': {
    member: {
      id: '2',
      name: '이지영',
      role: 'UI/UX Designer',
      department: 'Design',
    },
    tasks: [
      {
        id: 'task-5',
        title: 'Dashboard UI Redesign',
        description: 'Complete redesign of the main dashboard interface for better user experience',
        memberContribution:
          '• Conducted comprehensive user research and usability testing\n• Created detailed wireframes and interactive prototypes\n• Designed responsive layouts for desktop and mobile platforms\n• Collaborated with development team for seamless implementation\n• Established new design system components and guidelines',
        aiSummary:
          'Exceptional design thinking and user-centered approach resulted in a 35% improvement in user satisfaction scores. The systematic research methodology and attention to accessibility standards demonstrate professional excellence.',
        status: 'completed' as const,
        duration: '5 weeks',
      },
      {
        id: 'task-6',
        title: 'Design System Documentation',
        description: 'Create comprehensive design system documentation and component library',
        memberContribution:
          '• Developed comprehensive design system with 50+ reusable components\n• Created detailed documentation with usage guidelines and examples\n• Established color palettes, typography scales, and spacing standards\n• Conducted design system training sessions for the team\n• Implemented version control for design assets using Figma',
        aiSummary:
          'Outstanding contribution to organizational design consistency and efficiency. The comprehensive design system has significantly reduced design and development time while improving overall product coherence.',
        status: 'completed' as const,
        duration: '4 weeks',
      },
      {
        id: 'task-7',
        title: 'User Experience Research Initiative',
        description: 'Lead user research efforts to inform product development decisions',
        memberContribution:
          '• Designed and conducted user interviews with 25+ participants\n• Created user personas and journey maps based on research findings\n• Performed competitive analysis of industry best practices\n• Presented actionable insights to product and engineering teams\n• Established ongoing user feedback collection processes',
        aiSummary:
          'Excellent research methodology and insight generation. The user research findings have directly influenced product roadmap decisions and resulted in more user-focused feature development.',
        status: 'in-progress' as const,
        duration: '6 weeks (ongoing)',
      },
    ],
  },
};

const evaluationOptions = [
  {
    value: 'outstanding',
    label: '탁월',
    subLabel: 'Outstanding',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    selectedColor: 'bg-green-600',
    textColor: 'text-white',
  },
  {
    value: 'excellent',
    label: '우수',
    subLabel: 'Excellent',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    selectedColor: 'bg-blue-600',
    textColor: 'text-white',
  },
  {
    value: 'satisfactory',
    label: '보통',
    subLabel: 'Satisfactory',
    color: 'bg-primary',
    hoverColor: 'hover:bg-primary/90',
    selectedColor: 'bg-primary',
    textColor: 'text-white',
  },
  {
    value: 'needs-improvement',
    label: '미흡',
    subLabel: 'Needs Improvement',
    color: 'bg-yellow-300',
    hoverColor: 'hover:bg-yellow-300',
    selectedColor: 'bg-yellow-300',
    textColor: 'text-white',
  },
  {
    value: 'insufficient',
    label: '부족',
    subLabel: 'Insufficient',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-500',
    selectedColor: 'bg-red-500',
    textColor: 'text-white',
  },
];

export function QualitativeEvaluation({ memberId }: QualitativeEvaluationProps) {
  const router = useRouter();
  const [evaluations, setEvaluations] = useState<{ [taskId: string]: string }>({});
  const [isSaved, setIsSaved] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const memberData = mockMemberTasks[memberId];

  useEffect(() => {
    const saved = localStorage.getItem(`qualitative-evaluation-${memberId}`);
    if (saved) {
      setEvaluations(JSON.parse(saved));
    }
  }, [memberId]);

  if (!memberData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Member Not Found</h2>
        <p className="text-gray-600 mt-2">The requested team member could not be found.</p>
        <Button onClick={() => router.push('/team/overview')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Team Overview
        </Button>
      </div>
    );
  }

  const { member, tasks } = memberData;

  const handleEvaluationChange = (taskId: string, value: string) => {
    setEvaluations((prev) => ({
      ...prev,
      [taskId]: value,
    }));
    setShowValidation(false);
  };

  const handleSave = () => {
    const incompleteTasks = tasks.filter((task: Task) => !evaluations[task.id]);

    if (incompleteTasks.length > 0) {
      setShowValidation(true);
      return;
    }

    localStorage.setItem(`qualitative-evaluation-${memberId}`, JSON.stringify(evaluations));
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
      router.push('/team/overview');
    }, 2000);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getEvaluationColor = (value: string) => {
    const option = evaluationOptions.find((opt) => opt.value === value);
    return option?.color || 'bg-gray-400';
  };

  const completedEvaluations = Object.keys(evaluations).length;
  const totalTasks = tasks.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/team/overview')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Team Overview
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Progress: {completedEvaluations}/{totalTasks} tasks evaluated
          </span>
        </div>
      </div>

      {/* Member Profile */}
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
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Qualitative Evaluation - {member.name}
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

      {/* Validation Alert */}
      {showValidation && (
        <Alert variant="destructive">
          <AlertDescription>모든 업무에 대한 평가를 완료한 후 저장해 주세요.</AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {isSaved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            정성 평가가 성공적으로 저장되었습니다. 팀 개요 화면으로 이동합니다.
          </AlertDescription>
        </Alert>
      )}

      {/* Task Evaluations */}
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
                {evaluations[task.id] && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getEvaluationColor(evaluations[task.id])}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">평가 완료</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  팀원 기여 내용
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
                    const isSelected = evaluations[task.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleEvaluationChange(task.id, option.value)}
                        className={`
            relative p-3 rounded-lg border-2 transition-all duration-200 text-center
            ${
              isSelected
                ? `${option.selectedColor} border-transparent ${option.textColor} shadow-lg scale-105`
                : `bg-white border-gray-200 text-gray-700 ${option.hoverColor} hover:border-gray-300 hover:shadow-md`
            }
            focus:outline-none focus:ring-0focus:ring-offset-0
          `}
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
              <CheckCircle className="mr-2 h-4 w-4" />
              저장되었습니다
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              평가 저장하기
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
