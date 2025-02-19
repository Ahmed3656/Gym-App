import { Request, Response, NextFunction } from 'express';
import WorkoutService from '@/services/workout.service';
import { Workout, UpdatedWorkout } from '@/types';

export const getAllWorkouts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await WorkoutService.getAllWorkouts();
    res.jsend.success(workouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const workout = await WorkoutService.getWorkoutById(id);
    res.jsend.success(workout);
  } catch (error) {
    next(error);
  }
};

export const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    const newWorkout = await WorkoutService.createWorkout(workoutData);
    res.jsend.success(newWorkout, 201);
  } catch (error) {
    next(error);
  }
};

export const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: UpdatedWorkout = req.body;
    const updatedWorkout = await WorkoutService.updateWorkout(id, updateData);
    res.jsend.success(updatedWorkout);
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await WorkoutService.deleteWorkout(id);
    res.jsend.success(null, 204);
  } catch (error) {
    next(error);
  }
};
