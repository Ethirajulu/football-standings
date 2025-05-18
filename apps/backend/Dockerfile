FROM node:22-alpine AS builder
WORKDIR /workspace

COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile -w --shamefully-hoist
RUN npx nx run backend:build --configuration=production

FROM node:22-alpine AS deployer
WORKDIR /app

COPY --from=builder /workspace/apps/backend/dist .
COPY --from=builder /workspace/node_modules ./node_modules
ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "main.js"]