#!/bin/bash

echo "🚀 启动 SaveFood 应用..."
echo ""

# 停止并删除旧容器
echo "📦 清理旧容器..."
docker-compose down

# 重新构建并启动
echo "🔨 构建并启动服务..."
docker-compose up -d --build

echo ""
echo "⏳ 等待服务启动..."
sleep 5

echo ""
echo "✅ 服务状态："
docker-compose ps

echo ""
echo "=========================================="
echo "📱 应用访问地址："
echo "   前端：http://localhost:3000"
echo "   后端：http://localhost:8888"
echo "=========================================="
echo ""
echo "📝 查看日志："
echo "   docker-compose logs -f [service_name]"
echo ""
echo "🛑 停止服务："
echo "   docker-compose down"
echo ""
