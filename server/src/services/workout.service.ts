import { Workout, UpdatedWorkout } from '../types';

export default class WorkoutService {
  // mock db
  private static workouts: Workout[] = [];

  public static getAllWorkouts(): Workout[] {
    return this.workouts;
  }

  public static getWorkoutById(id: string): Workout | undefined {
    return this.workouts.find(workout => workout.id === id);
  }

  public static createWorkout(workoutData: Workout): Workout {
    const newWorkout: Workout = {
      ...workoutData,
      id: Date.now().toString(), // for now
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.workouts.push(newWorkout);
    return newWorkout;
  }

  public static updateWorkout(id: string, updateData: UpdatedWorkout): Workout | null {
    const workoutIndex = this.workouts.findIndex(workout => workout.id === id);

    if (workoutIndex === -1) {
      return null;
    }

    this.workouts[workoutIndex] = {
      ...this.workouts[workoutIndex],
      ...updateData,
      updatedAt: new Date()
    };

    return this.workouts[workoutIndex];
  }

  public static deleteWorkout(id: string): boolean {
    const workoutIndex = this.workouts.findIndex(workout => workout.id === id);

    if (workoutIndex === -1) {
      return false;
    }

    this.workouts.splice(workoutIndex, 1);
    return true;
  }
}