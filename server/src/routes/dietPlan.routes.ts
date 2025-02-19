import { Router } from 'express';
import {
  getDietPlanById,
  createDietPlan,
  updateDietPlan,
  getAllDietPlans,
  deleteDietPlan
} from '@/controllers/dietPlan.controller';

const router = Router();

router.get('/', getAllDietPlans);
router.get('/:id', getDietPlanById);
router.post('/', createDietPlan);
router.patch('/:id', updateDietPlan);
router.delete('/:id', deleteDietPlan);

export default router;
