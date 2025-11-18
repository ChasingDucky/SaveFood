import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Models
import User from './models/User.js';
import Merchant from './models/Merchant.js';
import FoodBag from './models/FoodBag.js';
import Order from './models/Order.js';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:savefood2024@localhost:27018/savefood?authSource=admin';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Merchant.deleteMany({});
    await FoodBag.deleteMany({});
    await Order.deleteMany({});

    // Create users
    console.log('👤 Creating users...');
    const salt = await bcrypt.genSalt(10);

    const users = await User.create([
      {
        name: '张三',
        email: 'user@savefood.com',
        password: await bcrypt.hash('123456', salt),
        phone: '13800138000',
        role: 'user',
      },
      {
        name: '李商家',
        email: 'merchant@savefood.com',
        password: await bcrypt.hash('123456', salt),
        phone: '13900139000',
        role: 'merchant',
      },
      {
        name: '王面包店',
        email: 'bakery@savefood.com',
        password: await bcrypt.hash('123456', salt),
        phone: '13700137000',
        role: 'merchant',
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create merchants
    console.log('🏪 Creating merchants...');
    const merchants = await Merchant.create([
      {
        user: users[1]._id,
        name: '幸福面包坊',
        description: '每天新鲜烘焙，临近关门有超值惊喜包',
        category: '面包店',
        address: {
          street: '人民路123号',
          city: '上海市',
          district: '浦东新区',
          coordinates: [121.5, 31.2],
        },
        phone: '021-12345678',
        businessHours: {
          weekday: { open: '07:00', close: '21:00' },
          weekend: { open: '08:00', close: '22:00' },
        },
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
      },
      {
        user: users[2]._id,
        name: '绿色餐厅',
        description: '健康有机食材，每日午餐晚餐惊喜福袋',
        category: '餐厅',
        address: {
          street: '南京路456号',
          city: '上海市',
          district: '黄浦区',
          coordinates: [121.48, 31.23],
        },
        phone: '021-87654321',
        businessHours: {
          weekday: { open: '10:00', close: '22:00' },
          weekend: { open: '10:00', close: '23:00' },
        },
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
      },
    ]);

    console.log(`✅ Created ${merchants.length} merchants`);

    // Create food bags
    console.log('🍱 Creating food bags...');
    const foodBags = await FoodBag.create([
      {
        merchant: merchants[0]._id,
        name: '面包惊喜包',
        description: '包含3-5个新鲜面包，可能有可颂、法棍、全麦面包等',
        category: '面包糕点',
        originalPrice: 50,
        discountedPrice: 15,
        quantity: 5,
        pickupTime: {
          start: '19:30',
          end: '21:00',
        },
        dietaryInfo: ['素食友好'],
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'],
        status: 'available',
      },
      {
        merchant: merchants[0]._id,
        name: '甜品福袋',
        description: '包含当日剩余的蛋糕、饼干、泡芙等甜品',
        category: '面包糕点',
        originalPrice: 80,
        discountedPrice: 25,
        quantity: 3,
        pickupTime: {
          start: '20:00',
          end: '21:00',
        },
        dietaryInfo: [],
        images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'],
        status: 'available',
      },
      {
        merchant: merchants[1]._id,
        name: '午餐惊喜袋',
        description: '健康午餐组合，包含主食、配菜和汤',
        category: '餐食',
        originalPrice: 60,
        discountedPrice: 20,
        quantity: 10,
        pickupTime: {
          start: '13:30',
          end: '14:30',
        },
        dietaryInfo: ['低脂', '无糖'],
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'],
        status: 'available',
      },
      {
        merchant: merchants[1]._id,
        name: '晚餐超值包',
        description: '丰盛晚餐，含肉类、蔬菜、主食',
        category: '餐食',
        originalPrice: 90,
        discountedPrice: 30,
        quantity: 8,
        pickupTime: {
          start: '20:00',
          end: '21:30',
        },
        dietaryInfo: ['高蛋白'],
        images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'],
        status: 'available',
      },
      {
        merchant: merchants[0]._id,
        name: '早餐套餐',
        description: '营养早餐，含面包、牛奶、水果',
        category: '混合',
        originalPrice: 40,
        discountedPrice: 12,
        quantity: 0,
        pickupTime: {
          start: '08:00',
          end: '09:00',
        },
        dietaryInfo: ['素食友好'],
        images: ['https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400'],
        status: 'sold_out',
      },
    ]);

    console.log(`✅ Created ${foodBags.length} food bags`);

    // Create sample orders
    console.log('📦 Creating sample orders...');
    const orders = await Order.create([
      {
        user: users[0]._id,
        foodBag: foodBags[0]._id,
        merchant: merchants[0]._id,
        quantity: 1,
        totalPrice: 15,
        pickupTime: foodBags[0].pickupTime,
        pickupCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: 'confirmed',
      },
      {
        user: users[0]._id,
        foodBag: foodBags[2]._id,
        merchant: merchants[1]._id,
        quantity: 1,
        totalPrice: 20,
        pickupTime: foodBags[2].pickupTime,
        pickupCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: 'ready',
      },
    ]);

    console.log(`✅ Created ${orders.length} orders`);

    console.log('\n🎉 Seed data created successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 User Account:');
    console.log('   Email: user@savefood.com');
    console.log('   Password: 123456');
    console.log('');
    console.log('🏪 Merchant Account 1:');
    console.log('   Email: merchant@savefood.com');
    console.log('   Password: 123456');
    console.log('   Business: 幸福面包坊');
    console.log('');
    console.log('🏪 Merchant Account 2:');
    console.log('   Email: bakery@savefood.com');
    console.log('   Password: 123456');
    console.log('   Business: 绿色餐厅');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
};

// Run seed
connectDB().then(seedData);
