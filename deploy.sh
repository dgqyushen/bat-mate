#!/bin/bash

# 电池材料计算器部署脚本

echo "🚀 开始部署电池材料计算器..."

# 配置变量
REMOTE_USER="your_username"
REMOTE_HOST="your_server_ip"
REMOTE_PATH="/path/to/deploy/bat-mate"
SERVICE_NAME="bat-mate"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 错误处理
set -e

echo -e "${YELLOW}请确认以下配置信息:${NC}"
echo "远程用户: $REMOTE_USER"
echo "远程主机: $REMOTE_HOST"
echo "远程路径: $REMOTE_PATH"
echo "服务名称: $SERVICE_NAME"
echo ""
read -p "配置是否正确？(y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "请编辑脚本中的配置变量"
    exit 1
fi

# 1. 本地构建
echo -e "${YELLOW}1. 本地构建项目...${NC}"
npm run build

# 2. 创建部署包
echo -e "${YELLOW}2. 创建部署包...${NC}"
tar -czf deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=deploy.tar.gz \
    --exclude=DEPLOYMENT.md \
    .

# 3. 上传到远程服务器
echo -e "${YELLOW}3. 上传到远程服务器...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PATH"
scp deploy.tar.gz $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

# 4. 远程部署
echo -e "${YELLOW}4. 远程部署...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST << EOF
    cd $REMOTE_PATH
    
    # 备份当前版本
    if [ -d "current" ]; then
        rm -rf backup
        mv current backup
    fi
    
    # 创建新版本目录
    mkdir current
    cd current
    
    # 解压部署包
    tar -xzf ../deploy.tar.gz
    
    # 安装依赖
    npm ci --only=production
    
    # 停止旧服务
    if pm2 describe $SERVICE_NAME > /dev/null 2>&1; then
        pm2 stop $SERVICE_NAME
        pm2 delete $SERVICE_NAME
    fi
    
    # 启动新服务
    pm2 start npm --name $SERVICE_NAME -- start
    
    # 保存 PM2 配置
    pm2 save
    
    # 清理
    cd ..
    rm deploy.tar.gz
    
    echo "✅ 部署完成"
EOF

# 5. 清理本地文件
echo -e "${YELLOW}5. 清理本地文件...${NC}"
rm deploy.tar.gz

echo -e "${GREEN}🎉 部署完成！${NC}"
echo "应用已部署到: $REMOTE_HOST"
echo "可以通过以下命令查看状态:"
echo "ssh $REMOTE_USER@$REMOTE_HOST 'pm2 status $SERVICE_NAME'"
echo ""
echo "查看日志:"
echo "ssh $REMOTE_USER@$REMOTE_HOST 'pm2 logs $SERVICE_NAME'"
