FROM node:22-alpine AS builder
WORKDIR /workspace

COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile -w --shamefully-hoist
RUN pnpm nx run frontend:build --configuration=production

FROM nginx:alpine
COPY --from=builder /workspace/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]