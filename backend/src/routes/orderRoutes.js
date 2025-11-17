import express from 'express';
import {
  createOrder,
  getMyOrders,
  getMerchantOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  reviewOrder
} from '../controllers/orderController.js';
import { protect, merchantOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder);

router.get('/my', protect, getMyOrders);
router.get('/merchant/:merchantId', protect, merchantOnly, getMerchantOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.put('/:id/status', protect, merchantOnly, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/review', protect, reviewOrder);

export default router;
