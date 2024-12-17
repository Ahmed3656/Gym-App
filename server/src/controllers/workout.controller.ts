import { Request, Response } from 'express';
import WorkoutService from '../services/workout.service';
import { Workout, UpdatedWorkout } from '../types';

export const getAllWorkouts = (req: Request, res: Response) => {
  const workouts = WorkoutService.getAllWorkouts();
  res.jsend.success(workouts);
};

export const getWorkoutById = (req: Request, res: Response) => {
  const { id } = req.params;
  const workout = WorkoutService.getWorkoutById(id);

  if (!workout) res.jsend.fail({ workout: 'Workout not found' }, 404);

  res.jsend.success(workout);
};

export const createWorkout = (req: Request, res: Response) => {
  try {
    const workoutData: Workout = req.body;
    const newWorkout = WorkoutService.createWorkout(workoutData);

    res.jsend.success(newWorkout, 201);
  } catch (error) {
    res.jsend.error(error instanceof Error ? error.message : 'Error creating workout');
  }
};

export const updateWorkout = (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdatedWorkout = req.body;

  const updatedWorkout = WorkoutService.updateWorkout(id, updateData);

  if (!updatedWorkout) res.jsend.fail({ workout: 'Workout not found' }, 404);

  res.jsend.success(updatedWorkout);
};

export const deleteWorkout = (req: Request, res: Response) => {
  const { id } = req.params;
  const isDeleted = WorkoutService.deleteWorkout(id);

  if (!isDeleted) res.jsend.fail({ workout: 'Workout not found' }, 404);

  res.jsend.success(null, 204);
};