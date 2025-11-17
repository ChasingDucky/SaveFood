#!/bin/bash

echo "================================================"
echo "🔍 SaveFood 完整诊断测试"
echo "================================================"
echo ""

echo "1️⃣ 测试后端 API (端口 8888)"
echo "----------------------------------------"
curl -s http://localhost:8888 && echo "" || echo "❌ 后端无法访问"
echo ""

echo "2️⃣ 测试前端服务器 (端口 7000)"
echo "----------------------------------------"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:7000)
echo "HTTP 状态码: $HTTP_CODE"
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ 前端服务器响应正常"
else
    echo "❌ 前端服务器响应异常"
fi
echo ""

echo "3️⃣ 检查前端 HTML 内容"
echo "----------------------------------------"
HTML_CONTENT=$(curl -s http://localhost:7000)
if echo "$HTML_CONTENT" | grep -q "SaveFood"; then
    echo "✅ HTML 包含 SaveFood 标题"
else
    echo "❌ HTML 不包含 SaveFood 标题"
fi

if echo "$HTML_CONTENT" | grep -q "root"; then
    echo "✅ HTML 包含 root 元素"
else
    echo "❌ HTML 缺少 root 元素"
fi

if echo "$HTML_CONTENT" | grep -q "main.jsx"; then
    echo "✅ HTML 包含 main.jsx 脚本引用"
else
    echo "❌ HTML 缺少 main.jsx 脚本引用"
fi
echo ""

echo "4️⃣ 测试 API 代理 (前端 -> 后端)"
echo "----------------------------------------"
API_TEST=$(curl -s http://localhost:7000/api)
if [ -z "$API_TEST" ]; then
    echo "❌ API 代理可能有问题"
else
    echo "✅ API 代理响应: $API_TEST"
fi
echo ""

echo "5️⃣ 检查容器状态"
echo "----------------------------------------"
docker ps --filter "name=savefood" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "6️⃣ 检查前端环境变量"
echo "----------------------------------------"
echo "DOCKER_ENV: $(docker exec savefood-frontend printenv DOCKER_ENV 2>/dev/null || echo '未设置')"
echo "VITE_API_URL: $(docker exec savefood-frontend printenv VITE_API_URL 2>/dev/null || echo '未设置')"
echo ""

echo "7️⃣ 检查前端日志（最后 10 行）"
echo "----------------------------------------"
docker logs --tail 10 savefood-frontend
echo ""

echo "8️⃣ 检查后端日志（最后 10 行）"
echo "----------------------------------------"
docker logs --tail 10 savefood-backend
echo ""

echo "================================================"
echo "📋 诊断总结"
echo "================================================"
echo ""
echo "请在浏览器中执行以下操作："
echo "1. 打开浏览器开发者工具 (F12)"
echo "2. 切换到 Console 标签，查看是否有红色错误信息"
echo "3. 切换到 Network 标签，刷新页面"
echo "4. 检查是否有失败的请求（显示为红色）"
echo "5. 硬刷新页面 (Mac: Cmd+Shift+R, Windows: Ctrl+Shift+R)"
echo ""
echo "如果看到白屏，请将浏览器 Console 的错误信息发给我。"
echo ""
