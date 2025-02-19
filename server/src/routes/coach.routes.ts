import { Router } from 'express';
import {
  getCoachById,
  createCoach,
  updateCoach,
  getAllCoaches,
  deleteCoach
} from '@/controllers/coach.controller';

const router = Router();

router.get('/', getAllCoaches);
router.get('/:id', getCoachById);
router.post('/', createCoach);
router.patch('/:id', updateCoach);
router.delete('/:id', deleteCoach);

export default router;
