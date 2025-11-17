# 白屏问题修复说明

## 🎯 问题诊断

您遇到的白屏问题是由于 **API 端口配置不匹配** 导致的：

- 后端服务运行在端口 **5001** ✅
- 前端 API 配置默认值仍然是端口 **5000** ❌
- 结果：前端无法连接到后端 API，导致白屏

## ✅ 已修复的内容

我已经提交并推送了以下修复：

1. **frontend/src/services/api.js**
   - 将 API URL 默认端口从 5000 改为 5001
   - 修复行：`const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';`

2. **frontend/.gitignore**
   - 添加了 .env 文件排除规则，提高安全性

3. **check-frontend.sh**
   - 添加了前端诊断脚本，方便后续排查问题

4. **TROUBLESHOOTING.md**
   - 更新了故障排查指南，详细说明白屏问题的原因和解决方案

## 🚀 如何应用修复

请按照以下步骤操作：

### 第一步：拉取最新代码

```bash
git pull
```

### 第二步：停止并删除现有容器

```bash
docker-compose down
```

### 第三步：重新构建并启动

```bash
docker-compose up -d --build
```

### 第四步：等待服务启动

```bash
# 等待几秒钟让服务完全启动
sleep 5

# 检查容器状态
docker-compose ps
```

所有容器应该显示为 "Up" 状态。

### 第五步：清除浏览器缓存

在浏览器中：

- **Mac**: 按 `Cmd + Shift + R` 硬刷新
- **Windows/Linux**: 按 `Ctrl + Shift + R` 硬刷新
- 或者使用 **无痕/隐私模式** 打开 http://localhost:3000

### 第六步：验证修复

1. 访问 http://localhost:3000
2. 应该能看到完整的 SaveFood 首页，包括：
   - 绿色渐变的 Hero 区域
   - "拯救美味，从今天开始" 标题
   - 统计数据卡片
   - 特色功能展示
   - 用户评价

## 🔍 如果仍然有问题

### 检查后端 API

```bash
# 测试后端是否正常响应
curl http://localhost:5001

# 应该返回类似这样的 JSON：
# {"message":"Welcome to SaveFood API","version":"1.0.0"}
```

### 检查前端 API 配置

```bash
# 验证 API 配置是否正确
grep "API_URL" frontend/src/services/api.js

# 应该显示：
# const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

### 查看容器日志

```bash
# 查看前端日志
docker-compose logs -f frontend

# 查看后端日志
docker-compose logs -f backend
```

### 浏览器开发者工具

1. 打开浏览器开发者工具（F12 或右键 -> 检查）
2. 切换到 **Console** 标签，查看是否有 JavaScript 错误
3. 切换到 **Network** 标签，查看 API 请求是否成功
   - 应该能看到对 `/api/...` 的请求返回 200 状态码

## 📝 技术细节

### 问题根源

当我们之前修改后端端口从 5000 到 5001 以解决端口冲突时，忘记更新前端 API 配置文件中的默认值。

虽然 `docker-compose.yml` 中设置了环境变量 `VITE_API_URL=http://localhost:5001/api`，但在某些情况下（如开发模式或环境变量未正确传递），会使用代码中的默认值。

### 修复方案

更新了 `frontend/src/services/api.js` 中的默认值，确保无论环境变量是否设置，都指向正确的端口 5001。

```javascript
// 修复前
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 修复后
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

## 🎉 预期结果

修复后，您应该能看到：

- ✅ 完整的首页，包含所有设计元素
- ✅ Monet 配色方案（绿色 #4CAF50、橙色 #FF9800、粉色 #EC407A）
- ✅ 平滑的动画效果
- ✅ 导航栏正常工作
- ✅ 能够访问 "发现食物" 页面

---

如果按照以上步骤操作后仍有问题，请提供：
1. `docker-compose ps` 的输出
2. 浏览器控制台的错误信息
3. `docker-compose logs frontend` 的输出

我会继续帮助您解决！
