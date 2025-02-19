import { Workout, UpdatedWorkout } from '@/types';
import WorkoutModel, { WorkoutDocument } from '@/database/models/workout.model';
import mongoose from 'mongoose';
import HttpError from '@/managers/responses/http-error';

export default class WorkoutService {
  public static async getAllWorkouts(): Promise<Workout[]> {
    try {
      const workouts = await WorkoutModel.find().lean();
      return workouts.map(this.mapWorkoutDocument);
    } catch (error) {
      throw new HttpError(500, 'Failed to fetch workouts');
    }
  }

  public static async getWorkoutById(id: string): Promise<Workout> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid workout ID');
    }
    const workout = await WorkoutModel.findById(id).lean();
    if (!workout) {
      throw new HttpError(404, 'Workout not found');
    }
    return this.mapWorkoutDocument(workout);
  }

  public static async createWorkout(workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workout> {
    try {
      const newWorkout = new WorkoutModel(workoutData);
      const savedWorkout = await newWorkout.save();
      return this.mapWorkoutDocument(savedWorkout);
    } catch (error) {
      throw new HttpError(400, 'Failed to create workout');
    }
  }

  public static async updateWorkout(id: string, updateData: UpdatedWorkout): Promise<Workout> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid workout ID');
    }
    const updatedWorkout = await WorkoutModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedWorkout) {
      throw new HttpError(404, 'Workout not found');
    }
    return this.mapWorkoutDocument(updatedWorkout);
  }

  public static async deleteWorkout(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid workout ID');
    }
    const result = await WorkoutModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Workout not found');
    }
  }

  private static mapWorkoutDocument(workout: WorkoutDocument): Workout {
    return {
      id: workout.id.toString(),
      name: workout.name,
      description: workout.description,
      clientsId: workout.clientsId?.map(id => id.toString()),
      duration: workout.duration,
      intensity: workout.intensity,
      muscleGroups: workout.muscleGroups,
      date: workout.date,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt
    };
  }
}
