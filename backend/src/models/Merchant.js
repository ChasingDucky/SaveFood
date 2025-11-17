import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, '请提供商家名称'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '请提供商家描述']
  },
  category: {
    type: String,
    required: true,
    enum: ['餐厅', '面包店', '超市', '咖啡店', '酒店', '其他']
  },
  logo: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: String,
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  businessHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建地理位置索引
merchantSchema.index({ 'address.coordinates': '2dsphere' });

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;
