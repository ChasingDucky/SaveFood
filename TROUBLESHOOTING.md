# SaveFood 故障排查指南

## 🔍 常见问题

### 1. 白屏问题

**症状**：访问 http://localhost:3000 显示白屏

**可能原因**：
- 前端无法连接到后端 API
- 容器网络配置问题
- 环境变量未正确设置

**解决方案**：

```bash
# 1. 停止所有容器
docker-compose down

# 2. 重新构建并启动（强制重建）
docker-compose up -d --build

# 3. 查看日志
docker-compose logs -f frontend
docker-compose logs -f backend

# 4. 检查容器状态
docker-compose ps
```

### 2. 端口冲突

**症状**：
```
Error: ports are not available: listen tcp 0.0.0.0:5001: bind: address already in use
```

**解决方案**：

```bash
# 查看占用端口的进程
lsof -i :5001

# 如果需要更换端口，修改以下文件：
# - docker-compose.yml (PORT 和 ports 配置)
# - frontend/vite.config.js (proxy target)
```

### 3. MongoDB 连接失败

**症状**：后端日志显示无法连接到 MongoDB

**解决方案**：

```bash
# 检查 MongoDB 容器状态
docker-compose logs mongodb

# 重启 MongoDB
docker-compose restart mongodb

# 如果问题持续，删除数据卷重新开始
docker-compose down -v
docker-compose up -d
```

### 4. 前端热更新不工作

**症状**：修改代码后浏览器不自动刷新

**解决方案**：

已在 `vite.config.js` 中配置 `usePolling: true`。如果仍有问题：

```bash
# 重启前端容器
docker-compose restart frontend
```

### 5. 后端 API 404 错误

**症状**：浏览器控制台显示 API 请求返回 404

**检查步骤**：

1. 确认后端已启动：
```bash
docker-compose ps backend
```

2. 测试后端 API：
```bash
curl http://localhost:5001
```

3. 检查 Vite 代理配置：
```bash
cat frontend/vite.config.js
```

### 6. 容器一直重启

**症状**：`docker-compose ps` 显示容器状态为 Restarting

**解决方案**：

```bash
# 查看详细日志
docker-compose logs [service_name]

# 常见原因：
# - 端口已被占用
# - 代码语法错误
# - 依赖安装失败
```

## 🛠️ 调试工具

### 进入容器内部

```bash
# 进入后端容器
docker exec -it savefood-backend sh

# 进入前端容器
docker exec -it savefood-frontend sh

# 进入 MongoDB 容器
docker exec -it savefood-mongodb mongosh
```

### 查看实时日志

```bash
# 所有服务
docker-compose logs -f

# 特定服务
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 完全重置

如果遇到无法解决的问题：

```bash
# 停止并删除所有容器、网络和卷
docker-compose down -v

# 删除镜像（可选）
docker rmi savefood-backend savefood-frontend

# 重新构建
docker-compose up -d --build
```

## 📞 获取帮助

如果以上方法都无法解决问题：

1. 运行诊断脚本：
```bash
bash debug.sh > debug.log
```

2. 检查 `debug.log` 文件查看详细信息

3. 提交 Issue 时附上：
   - 错误信息
   - `docker-compose ps` 输出
   - 相关日志
   - 系统信息（OS、Docker 版本）

## 🔗 相关资源

- [Docker 官方文档](https://docs.docker.com/)
- [Vite 官方文档](https://vitejs.dev/)
- [React 官方文档](https://react.dev/)
- [MongoDB 官方文档](https://www.mongodb.com/docs/)
