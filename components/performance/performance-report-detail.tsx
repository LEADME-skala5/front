"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share } from "lucide-react";

interface PerformanceReportDetailProps {
  reportId: number;
}

// Mock data for different report types
const reportData: { [key: number]: any } = {
  1: {
    id: 1,
    type: "year-end",
    title: "2026년 평가 Report",
    employee: {
      name: "홍길동",
      position: "팀원",
      department: "고객서비스운영팀",
      period: "2026-01-01 ~ 2026-11-30",
      evaluator: "Virtual 홍길동 & X.Cel",
    },
    finalScore: "4.5점",
    skValues: [
      {
        category: "유저 탐구욕(가치)",
        score: "4점",
        summary:
          "모든 업무에서 유저 중심으로 생각하고 고객 만족도를 높이기 위해 노력하고 있습니다...",
      },
      {
        category: "Passionate",
        score: "4점",
        summary:
          "새로운 업무에 대한 열정으로 프로젝트에 적극적으로 참여하고 있습니다...",
      },
      {
        category: "Professional",
        score: "4점",
        summary:
          "전문성을 바탕으로 업무를 수행하며 새로운 지식 습득에 노력하고 있습니다...",
      },
      {
        category: "Proactive",
        score: "4점",
        summary:
          "적극적인 자세로 업무에 임하며 문제 해결을 위해 노력하고 있습니다...",
      },
      {
        category: "People",
        score: "4점",
        summary:
          "팀 내 협업을 통해 업무를 수행하며 동료들과 좋은 관계를 유지하고 있습니다...",
      },
    ],
    quarterlyPerformance: [
      {
        quarter: "1분기",
        rating: "2위",
        summary: "업무 성장성에 대한 의지가 높아 보입니다...",
      },
      { quarter: "2분기", rating: "3위", summary: "고객 문의 대응..." },
      { quarter: "3분기", rating: "1위", summary: "업무 100% 수행 완료..." },
      { quarter: "4분기", rating: "2위", summary: "내부 문서 대응..." },
    ],
    peerTalk: {
      positive: "신뢰감, 주도성, 끈끈함, 책임감, 정리력",
      negative: "표현력, 간결함, 요약 부족, 소통",
      suggestions: ["외부 고객 대상 커뮤니케이션 역량 강화", "전략 관점 확장"],
    },
    growthSuggestions: [
      "1. 외부 커뮤니케이션 역량 강화",
      "- 고객사 대상 설명, 문서 전달 등에서 핵심 요소를 먼저 정리하는 구조화 표현 역량이 도움이 될 수 있습니다.",
      "2. 전략 관점 확장",
      "- IT 정책 등이 담아, 조직 전반에 대한 사전 리스크 인식 및 개선안 제시 역량을 성장 불편이 필요합니다.",
    ],
    finalComment:
      "홍길동님은 25년간 함께 동안 고객서비스운영팀의 핵심 운영 특성을 인정적으로 담당하며 팀 성과를 실적적으로 이끌어낸 중심 인재입니다. 운영 안정성, 고객 대응 품질, 문서화 체계 정비 등 다양한 분야에서 작업적인 기여와 실천 중심의 태도가 돋보였습니다. 고생 많으셨습니다.",
  },
  2: {
    id: 2,
    type: "quarterly",
    title: "3분기 Feedback Report",
    employee: {
      name: "홍길동",
      position: "팀원",
      department: "고객서비스운영팀",
      period: "2026-07-01 ~ 2026-09-26 (26년 3분기)",
      evaluator: "Virtual 홍길동 & X.Cel",
    },
    teamGoals: [
      {
        goal: "운영 안정성 확보",
        content: "업무 성장성에 대한 의지가 높아 보입니다",
        achievement: "배정",
        contribution: "핵심 기여 (높은 성취 기여)",
      },
      {
        goal: "고객 만족도",
        content: "고객 문의 4순위",
        achievement: "배정",
        contribution: "상위 수준의",
      },
      {
        goal: "자신 내부 업무 관리",
        content: "주요 업무 범위 - 업무 담당 관리",
        achievement: "배정",
        contribution: "순조로운 담당 업무 중심 역량",
      },
      {
        goal: "신규 업무 운영 담당 개발",
        content: "외부 업무 상황 대응",
        achievement: "미배정",
        contribution: "-",
      },
    ],
    performanceSummary: [
      "홍길동님은 팀 목표 4개 중 3개 과제에 기여하였습니다.",
      "특히 운영 안정성 확보와 고객서비스 강화 차원에서 3분기 팀 퍼포먼스 견인자 역할을 수행하였습니다.",
      "- 장애 건수 0건 추진 (3건 장애 이슈 사전 차단) → SLA 100% 추진",
      "- 고객 응답 만족도 4.7/5점 → 고객사 담당자 정기 평가 최고 등급",
      "- 이슈 사항 특성 2건 팀 내 전파 → 팀 정기 교육 자료 반영",
    ],
    additionalNote:
      "이러한 성과는 팀 내에서도 상위 20% 수준의 기여도로 분류되며, 안정성과 실천 중심의 높은 기여도 평가됩니다.",
    peerTalk: {
      positive: "긍정: 신뢰감, 주도성, 끈끈함, 책임감, 정리력",
      negative: "부정: 표현력, 간결함, 요약 부족, 소통",
      feedback: [
        "현업 중 '일을 맡고 말일 수 있는 동료', '항상 믿시가 잘 정리되어있어 따라이 최다'는 의견이 있으며,",
        "반면, '이게 어떤 설명 시 메시지가 정확하게 느껴질 때가 있다', '핵심을 먼저 전달하면 좋을 것 같다'는 피드백을 주목할 수 있습니다.",
      ],
      keywordNote:
        "이러한 키워드는 전반적인 신뢰 기반 업무 스타일의 강점을 인정하는 동시에, 고객 커뮤니케이션 역량의 정제 필요성을 함께 시사합니다.",
    },
    workAttitude: [
      "- 주도적으로 장애 대응 매뉴얼을 개선하고, 이를 팀 내 정착화",
      "- 팀 내 주간 회의에서 항상 핵심 내용까지 꼼꼼하게 프로젝트 팀 정 이해도 향상에 기여",
    ],
    keyPoints: [
      "- 외부 고객 대상 커뮤니케이션 성에서는 문장 구조를 간결화하고 핵심 메시지 전달하는 방식이 효과적일 수 있음",
      "- 팀표 자료 구성 시 요약 솔라이드의 시간적 명확성을 보완하면 성독력이 향상될 것임",
    ],
    growthDirection: [
      "- 전략적 사고의 확장 경험 및 교육 추천",
      "- 내외부 대상 발표기 회를 통한 표현 프레젠테이션 및 메시지 구조화 경험 방향",
    ],
    finalSummary:
      "홍길동님은 팀 목표 달성에 핵심 업무 수행자로 참여하였고 팀 성과 달성 중심의 높은 기여도를 보였습니다. PeerTalk에서도 긍정적, 정리력, 주도성과 같은 긍정 키워드가 중심이 되었으며, 단순 성과를 넘어 조직 내 신뢰의 순으로 인정받고 있습니다. 표현력과 메시지 간결성 측면의 보완이 이루어진 조건에서 업무 기대 기여도의 강점을 갖추리더의 잠재이 기대됩니다.",
  },
};

