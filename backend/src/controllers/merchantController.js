import Merchant from '../models/Merchant.js';

// @desc    获取所有商家
// @route   GET /api/merchants
// @access  Public
export const getMerchants = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters

    let query = { isActive: true };

    // 如果提供了坐标，查找附近的商家
    if (lat && lng) {
      query['address.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      };
    }

    const merchants = await Merchant.find(query).populate('owner', 'name email');
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取单个商家
// @route   GET /api/merchants/:id
// @access  Public
export const getMerchantById = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id).populate('owner', 'name email');

    if (merchant) {
      res.json(merchant);
    } else {
      res.status(404).json({ message: '商家不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    创建商家
// @route   POST /api/merchants
// @access  Private/Merchant
export const createMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.create({
      owner: req.user._id,
      ...req.body
    });

    res.status(201).json(merchant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    更新商家
// @route   PUT /api/merchants/:id
// @access  Private/Merchant
export const updateMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if (!merchant) {
      return res.status(404).json({ message: '商家不存在' });
    }

    // 检查是否是商家所有者
    if (merchant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限修改此商家' });
    }

    Object.assign(merchant, req.body);
    const updatedMerchant = await merchant.save();

    res.json(updatedMerchant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    删除商家
// @route   DELETE /api/merchants/:id
// @access  Private/Merchant
export const deleteMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if (!merchant) {
      return res.status(404).json({ message: '商家不存在' });
    }

    if (merchant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限删除此商家' });
    }

    await merchant.deleteOne();
    res.json({ message: '商家已删除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
