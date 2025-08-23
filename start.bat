@echo off
echo 🚀 启动电池材料计算器...

REM 检查 Node.js 是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装，请先安装 Node.js 18+ 版本
    pause
    exit /b 1
)

REM 检查 npm 是否安装
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm 未安装，请先安装 npm
    pause
    exit /b 1
)

REM 检查端口是否被占用
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo ⚠️  端口 3000 已被占用，请先停止占用该端口的进程
    pause
    exit /b 1
)

REM 安装依赖
echo 📦 安装依赖...
npm install

REM 构建项目
echo 🔨 构建项目...
npm run build

REM 启动应用
echo 🌟 启动应用...
echo 应用将在 http://localhost:3000 运行
echo 按 Ctrl+C 停止服务
npm start
