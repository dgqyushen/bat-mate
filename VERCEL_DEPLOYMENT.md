# Vercel 部署指南

## 方法一：通过 GitHub 连接（推荐）

### 1. 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Battery Material Calculator"

# 添加远程仓库
git remote add origin https://github.com/your-username/bat-mate.git

# 推送到 GitHub
git push -u origin main
```

### 2. 在 Vercel 中导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择你的 `bat-mate` 仓库
5. 点击 "Import"

### 3. 配置环境变量（如果需要）

在 Vercel 项目设置中添加环境变量：
- `NODE_ENV`: `production`

### 4. 部署

Vercel 会自动检测到这是一个 Next.js 项目，并使用以下配置：
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **开发命令**: `npm run dev`

点击 "Deploy" 开始部署。

## 方法二：通过 Vercel CLI

### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

### 3. 部署项目

```bash
# 在项目根目录运行
vercel

# 按照提示操作：
# - 设置项目名称
# - 选择组织
# - 关联目录
```

### 4. 生产部署

```bash
vercel --prod
```

## 方法三：拖拽上传

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Upload" 选项
4. 将项目文件夹拖拽到上传区域
5. Vercel 会自动构建和部署

## 部署后配置

### 自定义域名

1. 在 Vercel 项目仪表板中，点击 "Settings"
2. 选择 "Domains"
3. 添加你的自定义域名

### 环境变量

如果需要添加环境变量：
1. 在项目设置中，点击 "Environment Variables"
2. 添加变量名和值
3. 重新部署项目

### 自动部署

设置 GitHub 集成后，每次推送代码到 main 分支都会自动触发部署。

## 预期效果

部署成功后，你的应用将：

- ✅ 自动获得 HTTPS 证书
- ✅ 全球 CDN 加速
- ✅ 自动扩展
- ✅ 移动端优化（已修复滚动问题）
- ✅ 支持自定义域名
- ✅ 自动部署（GitHub 集成）

## 访问应用

部署完成后，Vercel 会提供一个类似这样的 URL：
`https://bat-mate-your-username.vercel.app`

你也可以绑定自定义域名。

## 故障排除

如果遇到问题：

1. **构建失败**：检查 `package.json` 中的依赖是否完整
2. **运行时错误**：检查环境变量配置
3. **样式问题**：确保 Tailwind CSS 配置正确
4. **移动端问题**：已修复滚动问题，应该正常工作

## 监控和分析

Vercel 提供内置的：
- 访问分析
- 性能监控
- 错误日志
- 构建日志

在项目仪表板中可以查看这些信息。
