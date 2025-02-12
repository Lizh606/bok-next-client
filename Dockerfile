# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 全局安装 pnpm 并设置镜像源
RUN npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com/

# 将 package.json 和 pnpm-lock.yaml 复制到容器中
COPY package*.json pnpm*.yaml ./

# 安装依赖
RUN pnpm install

# 将应用代码复制到容器中
COPY . .

# 构建 Next.js 应用
RUN pnpm build

# 设置环境变量
ENV NODE_ENV=production

# 暴露应用运行端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["pnpm", "start"]