export function PerformanceReportDetail({
  reportId,
}: PerformanceReportDetailProps) {
  const router = useRouter();
  const report = reportData[reportId];

  if (!report) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">찾을 수 없는 페이지입니다.</p>
        <Button onClick={() => router.push("/performance")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          이전 페이지
        </Button>
      </div>
    );
  }

  if (report.type === "year-end") {
    return <YearEndReport report={report} router={router} />;
  } else {
    return <QuarterlyReport report={report} router={router} />;
  }
}

function YearEndReport({ report, router }: { report: any; router: any }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/performance")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            공유
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            다운로드
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <Card className="border-2 border-gray-200 rounded-3xl bg-white">
        <CardContent className="p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold underline decoration-2 underline-offset-4">
              {report.title}
            </h1>
          </div>

          {/* Employee Info */}
          <div className="mb-8 space-y-2">
            <div className="flex gap-8">
              <span>성명: {report.employee.name}</span>
              <span>직위: {report.employee.position}</span>
            </div>
            <div>소속: {report.employee.department}</div>
            <div>업무 수행기간: {report.employee.period}</div>
            <div>
              작성자:{" "}
              <span className="text-red-600">{report.employee.evaluator}</span>
            </div>
          </div>

          {/* Final Score */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-gray-300 px-2 py-1">
              ■ 최종평가: {report.finalScore}
            </h2>

            <div className="border border-gray-400">
              <table className="w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      평가항목
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      점수
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      실적요약
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.skValues.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2 font-medium">
                        {index === 0
                          ? "유저탐구욕(가치)"
                          : index === 1
                          ? "Passionate"
                          : index === 2
                          ? "Professional"
                          : index === 3
                          ? "Proactive"
                          : "People"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2 text-center font-bold">
                        {item.score}
                      </td>
                      <td className="border border-gray-400 px-4 py-2 text-sm">
                        {item.summary}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2 font-bold">
                      종합점수
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center font-bold">
                      {report.finalScore}
                    </td>
                    <td className="border border-gray-400 px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quarterly Performance */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-white px-2 py-1">
              ■ 분기별 업무목표 기여도
            </h2>

            <div className="border border-gray-400">
              <table className="w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      분기
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      팀내 기여도 순위
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      실적요약
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.quarterlyPerformance.map(
                    (item: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-4 py-2 text-center font-bold">
                          {item.quarter}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center font-bold">
                          {item.rating}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-sm">
                          {item.summary}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center text-2xl font-bold mb-4">...</div>
        </CardContent>
      </Card>

      {/* PeerTalk Section */}
      <Card className="border-2 border-gray-200 rounded-3xl bg-gray-50">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ PeerTalk
          </h2>
          <div className="mb-4">
            <div className="mb-2">- 긍정: {report.peerTalk.positive}</div>
            <div className="mb-4">- 부정: {report.peerTalk.negative}</div>
          </div>

          <h3 className="text-lg font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ 더 나은 성장을 위한 제언
          </h3>
          <div className="space-y-2 mb-6">
            {report.growthSuggestions.map(
              (suggestion: string, index: number) => (
                <div key={index} className="text-sm">
                  {suggestion}
                </div>
              )
            )}
          </div>

          <h3 className="text-lg font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ 종합 Comment
          </h3>
          <div className="text-sm leading-relaxed">{report.finalComment}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function QuarterlyReport({ report, router }: { report: any; router: any }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/performance")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Performance
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <Card className="border-2 border-gray-200 rounded-3xl bg-white">
        <CardContent className="p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold underline decoration-2 underline-offset-4">
              {report.title}
            </h1>
          </div>

          {/* Employee Info */}
          <div className="mb-8 space-y-2">
            <div className="flex gap-8">
              <span>성명: {report.employee.name}</span>
              <span>직위: {report.employee.position}</span>
            </div>
            <div>소속: {report.employee.department}</div>
            <div>업무 수행기간: {report.employee.period}</div>
            <div>
              작성자:{" "}
              <span className="text-red-600">{report.employee.evaluator}</span>
            </div>
          </div>

          {/* Team Goals Table */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-gray-300 px-2 py-1">
              ■ 팀 업무목표 및 개인 기여도
            </h2>

            <div className="border border-gray-400">
              <table className="w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      팀업무목표
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      내용
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      배정여부
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center font-bold">
                      공헌기여도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.teamGoals.map((goal: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2 font-medium">
                        {goal.goal}
                      </td>
                      <td className="border border-gray-400 px-4 py-2 text-sm">
                        {goal.content}
                      </td>
                      <td className="border border-gray-400 px-4 py-2 text-center">
                        {goal.achievement}
                      </td>
                      <td className="border border-gray-400 px-4 py-2 text-sm">
                        {goal.contribution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-gray-200 px-2 py-1">
              ■ 팀 업무목표 기반 3분기 성과 요약
            </h2>
            <div className="space-y-2">
              {report.performanceSummary.map((item: string, index: number) => (
                <div key={index} className="text-sm">
                  {item.startsWith("-") ? (
                    <div className="ml-4">{item}</div>
                  ) : (
                    <div>{item}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-blue-600 text-sm">
              {report.additionalNote}
            </div>
          </div>

          <div className="text-center text-2xl font-bold mb-4">...</div>
        </CardContent>
      </Card>

      {/* PeerTalk Section */}
      <Card className="border-2 border-gray-200 rounded-3xl bg-gray-50">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ PeerTalk
          </h2>
          <div className="mb-6 text-sm">
            3분기 동료들은 다음과 같은 키워드를 많이 선택해주었습니다.
          </div>
          <div className="mb-4">
            <div className="mb-2">- {report.peerTalk.positive}</div>
            <div className="mb-4">- {report.peerTalk.negative}</div>
          </div>

          <div className="mb-6 space-y-2">
            {report.peerTalk.feedback.map((feedback: string, index: number) => (
              <div key={index} className="text-sm">
                {feedback.includes("최다") ? (
                  <span>
                    {feedback.split("최다")[0]}
                    <span className="text-red-600 underline">최다</span>
                    {feedback.split("최다")[1]}
                  </span>
                ) : feedback.includes("것 같다") ? (
                  <span>
                    {feedback.split("것 같다")[0]}
                    <span className="text-red-600 underline">것 같다</span>
                    {feedback.split("것 같다")[1]}
                  </span>
                ) : (
                  feedback
                )}
              </div>
            ))}
          </div>

          <div className="mb-6 text-blue-600 text-sm">
            {report.peerTalk.keywordNote}
          </div>

          <h3 className="text-lg font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ 업무실행 및 태도
          </h3>
          <div className="space-y-2 mb-6">
            {report.workAttitude.map((item: string, index: number) => (
              <div key={index} className="text-sm">
                {item}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ 개선 포인트 및 제언
          </h3>
          <div className="space-y-2 mb-6">
            {report.keyPoints.map((point: string, index: number) => (
              <div key={index} className="text-sm">
                {point}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ 성장 방향
          </h3>
          <div className="space-y-2 mb-6">
            {report.growthDirection.map((direction: string, index: number) => (
              <div key={index} className="text-sm">
                {direction}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-4 bg-gray-300 px-2 py-1">
            ■ 총평
          </h3>
          <div className="text-sm leading-relaxed">{report.finalSummary}</div>
        </CardContent>
      </Card>
    </div>
  );
}
