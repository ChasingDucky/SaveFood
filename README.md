# SaveFood - 珍惜食物平台

<div align="center">

🍽️ **对标 Too Good To Go 的食物拯救平台**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14-blue.svg)](https://mui.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)

</div>

## 📖 项目简介

SaveFood 是一个减少食物浪费的创新平台，连接商家和消费者，让消费者以优惠价格购买商家未售出的食物，从而减少食物浪费，保护环境。

### ✨ 核心功能

- 🛍️ **食物包浏览**：发现附近商家的优惠食物包
- 💰 **实惠价格**：以折扣价格购买临期美食
- 📍 **位置服务**：基于地理位置查找附近商家
- 🏪 **商家管理**：商家可以发布和管理食物包
- 📦 **订单管理**：用户和商家的订单追踪系统
- 🎨 **莫奈配色**：采用 Material Design 莫奈取色方案

## 🎨 设计特色

### 强化的 UI 设计

SaveFood 采用现代化的 UI 设计，提供卓越的用户体验：

#### 🌈 视觉效果
- **渐变背景**：多层次的渐变效果，营造深度感
- **动画效果**：流畅的 Fade、Zoom 和悬浮动画
- **阴影系统**：自定义的多层次阴影，增强视觉层次
- **圆角设计**：统一的圆角风格（12-20px），现代且友好

#### 🎭 莫奈取色方案

灵感来自莫奈的《睡莲》系列，使用柔和的蓝绿色调和温暖的互补色：

- **主色调**：清新的绿色 (#4CAF50) - 象征环保和新鲜
- **辅助色**：温暖的橙色 (#FF9800) - 象征温暖和美食
- **点缀色**：粉色 (#EC407A) - 增添活力
- **背景色**：淡雅的浅绿色 (#E8F5E9)

#### ✨ 交互设计
- **悬浮效果**：卡片悬浮时上浮 4-8px
- **按钮动画**：渐变背景 + 阴影变化
- **输入框动画**：聚焦时轻微上浮和阴影增强
- **加载动画**：优雅的旋转加载器配合图标动画

#### 🏆 特色组件
- **Hero 区域**：大胆的渐变背景 + 动画装饰
- **统计卡片**：带图标的渐变卡片 + 边框装饰
- **功能展示**：彩色顶部装饰条 + 大图标
- **用户评价**：星级评分 + 斜体引用样式

### Material Design 异形图标

使用 Material-UI 的完整图标系统：
- 🍽️ Restaurant - 餐厅/食物
- 🛍️ ShoppingBag - 购物/订单
- 🏪 Store - 商家
- 📍 LocationOn - 位置
- ⏰ AccessTime - 时间
- 🌸 LocalFlorist - 装饰元素
- ⭐ Star - 评分
- 💚 FavoriteBorder - 收藏

## 🛠️ 技术栈

### 前端
- **React 18.2** - 前端框架
- **Vite** - 构建工具
- **Material-UI 5** - UI 组件库
- **React Router** - 路由管理
- **Axios** - HTTP 客户端
- **Leaflet** - 地图服务

### 后端
- **Node.js** - 运行时环境
- **Express** - Web 框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **JWT** - 身份认证
- **bcryptjs** - 密码加密

## 📂 项目结构

```
SaveFood/
├── backend/                 # 后端代码
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   │   └── database.js # 数据库连接
│   │   ├── models/         # 数据模型
│   │   │   ├── User.js     # 用户模型
│   │   │   ├── Merchant.js # 商家模型
│   │   │   ├── FoodBag.js  # 食物包模型
│   │   │   └── Order.js    # 订单模型
│   │   ├── routes/         # 路由
│   │   │   ├── authRoutes.js
│   │   │   ├── merchantRoutes.js
│   │   │   ├── foodBagRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── utils/          # 工具函数
│   │   └── server.js       # 服务器入口
│   └── package.json
│
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── components/     # 组件
│   │   │   └── Layout.jsx  # 布局组件
│   │   ├── pages/          # 页面
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── FoodBagList.jsx
│   │   │   ├── FoodBagDetail.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── MerchantDashboard.jsx
│   │   ├── services/       # API 服务
│   │   │   └── api.js
│   │   ├── utils/          # 工具函数
│   │   ├── theme.js        # 主题配置
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🚀 快速开始

### 方式一：使用 Docker（推荐）

使用 Docker Compose 一键启动所有服务：

```bash
# 克隆项目
git clone <repository-url>
cd SaveFood

# 启动所有服务（MongoDB + 后端 + 前端）
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

启动后访问：
- **前端**: http://localhost:7000
- **后端 API**: http://localhost:8888
- **MongoDB**: localhost:27017

### 方式二：本地开发

#### 环境要求

- Node.js 16+
- MongoDB 4.4+
- npm 或 yarn

#### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd SaveFood
```

2. **安装后端依赖**
```bash
cd backend
npm install
```

3. **配置后端环境变量**
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等
```

4. **启动 MongoDB**
```bash
# 确保 MongoDB 正在运行
mongod
```

5. **启动后端服务**
```bash
npm run dev
# 后端运行在 http://localhost:8888
```

6. **安装前端依赖**
```bash
cd ../frontend
npm install
```

7. **启动前端服务**
```bash
npm run dev
# 前端运行在 http://localhost:7000
```

### 访问应用

- 前端地址：http://localhost:7000
- 后端 API：http://localhost:8888/api

## 🐳 Docker 部署

项目包含完整的 Docker 配置：

### Docker Compose 服务

- **mongodb**: MongoDB 7.0 数据库
- **backend**: Node.js Express 后端API
- **frontend**: React Vite 前端应用

### Docker 命令

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f [service_name]

# 停止服务
docker-compose stop

# 删除容器
docker-compose down

# 删除容器和数据卷
docker-compose down -v
```

### 生产环境部署

对于生产环境，建议：

1. 修改 `docker-compose.yml` 中的数据库密码
2. 使用环境变量文件管理敏感信息
3. 配置 Nginx 作为反向代理
4. 启用 HTTPS
5. 配置日志收集和监控

## 📱 主要功能模块

### 用户端

1. **浏览食物包**
   - 查看所有可用的食物包
   - 按分类筛选
   - 搜索功能
   - 查看详细信息

2. **下单购买**
   - 选择食物包
   - 确认订单
   - 获取取货码
   - 查看订单历史

3. **个人中心**
   - 管理个人信息
   - 查看我的订单
   - 收藏商家

### 商家端

1. **商家管理**
   - 创建和编辑商家信息
   - 设置营业时间
   - 上传商家图片

2. **食物包管理**
   - 发布新的食物包
   - 设置价格和数量
   - 管理库存
   - 编辑食物包信息

3. **订单管理**
   - 查看订单列表
   - 更新订单状态
   - 确认取货

## 🔒 API 接口

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取用户信息
- `PUT /api/auth/profile` - 更新用户信息

### 商家接口
- `GET /api/merchants` - 获取商家列表
- `GET /api/merchants/:id` - 获取商家详情
- `POST /api/merchants` - 创建商家
- `PUT /api/merchants/:id` - 更新商家
- `DELETE /api/merchants/:id` - 删除商家

### 食物包接口
- `GET /api/foodbags` - 获取食物包列表
- `GET /api/foodbags/nearby` - 获取附近的食物包
- `GET /api/foodbags/:id` - 获取食物包详情
- `POST /api/foodbags` - 创建食物包
- `PUT /api/foodbags/:id` - 更新食物包
- `DELETE /api/foodbags/:id` - 删除食物包

### 订单接口
- `POST /api/orders` - 创建订单
- `GET /api/orders/my` - 获取我的订单
- `GET /api/orders/merchant/:merchantId` - 获取商家订单
- `GET /api/orders/:id` - 获取订单详情
- `PUT /api/orders/:id/status` - 更新订单状态
- `PUT /api/orders/:id/cancel` - 取消订单
- `PUT /api/orders/:id/review` - 评价订单

## 🌟 特色亮点

1. **环保理念**：帮助减少食物浪费，为环保做贡献
2. **实惠价格**：消费者可以以低价购买优质食物
3. **双赢模式**：商家减少损失，用户获得实惠
4. **美观设计**：采用莫奈配色方案，界面优雅舒适
5. **用户体验**：Material Design 规范，操作流畅

## 📈 未来规划

- [ ] 添加实时聊天功能
- [ ] 集成第三方支付
- [ ] 添加推送通知
- [ ] 实现评价系统
- [ ] 添加数据统计分析
- [ ] 开发移动端 App
- [ ] 添加多语言支持
- [ ] 实现社交分享功能

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 ISC 许可证

## 👥 联系方式

如有问题或建议，欢迎联系我们。

---

**SaveFood - 珍惜食物，从今天开始 🌱**
