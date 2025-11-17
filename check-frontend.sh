#!/bin/bash

echo "🔍 检查前端详细信息..."
echo ""

echo "1. 测试前端首页 HTML..."
echo "----------------------------------------"
curl -s http://localhost:3000 | head -30
echo ""

echo "2. 检查浏览器控制台错误（进入前端容器）..."
echo "----------------------------------------"
docker exec savefood-frontend ls -la /app/src/
echo ""

echo "3. 检查前端构建..."
echo "----------------------------------------"
docker exec savefood-frontend npm list react react-dom
echo ""

echo "4. 检查前端环境变量..."
echo "----------------------------------------"
docker exec savefood-frontend printenv | grep VITE
echo ""

echo "5. 测试 API 代理..."
echo "----------------------------------------"
curl -s http://localhost:3000/api || echo "API 代理可能有问题"
echo ""

echo "✅ 检查完成"
echo ""
echo "💡 如果看到白屏，请："
echo "   1. 清除浏览器缓存（Cmd+Shift+R 或 Ctrl+Shift+R）"
echo "   2. 打开浏览器开发者工具（F12）查看控制台错误"
echo "   3. 检查 Network 标签页看 API 请求是否成功"
