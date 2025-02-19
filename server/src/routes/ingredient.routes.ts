import { Router } from 'express';
import {
  getIngredientById,
  createIngredient,
  updateIngredient,
  getAllIngredients,
  deleteIngredient
} from '@/controllers/ingredient.controller';

const router = Router();

router.get('/', getAllIngredients);
router.get('/:id', getIngredientById);
router.post('/', createIngredient);
router.patch('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router;
