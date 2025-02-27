# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Set network reliability configurations
ENV YARN_NETWORK_TIMEOUT=300000
ENV NODE_OPTIONS="--max-old-space-size=4096"


# Copy package files and install dependencies
COPY package.json yarn.lock ./

# Modified install command with retries and network optimization
RUN apk add --no-cache git && \
    yarn config set network-timeout 300000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn install --frozen-lockfile --network-timeout 600000 || \
    (sleep 5 && yarn install --frozen-lockfile --network-timeout 600000) || \
    (sleep 10 && yarn install --frozen-lockfile --network-timeout 600000)

# Copy remaining source code
COPY . .

# Set build args and environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:3000/api}
ENV NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-development_secret_key}

# Build the application
RUN yarn build

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Environment variables for runtime
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:3000/api}
ENV NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-development_secret_key}

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose the listening port
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]