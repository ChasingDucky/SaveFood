#!/bin/bash

echo "🔧 SaveFood 完整修复与重启"
echo "========================================"
echo ""

echo "📌 步骤 1: 停止所有容器"
echo "----------------------------------------"
docker-compose down
echo "✅ 容器已停止"
echo ""

echo "📌 步骤 2: 清理旧镜像（可选）"
echo "----------------------------------------"
docker rmi savefood-frontend savefood-backend 2>/dev/null || echo "跳过镜像清理"
echo ""

echo "📌 步骤 3: 重新构建镜像"
echo "----------------------------------------"
docker-compose build --no-cache frontend backend
echo ""

echo "📌 步骤 4: 启动所有服务"
echo "----------------------------------------"
docker-compose up -d
echo ""

echo "📌 步骤 5: 等待服务启动..."
echo "----------------------------------------"
for i in {1..10}; do
    echo -n "."
    sleep 1
done
echo " 完成"
echo ""

echo "📌 步骤 6: 检查容器状态"
echo "----------------------------------------"
docker-compose ps
echo ""

echo "📌 步骤 7: 显示前端日志"
echo "----------------------------------------"
docker-compose logs --tail 15 frontend
echo ""

echo "📌 步骤 8: 测试连接"
echo "----------------------------------------"
echo -n "测试后端 (6666): "
curl -s --max-time 2 http://localhost:6666 > /dev/null && echo "✅ 正常" || echo "❌ 失败"

echo -n "测试前端 (6667): "
curl -s --max-time 2 http://localhost:6667 > /dev/null && echo "✅ 正常" || echo "❌ 失败"
echo ""

echo "========================================"
echo "🎉 修复完成！"
echo ""
echo "📱 访问方式："
echo "   前端: http://localhost:6667"
echo "   后端: http://localhost:6666"
echo ""
echo "💡 提示："
echo "   1. 在浏览器中打开 http://localhost:6667"
echo "   2. 按 Cmd+Shift+R (Mac) 或 Ctrl+Shift+R 硬刷新"
echo "   3. 或使用无痕模式打开"
echo ""
echo "🔍 如果还有问题，运行: bash diagnose-frontend.sh"
echo "========================================"
