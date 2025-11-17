import Order from '../models/Order.js';
import FoodBag from '../models/FoodBag.js';

// 生成6位取货码
const generatePickupCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    创建订单
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { foodBagId, quantity = 1 } = req.body;

    const foodBag = await FoodBag.findById(foodBagId).populate('merchant');

    if (!foodBag) {
      return res.status(404).json({ message: '食物包不存在' });
    }

    if (foodBag.status !== 'available' || foodBag.quantity < quantity) {
      return res.status(400).json({ message: '食物包已售罄或数量不足' });
    }

    const order = await Order.create({
      user: req.user._id,
      merchant: foodBag.merchant._id,
      foodBag: foodBagId,
      quantity,
      totalPrice: foodBag.discountedPrice * quantity,
      pickupTime: foodBag.pickupTime,
      pickupCode: generatePickupCode(),
      paymentStatus: 'paid' // 简化流程，默认已支付
    });

    // 更新食物包数量
    foodBag.quantity -= quantity;
    if (foodBag.quantity === 0) {
      foodBag.status = 'sold_out';
    }
    await foodBag.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone')
      .populate('merchant', 'name address phone')
      .populate('foodBag', 'name description images');

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取用户订单
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('merchant', 'name address phone logo')
      .populate('foodBag', 'name description images')
      .sort('-createdAt');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取商家订单
// @route   GET /api/orders/merchant/:merchantId
// @access  Private/Merchant
export const getMerchantOrders = async (req, res) => {
  try {
    const orders = await Order.find({ merchant: req.params.merchantId })
      .populate('user', 'name email phone')
      .populate('foodBag', 'name description')
      .sort('-createdAt');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取单个订单
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('merchant', 'name address phone logo')
      .populate('foodBag', 'name description images pickupTime');

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    // 检查权限
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'merchant' && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限查看此订单' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    更新订单状态
// @route   PUT /api/orders/:id/status
// @access  Private/Merchant
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    取消订单
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: '无权限取消此订单' });
    }

    if (order.status === 'completed' || order.status === 'cancelled') {
      return res.status(400).json({ message: '此订单无法取消' });
    }

    order.status = 'cancelled';
    await order.save();

    // 恢复食物包数量
    const foodBag = await FoodBag.findById(order.foodBag);
    if (foodBag) {
      foodBag.quantity += order.quantity;
      if (foodBag.status === 'sold_out') {
        foodBag.status = 'available';
      }
      await foodBag.save();
    }

    res.json({ message: '订单已取消' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    评价订单
// @route   PUT /api/orders/:id/review
// @access  Private
export const reviewOrder = async (req, res) => {
  try {
    const { score, comment } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: '无权限评价此订单' });
    }

    if (order.status !== 'completed') {
      return res.status(400).json({ message: '只能评价已完成的订单' });
    }

    order.rating = {
      score,
      comment,
      createdAt: new Date()
    };

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
