# 构建阶段
FROM node:18-alpine AS builder

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

# 构建应用
RUN pnpm build

# 运行阶段
FROM node:18-alpine AS runner

WORKDIR /app

# 设置环境变量
ENV NODE_ENV production
ENV PORT 3000

# 从构建阶段复制必要文件
# 复制 standalone 目录
COPY --from=builder /app/.next/standalone ./
# 复制静态文件
COPY --from=builder /app/.next/static ./.next/static
# 复制公共文件（如果有）
COPY --from=builder /app/public ./public

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["node", "server.js"]
