import express from 'express';
import {
  getFoodBags,
  getNearbyFoodBags,
  getFoodBagById,
  createFoodBag,
  updateFoodBag,
  deleteFoodBag
} from '../controllers/foodBagController.js';
import { protect, merchantOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getFoodBags)
  .post(protect, merchantOnly, createFoodBag);

router.get('/nearby', getNearbyFoodBags);

router.route('/:id')
  .get(getFoodBagById)
  .put(protect, merchantOnly, updateFoodBag)
  .delete(protect, merchantOnly, deleteFoodBag);

export default router;
