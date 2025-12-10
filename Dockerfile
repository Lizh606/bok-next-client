# 构建阶段
FROM node:24-alpine AS builder

# 添加构建参数用于缓存破坏
ARG BUILD_DATE
ARG VERSION

WORKDIR /app

# 全局安装 pnpm
RUN npm install -g pnpm && \
    npm install -g pnpm@latest && \
    pnpm config set registry https://registry.npmmirror.com/

# 复制依赖文件
COPY package.json pnpm-lock.yaml .npmrc ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 确保版本信息文件存在
RUN if [ ! -f public/version.json ]; then \
    echo "{\"version\": \"$(date +%s)\", \"buildTime\": \"$(date)\"}" > public/version.json; \
    fi

# 构建应用
RUN BUILD_DATE=${BUILD_DATE} VERSION=${VERSION} pnpm build

# 运行阶段
FROM node:22-alpine AS runner

WORKDIR /app

# 设置环境变量
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_DISABLE_CACHE 1

# 从构建阶段复制必要文件
# 复制 standalone 目录
COPY --from=builder /app/.next/standalone ./
# 复制静态文件
COPY --from=builder /app/.next/static ./.next/static
# 复制公共文件（如果有）
COPY --from=builder /app/public ./public

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# 启动服务
CMD ["node", "server.js"]
