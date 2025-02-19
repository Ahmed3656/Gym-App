import { Router } from 'express';
import {
  getMealById,
  createMeal,
  updateMeal,
  getAllMeals,
  deleteMeal
} from '@/controllers/meal.controller';

const router = Router();

router.get('/', getAllMeals);
router.get('/:id', getMealById);
router.post('/', createMeal);
router.patch('/:id', updateMeal);
router.delete('/:id', deleteMeal);

export default router;
