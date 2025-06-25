# 1️⃣ Build Stage
FROM node:20-alpine AS builder

# Build 시 필요한 변수 정의
ARG NEXT_PUBLIC_API_URL
ARG JWT_SECRET
# NEXT_PUBLIC_API_URL은 NEXT.js가 정적 페이지 생성 시 사용
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# JWT_SECRET은 서버 로직에서만 사용할 것이지만, 원하면 그대로 ENV로도 지정 가능
ENV JWT_SECRET=$JWT_SECRET

# 작업 디렉토리
WORKDIR /app

# 필요한 파일 복사
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 전체 소스 복사
COPY . .

# Next.js 빌드
RUN pnpm run build

# 2️⃣ Production Stage
FROM node:20-alpine AS runner
WORKDIR /app

# 필요한 파일만 복사
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/next.config.js next.config.js

# 포트 설정
EXPOSE 3000
ENV NODE_ENV=production
# NEXT_PUBLIC_API_URL은 그대로 유지
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# JWT_SECRET도 원하면 그대로 ENV로 전달 가능 (서버 사이드 로직에서만 접근 가능!)
ENV JWT_SECRET=$JWT_SECRET

# 실행
CMD ["pnpm", "start"]
