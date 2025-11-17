#!/bin/bash

echo "=========================================="
echo "SaveFood 诊断工具"
echo "=========================================="
echo ""

echo "1. 检查容器状态..."
docker-compose ps
echo ""

echo "2. 检查后端日志..."
echo "----------------------------------------"
docker-compose logs backend --tail=30
echo ""

echo "3. 检查前端日志..."
echo "----------------------------------------"
docker-compose logs frontend --tail=30
echo ""

echo "4. 检查 MongoDB 日志..."
echo "----------------------------------------"
docker-compose logs mongodb --tail=20
echo ""

echo "5. 测试后端 API..."
echo "----------------------------------------"
curl -s http://localhost:8888 || echo "后端无法访问"
echo ""

echo "6. 测试前端..."
echo "----------------------------------------"
curl -s -I http://localhost:5173 | head -5 || echo "前端无法访问"
echo ""

echo "=========================================="
echo "诊断完成"
echo "=========================================="
