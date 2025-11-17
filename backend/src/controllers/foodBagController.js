import FoodBag from '../models/FoodBag.js';
import Merchant from '../models/Merchant.js';

// @desc    获取所有食物包
// @route   GET /api/foodbags
// @access  Public
export const getFoodBags = async (req, res) => {
  try {
    const { merchantId, status, category } = req.query;

    let query = {};

    if (merchantId) query.merchant = merchantId;
    if (status) query.status = status;
    if (category) query.category = category;

    const foodBags = await FoodBag.find(query)
      .populate('merchant', 'name address logo rating')
      .sort('-createdAt');

    res.json(foodBags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取附近的食物包
// @route   GET /api/foodbags/nearby
// @access  Public
export const getNearbyFoodBags = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: '请提供位置坐标' });
    }

    // 先找到附近的商家
    const nearbyMerchants = await Merchant.find({
      isActive: true,
      'address.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });

    const merchantIds = nearbyMerchants.map(m => m._id);

    // 获取这些商家的可用食物包
    const foodBags = await FoodBag.find({
      merchant: { $in: merchantIds },
      status: 'available',
      quantity: { $gt: 0 }
    }).populate('merchant', 'name address logo rating');

    res.json(foodBags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取单个食物包
// @route   GET /api/foodbags/:id
// @access  Public
export const getFoodBagById = async (req, res) => {
  try {
    const foodBag = await FoodBag.findById(req.params.id)
      .populate('merchant', 'name description address phone logo rating');

    if (foodBag) {
      res.json(foodBag);
    } else {
      res.status(404).json({ message: '食物包不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    创建食物包
// @route   POST /api/foodbags
// @access  Private/Merchant
export const createFoodBag = async (req, res) => {
  try {
    const { merchantId } = req.body;

    // 验证商家归属
    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      return res.status(404).json({ message: '商家不存在' });
    }

    if (merchant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限为此商家创建食物包' });
    }

    const foodBag = await FoodBag.create({
      merchant: merchantId,
      ...req.body
    });

    res.status(201).json(foodBag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    更新食物包
// @route   PUT /api/foodbags/:id
// @access  Private/Merchant
export const updateFoodBag = async (req, res) => {
  try {
    const foodBag = await FoodBag.findById(req.params.id).populate('merchant');

    if (!foodBag) {
      return res.status(404).json({ message: '食物包不存在' });
    }

    if (foodBag.merchant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限修改此食物包' });
    }

    Object.assign(foodBag, req.body);
    const updatedFoodBag = await foodBag.save();

    res.json(updatedFoodBag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    删除食物包
// @route   DELETE /api/foodbags/:id
// @access  Private/Merchant
export const deleteFoodBag = async (req, res) => {
  try {
    const foodBag = await FoodBag.findById(req.params.id).populate('merchant');

    if (!foodBag) {
      return res.status(404).json({ message: '食物包不存在' });
    }

    if (foodBag.merchant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限删除此食物包' });
    }

    await foodBag.deleteOne();
    res.json({ message: '食物包已删除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
