import express from 'express';
import {
  getMerchants,
  getMerchantById,
  createMerchant,
  updateMerchant,
  deleteMerchant
} from '../controllers/merchantController.js';
import { protect, merchantOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getMerchants)
  .post(protect, merchantOnly, createMerchant);

router.route('/:id')
  .get(getMerchantById)
  .put(protect, merchantOnly, updateMerchant)
  .delete(protect, merchantOnly, deleteMerchant);

export default router;
