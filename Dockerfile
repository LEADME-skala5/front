# 1️⃣ Build Stage
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

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

ARG NEXT_PUBLIC_API_URL

RUN npm install -g pnpm

# 필요한 파일만 복사
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/next.config.mjs next.config.mjs

# 포트 설정
EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 실행
CMD ["pnpm", "start"]
