import { Router } from 'express';
import { 
  getAllWorkouts, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout,
  getWorkoutById
} from '../controllers/workout.controller';

const router = Router();

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.patch('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;