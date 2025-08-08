FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS builder
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]

