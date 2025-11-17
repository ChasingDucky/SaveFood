#!/bin/bash

echo "🔧 SaveFood 前端问题诊断与修复"
echo "========================================"
echo ""

# 1. 检查容器状态
echo "📦 1. 检查容器运行状态"
echo "----------------------------------------"
docker ps -a --filter "name=savefood" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

# 2. 检查前端容器日志
echo "📋 2. 前端容器日志（最后 20 行）"
echo "----------------------------------------"
docker logs --tail 20 savefood-frontend 2>&1
echo ""

# 3. 检查后端容器日志
echo "📋 3. 后端容器日志（最后 10 行）"
echo "----------------------------------------"
docker logs --tail 10 savefood-backend 2>&1
echo ""

# 4. 测试端口连通性
echo "🔌 4. 测试端口连通性"
echo "----------------------------------------"
echo -n "后端 6666: "
nc -z localhost 6666 && echo "✅ 可访问" || echo "❌ 无法访问"

echo -n "前端 6667: "
nc -z localhost 6667 && echo "✅ 可访问" || echo "❌ 无法访问"

echo -n "MongoDB 27018: "
nc -z localhost 27018 && echo "✅ 可访问" || echo "❌ 无法访问"
echo ""

# 5. 测试 API 响应
echo "🌐 5. 测试 API 响应"
echo "----------------------------------------"
echo "后端 API:"
curl -s --max-time 3 http://localhost:6666 && echo "" || echo "❌ 后端无响应"
echo ""

echo "前端服务器 (前 100 字符):"
curl -s --max-time 3 http://localhost:6667 | head -c 100
echo ""
echo ""

# 6. 检查网络
echo "🌍 6. Docker 网络状态"
echo "----------------------------------------"
docker network inspect savefood_savefood-network --format '{{range .Containers}}{{.Name}}: {{.IPv4Address}}{{"\n"}}{{end}}' 2>/dev/null || echo "网络不存在"
echo ""

# 7. 检查环境变量
echo "⚙️  7. 前端容器环境变量"
echo "----------------------------------------"
docker exec savefood-frontend printenv | grep -E "VITE|DOCKER|NODE" 2>/dev/null || echo "无法获取环境变量"
echo ""

# 8. 诊断结论
echo "📊 8. 诊断结论"
echo "========================================"
FRONTEND_RUNNING=$(docker ps --filter "name=savefood-frontend" --filter "status=running" -q)
BACKEND_RUNNING=$(docker ps --filter "name=savefood-backend" --filter "status=running" -q)

if [ -z "$FRONTEND_RUNNING" ]; then
    echo "❌ 问题：前端容器未运行"
    echo "   建议：检查上面的日志，可能是端口冲突或启动错误"
    echo ""
    echo "   快速修复："
    echo "   docker-compose down"
    echo "   docker-compose up -d --build"
elif [ -z "$BACKEND_RUNNING" ]; then
    echo "❌ 问题：后端容器未运行"
    echo "   建议：检查后端日志"
else
    echo "✅ 所有容器都在运行"
    echo ""
    echo "   请访问: http://localhost:6667"
    echo "   在浏览器中按 Cmd+Shift+R 硬刷新"
fi
echo ""
