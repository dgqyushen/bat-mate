# 电池材料计算器部署指南

## 项目已构建完成

项目已经成功构建为生产版本，构建文件位于 `.next` 目录中。

## 部署方式

### 1. 使用 Node.js 直接运行（推荐用于测试）

```bash
# 安装依赖
npm install

# 启动生产服务器
npm start
```

默认会在 `http://localhost:3000` 运行

### 2. 使用 PM2 部署（推荐用于生产环境）

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "bat-mate" -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs bat-mate

# 停止应用
pm2 stop bat-mate

# 重启应用
pm2 restart bat-mate
```

### 3. 使用 Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

构建和运行：

```bash
# 构建镜像
docker build -t bat-mate .

# 运行容器
docker run -p 3000:3000 bat-mate
```

### 4. 部署到 Vercel（最简单）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署

### 5. 部署到 Netlify

1. 将代码推送到 GitHub
2. 在 [Netlify](https://netlify.com) 导入项目
3. 设置构建命令：`npm run build`
4. 设置发布目录：`.next`

### 6. 部署到自己的服务器

```bash
# 1. 复制项目文件到服务器
scp -r ./bat-mate user@your-server:/path/to/deploy

# 2. 登录服务器
ssh user@your-server

# 3. 进入项目目录
cd /path/to/deploy/bat-mate

# 4. 安装依赖
npm install

# 5. 构建项目
npm run build

# 6. 启动服务
npm start
```

## 环境变量

如果需要环境变量，创建 `.env.production` 文件：

```env
# 示例环境变量
NODE_ENV=production
```

## Nginx 反向代理配置（可选）

如果你使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 注意事项

1. 确保服务器上安装了 Node.js 18+ 版本
2. 生产环境建议使用 PM2 或类似的进程管理器
3. 配置防火墙允许相应端口的访问
4. 建议使用 HTTPS 加密连接
5. 定期更新依赖包以修复安全漏洞

## 故障排除

如果遇到问题：

1. 检查 Node.js 版本：`node --version`
2. 检查端口是否被占用：`netstat -tulpn | grep :3000`
3. 查看错误日志：`npm start` 或 `pm2 logs`
4. 确保所有依赖都已安装：`npm install`
