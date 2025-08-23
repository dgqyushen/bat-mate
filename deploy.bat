@echo off
echo 🚀 开始部署电池材料计算器...

REM 配置变量
set REMOTE_USER=your_username
set REMOTE_HOST=your_server_ip
set REMOTE_PATH=/path/to/deploy/bat-mate
set SERVICE_NAME=bat-mate

echo 请确认以下配置信息:
echo 远程用户: %REMOTE_USER%
echo 远程主机: %REMOTE_HOST%
echo 远程路径: %REMOTE_PATH%
echo 服务名称: %SERVICE_NAME%
echo.
set /p CONFIRM="配置是否正确？(y/n): "
if /i "%CONFIRM%" neq "y" (
    echo 请编辑脚本中的配置变量
    pause
    exit /b 1
)

REM 检查必要的工具
echo 检查必要的工具...
ssh -V >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ SSH 未安装，请先安装 OpenSSH
    pause
    exit /b 1
)

tar --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ tar 未安装，请先安装 tar 工具
    pause
    exit /b 1
)

REM 1. 本地构建
echo 1. 本地构建项目...
call npm run build

REM 2. 创建部署包
echo 2. 创建部署包...
tar -czf deploy.tar.gz --exclude=node_modules --exclude=.next --exclude=.git --exclude=deploy.tar.gz --exclude=DEPLOYMENT.md .

REM 3. 上传到远程服务器
echo 3. 上传到远程服务器...
ssh %REMOTE_USER%@%REMOTE_HOST% "mkdir -p %REMOTE_PATH%"
scp deploy.tar.gz %REMOTE_USER%@%REMOTE_HOST%:%REMOTE_PATH%/

REM 4. 远程部署
echo 4. 远程部署...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && if [ -d current ]; then rm -rf backup && mv current backup; fi && mkdir current && cd current && tar -xzf ../deploy.tar.gz && npm ci --only=production && if pm2 describe %SERVICE_NAME% > /dev/null 2>&1; then pm2 stop %SERVICE_NAME% && pm2 delete %SERVICE_NAME%; fi && pm2 start npm --name %SERVICE_NAME% -- start && pm2 save && cd .. && rm deploy.tar.gz && echo ✅ 部署完成"

REM 5. 清理本地文件
echo 5. 清理本地文件...
del deploy.tar.gz

echo 🎉 部署完成！
echo 应用已部署到: %REMOTE_HOST%
echo 可以通过以下命令查看状态:
echo ssh %REMOTE_USER%@%REMOTE_HOST% "pm2 status %SERVICE_NAME%"
echo.
echo 查看日志:
echo ssh %REMOTE_USER%@%REMOTE_HOST% "pm2 logs %SERVICE_NAME%"
pause
