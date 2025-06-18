'use client';

import { IndividualQuarterReportDetail } from './individual-quarter-report-detail';
import { IndividualYearEndReportDetail } from './individual-year-end-report-detail';
import { TeamQuarterReportDetail } from './team-quarter-report-detail';
import { TeamYearEndReportDetail } from './team-year-end-report-detail';

interface PerformanceReportPageProps {
  reportId: number;
}

// Sample data for different report types
const reportData: { [key: number]: any } = {
  1: {
    id: 1,
    type: 'individual-quarter',
    title: '2024 4분기 성과 리포트',
    employee: {
      name: '김민철',
      department: '클라우드 개발 3팀',
      startDate: '2024-10-07',
      endDate: '2024-12-27',
    },
    finalScore: 4.5,
    compareText: '상위 30%',
    teamGoals: [
      {
        goalName: 'Cloud Professional 업무 진행 통한 BR/UR 개선',
        assigned: '배정',
        content: [
          'Cloud Professional Service 비용절감 패키지 v1.0 개발',
          'BR/UR 개선 제안서 작성 및 팀 내 승인 완료',
        ],
        contributionCount: 2,
      },
      {
        goalName: 'CSP 파트너쉽 강화 통한 원가개선',
        assigned: '미배정',
        content: [],
        contributionCount: 0,
      },
      {
        goalName: 'Cloud 마케팅 및 홍보 통한 대외 Cloud 고객확보',
        assigned: '배정',
        content: [
          'Korea Cloud Summit 2024 부스 설계 및 준비 작업 완료',
          '현대중공업 대상 Manufacturing IoT와 Cloud 연계 Private 이벤트 기획',
        ],
        contributionCount: 2,
      },
      {
        goalName: '글로벌 사업 Tech-presales 진행',
        assigned: '미배정',
        content: [],
        contributionCount: 0,
      },
    ],
    keyAchievements: [
      '총 수행 활동: 9건 (목표 대비 평가)',
      '목표 참여도: 2/4개 목표 참여 (50% 커버리지)',
      'Cloud Professional 업무 진행 통한 BR/UR 개선: 4건',
      'Cloud 마케팅 및 홍보 통한 대외 cloud 고객확보: 5건',
    ],
    peerFeedback: [
      {
        type: 'positive',
        keywords: [
          '열정/몰입',
          '긍정에너지',
          '협업역량',
          '책임감',
          '회복탄력성',
          '문제해결력',
          '신뢰성',
        ],
      },
      {
        type: 'negative',
        keywords: ['감정 표현 부족', '감정조절 미흡', '이기적 태도'],
      },
    ],
    quarterlyPerformanceSummary: {
      summaryText:
        '김민철 매니저님은 2024-10-07 ~ 2024-12-27 기간 동안 총 12건의 활동을 수행하며 특히 Cloud Professional 업무와 Cloud 마케팅 및 홍보 분야에서 두드러진 성과를 보였습니다. Cloud Professional 서비스 비용절감 패키지 v1.0 개발 및 BR/UR 개선 제안서 작성을 통해 내부 프로세스 개선에 기여하였으며, 이는 4건의 활동을 통해 목표 달성에 중요한 역할을 하였습니다. 또한, Korea Cloud Summit 2024 부스 설계 및 현대중공업 대상 Private 이벤트 기획을 포함한 5건의 활동으로 고객 확보 및 리드 생성에 크게 기여하였습니다. 그러나 글로벌 사업 Tech-presales 및 CSP 파트너십 강화 분야에서는 활동이 없어 이 부분에 대한 개선이 필요합니다',
    },
    workAttitude: [
      '고객 만족도와 타부서 협업 참여도 항목에서 상위 20% 이내의 성과를 보여주어, 고객 중심의 문제 해결력과 조직 내 협업 역량이 탁월함을 보여줍니다.',
      '고객피드백 반영, 자기계발계획 이행률, 사내 교육 참여도, 발표 주도 항목은 상위 21~40 % 이내에 해당하여, 고객 응대와 자기 발전, 조직 내 발표 역량이 안정적인 수준입니다.',
      '후배 / 신입 멘토링, 사내 행사 참여도, 커밋 수, 업무 채팅 수 항목 또한 상위 21~40 % 이내로, 조직 기여와 업무 몰입도에서 양호한 성과를 보입니다.',
      '출장 횟수, 오버타임 근무 시간, 자기평가 - 타인평가 일치도 항목 역시 상위 21~40 % 이내에 해당하여, 업무 실행력과 자기 인식의 일관성이 안정적입니다.',
    ],
    growthSuggestions: [
      '이번 분기 동안 Cloud Professional 업무와 Cloud 마케팅 및 홍보 활동에서 높은 성과를 보였습니다. 특히, Cloud Professional Service 비용절감 패키지 개발과 대규모 리드 확보를 통해 상위 20%의 성과를 보였으며, 이를 통해 고객 중심의 문제 해결력과 응대 역량에 탁월함을 입증하였습니다.',
      '그러나 글로벌 사업 Tech - presales와 CSP 파트너쉽 강화 관련 활동에는 주요 활동이 없었으며, 이 부분에 대한 개선이 필요해 보입니다.글로벌 시장 진출을 위한 활동을 강화하고, CSP 파트너쉽을 통한 원가 개선에 더욱 집중해보는 것이 도움이 될 수 있습니다.',
      '동료 피드백에서는 열정 / 몰입, 긍정에너지, 협업역량 등의 긍정적인 키워드가 언급되었으나, 감정 표현 부족, 감정조절 미흡, 이기적 태도 등의 보완 키워드도 확인되었습니다.이에 따라, 감정 표현을 조금 더 유연하게 전달하고, 협업 시 타인의 의견을 존중하는 태도를 보여주는 것이 도움이 될 수 있습니다.',
      '마지막으로, 자기평가 - 타인 평가 일치도 항목에서 상위 21~40 % 의 성과를 보였습니다.이를 통해 자기 인식과 타인의 평가 간 일치도가 양호한 수준임을 확인할 수 있으나, 이를 더욱 향상시키기 위해 자신의 업무 수행에 대한 평가를 주기적으로 점검하고, 필요한 경우 타인의 피드백을 적극적으로 수용해보는 것도 좋겠습니다.',
    ],
    finalComment:
      '김민철 매니저님은 이번 분기 동안 Cloud Professional 업무와 Cloud 마케팅 활동을 중심으로 높은 성과를 도출하였습니다.\n주요 업무로는 Cloud Professional Service 비용절감 패키지 개발, BR/UR 개선 제안서 작성, Cloud 자원최적화 Service 패키지 완성 등이 있었으며, 고객 만족도와 고객피드백 반영, 타부서 협업 참여도 등에서 상위 20%의 성과를 보였습니다.\n동료 피드백에서는 열정/몰입, 협업역량, 책임감 등의 키워드가 반복적으로 언급되어, 팀 내에서의 협업과 책임감 있는 업무 수행에서 강점을 드러냈습니다.\n이번 분기는 김민철님의 고객 중심적 접근과 철저한 시장 분석을 통한 목표 지향적 결과 도출이 돋보였던 시기로 평가할 수 있습니다.\n다만, CSP 파트너쉽 관련 활동 강화와 동료 피드백에서 언급된 감정 표현 부족, 협업능력 부족 등의 측면에서 추가적인 보완이 이루어진다면 향후 성과의 완성도를 더욱 높일 수 있을 것입니다.',
  },
  2: {
    id: 2,
    type: 'individual-year-end',
    title: '2024 연말 성과 리포트',
    employee: {
      name: '박준호',
      department: 'Product Management',
      job: '시니어 개발자',
      startDate: '2024-01-01',
      endDate: '2024-12-27',
    },
    finalScore: 4.6,
    skValues: [
      {
        category: '팀 목표 기여도',
        score: 4.5,
        summary: '모든 분기에서 팀 주요 목표를 직접적으로 견인하였으며...',
      },
      {
        category: '4P',
        values: [
          {
            category: 'Passionate',
            score: 4.7,
            summary: '새로운 과제에 자발적으로 참여하고',
          },
          {
            category: 'Professional',
            score: 4.6,
            summary: '문서 정리, 프로세스 운영 등에서 높은 전문성과 완성도..',
          },
          {
            category: 'Proactive',
            score: 4.8,
            summary: '장애 사전 대응, 고객 이슈 분석 등 선제적 활동 다수',
          },
          {
            category: 'People',
            score: 4.4,
            summary: '팀 내부 협업 및 멘토링 기여도가 높으나, 회의 시 주도 발언 ..',
          },
        ],
      },
    ],
    quarterlyPerformance: [
      {
        quarter: '1분기',
        rating: '2nd',
        summary: 'Successfully launched new platform features with positive user feedback',
      },
      {
        quarter: '2분기',
        rating: '3rd',
        summary: 'Led cross-functional initiative to improve system performance',
      },
      {
        quarter: '3분기',
        rating: '1st',
        summary: 'Achieved 100% of quarterly OKRs with exceptional stakeholder satisfaction',
      },
      {
        quarter: '4분기',
        rating: '2nd',
        summary: 'Completed annual strategy planning with clear execution roadmap',
      },
    ],
    keyAchievements: [
      'Led successful product strategy resulting in 25% user growth',
      'Implemented new development processes improving team efficiency by 30%',
      'Mentored 2 junior PMs and contributed to hiring 3 new team members',
    ],
    peerFeedback: [
      {
        type: 'positive',
        keywords: [
          '열정/몰입',
          '긍정에너지',
          '협업역량',
          '책임감',
          '회복탄력성',
          '문제해결력',
          '신뢰성',
        ],
      },
      {
        type: 'negative',
        keywords: ['감정 표현 부족', '감정조절 미흡', '이기적 태도'],
      },
    ],
    growthSuggestions: [
      '이번 1년 동안 Cloud Professional 업무와 Cloud 마케팅 및 홍보 활동에서 높은 성과를 보였습니다. 특히, Cloud Professional Service 비용절감 패키지 개발과 대규모 리드 확보를 통해 상위 20%의 성과를 보였으며, 이를 통해 고객 중심의 문제 해결력과 응대 역량에 탁월함을 입증하였습니다.',
      '그러나 글로벌 사업 Tech - presales와 CSP 파트너쉽 강화 관련 활동에는 주요 활동이 없었으며, 이 부분에 대한 개선이 필요해 보입니다. 글로벌 시장 진출을 위한 활동을 강화하고, CSP 파트너쉽을 통한 원가 개선에 더욱 집중해보는 것이 도움이 될 수 있습니다.',
      '동료 피드백에서는 열정 / 몰입, 긍정에너지, 협업역량 등의 긍정적인 키워드가 언급되었으나, 감정 표현 부족, 감정조절 미흡, 이기적 태도 등의 보완 키워드도 확인되었습니다. 이에 따라, 감정 표현을 조금 더 유연하게 전달하고, 협업 시 타인의 의견을 존중하는 태도를 보여주는 것이 도움이 될 수 있습니다.',
      '마지막으로, 자기평가 - 타인 평가 일치도 항목에서 상위 21~40 % 의 성과를 보였습니다. 이를 통해 자기 인식과 타인의 평가 간 일치도가 양호한 수준임을 확인할 수 있으나, 이를 더욱 향상시키기 위해 자신의 업무 수행에 대한 평가를 주기적으로 점검하고, 필요한 경우 타인의 피드백을 적극적으로 수용해보는 것도 좋겠습니다.',
    ],
    finalComment:
      '박준호 has been a cornerstone of the Product Management team throughout 2023, consistently driving strategic initiatives and delivering exceptional results.',
  },
  3: {
    id: 3,
    type: 'team-quarter',
    title: '2026 3분기 성과 리포트',
    employee: {
      name: '황정민',
      department: '고객서비스운영팀',
      startDate: '2024-10-07',
      endDate: '2024-12-27',
    },
    teamGoals: [
      {
        goalName: '운영안정성확보',
        content: ['SLA 99% 달성, 장애건수 최소화'],
        achievement: '92%',
        teamAvg: '85%',
        comparison: '우수',
      },
      {
        goalName: '고객 신뢰 강화',
        content: ['고객만족도 4.5점'],
        achievement: '87%',
        teamAvg: '82%',
        comparison: '상위권',
      },
      {
        goalName: '지식내재화 및 전파',
        content: ['주요 이슈 리뷰 분석 및 팀 전파'],
        achievement: '84%',
        teamAvg: '79%',
        comparison: '개선필요',
      },
      {
        goalName: '신규관리안 도입/체계화',
        content: ['3개분야 시범적용'],
        achievement: '88%',
        teamAvg: '86%',
        comparison: '유사수준',
      },
    ],
    keyAchievements: [
      '귀하의 팀은 동일 기능 내 타팀 대비 전 항목에서 평균 이상을 상회하고 있음',
      '리스크 대응 및 내부 안정성 확보 항목에서 전사 내 가장 우수한 운영 성과 기록',
    ],
    memberAnalysis: [
      {
        name: '황정호',
        mainAchievement: '운영안정성/고객 대응',
        valueDetails: 'SLA 100% 달성, 신규 운영 노팅',
        peerKeywords: ['신뢰감', '정투력', '주도성'],
        overallRank: '상위 20%',
      },
      {
        name: '청일점',
        mainAchievement: '지식 내재화/전파',
        valueDetails: '주요 이슈 리뷰 분석 10건 및 팀 전파 2건',
        peerKeywords: ['협업 일원화', '통합', '유연함'],
        overallRank: '상위 25%',
      },
    ],
    contributionCriteria: {
      evaluationBasis: [
        '업무성과, 팀 목표 연계도, 동료 인식, 주도성, 성장성 등 5개 항목 기반 종합 정성평가',
        '상위 20%: 리더십 후보군으로 육성 권장',
        '평균 이하 및 개선 대상: 커뮤니케이션, 주도성 중심의 피드백 필요',
      ],
    },
    hrSuggestions: [
      {
        target: '홍정호',
        recommendation:
          '전 항목 고른 기여. SLA 및 고객 대응에 안정적 리더 역할. 외부 프로젝트 리더십 기회 부여 추천',
      },
      {
        target: '윤사람 & 김공정',
        recommendation: '기술적 전문성 및 소통역량 육성 필요',
      },
    ],
    orgSuggestions: {
      suggestion: '구성원 간 공통 개선 키워드: 소통, 전문성',
      action: '→ 본기 내 커뮤니케이션 강화 워크숍 or 내부 발표회 운영 추천',
    },
    finalComment:
      '고객서비스운영팀은 3분기 기준 상위권 성과를 기록했으며, 특히 홍정호 등 책임감 중심의 고기여 인력이 퍼포먼스를 견인하고 있습니다. 각 구성원의 기여도 수준과 동료 인식이 명확히 구분되고 있어, 다음 분기 조직 내 역할 재배치 또는 성장지원 전략 수립에 매우 유의미한 타이밍입니다.',
  },
  4: {
    id: 4,
    type: 'team-year-end',
    title: '2026년 팀 운영평가 리포트',
    employee: {
      name: '황정민',
      department: '고객서비스운영팀',
      startDate: '2026-01-01',
      endDate: '2026-11-30',
    },
    teamGoals: [
      {
        goalName: '운영안정성확보',
        content: ['SLA 99% 달성, 장애건수 최소화'],
        achievement: '92%',
        comparison: '우수',
      },
      {
        goalName: '고객불만감소',
        content: ['고객만족도 4.5점'],
        achievement: '87%',
        comparison: '상위권',
      },
      {
        goalName: '지식내재화 및 전파',
        content: ['주요 이슈 리뷰 분석 및 팀 전파'],
        achievement: '84%',
        comparison: '평균',
      },
      {
        goalName: '신규관리안 도입/체계화',
        content: ['3개 분야 시범적용'],
        achievement: '88%',
        comparison: '평균',
      },
    ],
    keyAchievements: [
      '전사 16개 팀 중 10위권 달성',
      'SLA 안정성, 고객 대응 품질 지표에서 전사 상위 10% 내 목표 달성율',
      '동일 기능 내 타팀 대비 전 항목 평균 이상',
      'Risk 대응 및 내부 안정성 확보 부문에서 전사 내 우수한 운영 성과 기록',
    ],
    memberAnalysis: [
      {
        name: '홍길동',
        overallRank: '상위 20%',
        '4P': {
          Passionate: '46점',
          Professional: '49점',
          Proactive: '48점',
          People: '48점',
        },
        finalScore: '48',
        specialNote: 'SLA 주도적 기여, 타부서문고',
      },
      {
        name: '김유신',
        overallRank: '상위 25%',
        '4P': {
          Passionate: '47점',
          Professional: '47점',
          Proactive: '46점',
          People: '47점',
        },
        finalScore: '47',
        specialNote: '',
      },
    ],
    hrSuggestions: [
      {
        target: '홍길동',
        recommendation:
          '전 항목 고른 기여, 특히 SLA 및 고객 대응에 안정적 리더 역할. 외부 프로젝트 리더십 기회 부여 추천',
      },
      {
        target: '윤사람 & 김공정',
        recommendation: '기술적 전문성과 소통역량 육성 필요',
      },
    ],
    finalComment:
      '고객서비스운영팀은 3분기 전사 기준 상위권 성과를 기록했으며, 특히 홍길동, 김유신 중심의 고기여 인력이 퍼포먼스를 견인하고 있습니다. 각 구성원별 기여도 수준과 동료 인식 기반 강약점이 명확히 구분되고 있어, 다음 분기 조직 내 역할 재배치 또는 성장지원 전략 수립에 매우 유의미한 타이밍입니다.',
  },
};

export function PerformanceReportPage({ reportId }: PerformanceReportPageProps) {
  const report = reportData[reportId];

  if (!report) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Report Not Found</h2>
        <p className="text-gray-600 mt-2">The requested performance report could not be found.</p>
      </div>
    );
  }

  // Route to appropriate component based on report type
  switch (report.type) {
    case 'individual-quarter':
      return <IndividualQuarterReportDetail reportData={report} />;
    case 'individual-year-end':
      return <IndividualYearEndReportDetail reportData={report} />;
    case 'team-quarter':
      return <TeamQuarterReportDetail reportData={report} />;
    case 'team-year-end':
      return <TeamYearEndReportDetail reportData={report} />;
    default:
      return (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Unknown Report Type</h2>
          <p className="text-gray-600 mt-2">This report type is not supported yet.</p>
        </div>
      );
  }
}
