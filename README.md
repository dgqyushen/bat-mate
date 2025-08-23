# 电池材料计算器 (Battery Material Calculator)

一个专业的电池材料计算工具，用于计算锂电池正负极材料的成分配比。支持正极和负极的材料计算，具有响应式设计，完美适配移动端和桌面端。

## ✨ 功能特点

- 🧮 **正极材料计算**：计算铝箔、活性物质、导电剂、粘结剂的质量配比
- 🔋 **负极材料计算**：计算铜箔、活性物质、导电剂、粘结剂的质量配比
- 📱 **移动端优化**：完美支持移动设备，修复了滚动问题
- ⚡ **实时计算**：输入数据后立即显示计算结果
- 🎨 **响应式设计**：适配各种屏幕尺寸
- 🚀 **高性能**：基于 Next.js 15 构建，加载速度快
- 🐳 **Docker 支持**：提供 Docker 镜像，便于部署

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/dgqyushen/bat-mate.git
   cd bat-mate
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 使用 Docker

1. **拉取镜像**
   ```bash
   docker pull dgqyushen/bat-mate:latest
   ```

2. **运行容器**
   ```bash
   docker run -p 3000:3000 dgqyushen/bat-mate:latest
   ```

## 📱 使用说明

### 正极材料计算

1. 输入极片总质量（mg）
2. 输入铝箔质量（mg），可选，留空使用默认值 3.24mg
3. 设置活性物质、导电剂、粘结剂的比例，可选，留空使用默认值 8:1:1
4. 系统自动计算各成分的实际质量

### 负极材料计算

1. 输入极片总质量（mg）
2. 输入铜箔质量（mg），可选，留空使用默认值 8.34mg
3. 设置活性物质、导电剂、粘结剂的比例，可选，留空使用默认值 8:1:1
4. 系统自动计算各成分的实际质量

### 计算公式

```
涂敷质量 = 极片总质量 - 集流体质量
总比例 = 活性物质比例 + 导电剂比例 + 粘结剂比例
各成分质量 = 涂敷质量 × (成分比例 ÷ 总比例)
```

## 🚀 部署指南

### Vercel 部署（推荐）

1. **GitHub 集成部署**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "New Project" → "Import Git Repository"
   - 选择 `dgqyushen/bat-mate` 仓库
   - 点击 "Deploy" 自动部署

2. **或使用 Vercel CLI**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

### Docker 部署

1. **构建镜像**
   ```bash
   docker build -t bat-mate .
   ```

2. **运行容器**
   ```bash
   docker run -d -p 3000:3000 --name bat-mate bat-mate
   ```

### 服务器部署

1. **安装依赖**
   ```bash
   npm install
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **启动服务**
   ```bash
   npm start
   ```

### 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "bat-mate" -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs bat-mate
```

## 🛠️ 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel / Docker
- **包管理**: npm

## 📁 项目结构

```
bat-mate/
├── src/
│   └── app/
│       ├── globals.css      # 全局样式
│       ├── layout.tsx       # 布局组件
│       └── page.tsx         # 主页面
├── public/                  # 静态资源
├── Dockerfile              # Docker 配置
├── package.json            # 项目配置
├── tailwind.config.js      # Tailwind 配置
└── README.md               # 项目说明
```

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 📝 更新日志

### v1.0.0 (2024-08-23)
- ✅ 初始版本发布
- ✅ 实现正负极材料计算功能
- ✅ 修复移动端滚动问题
- ✅ 添加响应式设计
- ✅ 创建 Docker 镜像
- ✅ 完善部署文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🌟 在线体验

- **Vercel 部署**: [https://bat-mate-dgqyushen.vercel.app](https://bat-mate-dgqyushen.vercel.app)
- **Docker 镜像**: [https://hub.docker.com/r/dgqyushen/bat-mate](https://hub.docker.com/r/dgqyushen/bat-mate)

---

**作者**: dgqyushen  
**邮箱**: your-email@example.com  
**GitHub**: [https://github.com/dgqyushen](https://github.com/dgqyushen)
