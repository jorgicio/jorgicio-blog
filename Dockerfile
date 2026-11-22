# Dockerfile
# -------------------------------------------------
# 1️⃣  Build stage – install deps & copy source
# -------------------------------------------------
FROM node:24-alpine AS base

# Enable corepack so we can use pnpm (Node 24 includes corepack)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package.json and pnpm-lock.yaml first (leverages Docker layer caching)
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Approve all build scripts so pnpm install can proceed
RUN CI=true pnpm approve-builds --all --yes

# Install dependencies (no lockfile changes needed since we approved builds)
RUN CI=true pnpm install --no-frozen-lockfile

# Copy the whole source tree (includes node_modules after the install)
COPY . .

# Set environment variables that Strapi reads
ENV NODE_ENV=development
ENV DATABASE_CLIENT=postgres      
ENV DATABASE_HOST=db              
ENV DATABASE_PORT=5432
ENV DATABASE_NAME=strapi
ENV DATABASE_USERNAME=strapi
ENV DATABASE_PASSWORD=strapi

# Run the development server (watch mode) — pnpm adds node_modules/.bin to PATH
CMD ["pnpm", "develop"]