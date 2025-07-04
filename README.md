# SKore (성과 관리 플랫폼)


회사의 구성원들을 위한 성과 관리 웹 플랫폼입니다.  
개인의 동료 평가부터 분기&연말별 리포트, 팀 피드백까지 통합적으로 확인가능합니다.

---

## 🚀 주요 기능

- 👤 **회원가입 및 로그인**
- 🏁 **목표 설정 및 달성률 확인**
- 🤝 **동료 평가 및 키워드 피드백**
- 📊 **개인/팀 성과 리포트 조회**
- ⚙️ **데이터 설정 및 사용자 정보 수정**
- 🔐 **JWT 기반 인증, Zustand 상태 관리**

---

## 🧪 개발 환경 세팅

```
# 1. 패키지 설치
pnpm install

# 2. 환경변수 설정
cp .env.example .env
➤ .env 파일에 API URL 등 입력

# 3. 개발 서버 실행
pnpm dev
```
### 환경변수 예시 (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```
## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS, ShadCN UI
- **상태 관리**: Zustand
- **인증**: JWT (Access/Refresh Token), HttpOnly Cookie
- **배포**: Docker, Vercel 예정
  
## 📂 폴더 구조
```
📦 lead-me
├── app/                     # Next.js 15 App Router 기반 라우팅
│   ├── api/                 # API Route 핸들링 (e.g., login, refresh)
│   ├── dashboard/           # 대시보드 페이지
│   ├── evaluation/          # 주간/피어 평가 관련 라우트
│   ├── login/               # 로그인 페이지
│   ├── performance/         # 개인 성과 리포트
│   ├── reports/             # 리포트 상세 페이지
│   ├── settings/            # 계정 설정 페이지
│   ├── signup/              # 회원가입 페이지
│   ├── team/                # 팀 평가/구성원 평가 관련 페이지
│   └── layout.tsx          # 공통 레이아웃 설정
│
├── components/              # UI 및 도메인 컴포넌트 분리
│   ├── auth/
│   ├── dashboard/
│   ├── evaluation/
│   ├── performance/
│   ├── reports/
│   ├── settings/
│   ├── team/
│   └── ui/                  # 공통 UI 컴포넌트 (Sidebar 등)
│
├── hooks/                   # 커스텀 훅 모음
├── lib/                     # API 유틸, fetch 관련 설정 등
├── mock/                    # 목 데이터
├── public/                  # 정적 파일
├── store/                   # Zustand 기반 전역 상태관리
│   ├── peerKeywordEvaluationStore.tsx
│   ├── useUserStore.tsx
│   └── weeklyEvaluationStore.tsx
├── styles/                  # 전역 스타일
│   └── globals.css
├── utils/                   # 유틸 함수, API 모듈 등
│   └── api.ts
├── middleware.ts            # 인증 관련 미들웨어
├── Dockerfile               # Docker 배포 설정
└── .env                     # 환경변수 설정
```

