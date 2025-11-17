import mongoose from 'mongoose';

const foodBagSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  name: {
    type: String,
    required: [true, '请提供食物包名称'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '请提供食物包描述']
  },
  originalPrice: {
    type: Number,
    required: [true, '请提供原价']
  },
  discountedPrice: {
    type: Number,
    required: [true, '请提供优惠价']
  },
  quantity: {
    type: Number,
    required: [true, '请提供数量'],
    min: 0
  },
  images: [{
    type: String
  }],
  pickupTime: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  availableDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['面包糕点', '餐食', '蔬菜水果', '乳制品', '熟食', '混合'],
    default: '混合'
  },
  allergens: [{
    type: String
  }],
  dietaryInfo: [{
    type: String,
    enum: ['素食', '纯素', '无麸质', '清真', '犹太洁食']
  }],
  status: {
    type: String,
    enum: ['available', 'reserved', 'sold_out'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FoodBag = mongoose.model('FoodBag', foodBagSchema);

export default FoodBag;
