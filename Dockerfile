FROM node:22-alpine AS base
WORKDIR /app

FROM base AS builder

# install package
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm &&  pnpm i

# copy required files
COPY src ./src
COPY public ./public
COPY tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs ./

# disable data collection
ENV NEXT_TELEMETRY_DISABLED=1

# build
RUN pnpm build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# copy required file for running
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# disable data collection
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node","server.js"]
