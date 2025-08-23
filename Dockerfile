FROM node:18-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖（包括开发依赖）
RUN npm ci

# 复制所有文件
COPY . .

# 构建应用
RUN npm run build

# 不清理开发依赖，因为生产环境需要 TypeScript 来解析 next.config.ts

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
