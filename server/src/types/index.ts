interface BaseInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends BaseInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  fitnessGoals?: string[];
}
export interface UpdatedClient extends Partial<Client> {}

export interface Workout extends BaseInterface {
  name: string;
  description?: string;
  clientsId?: string[];
  duration: [number, number];
  intensity: 'low' | 'medium' | 'high';
  muscleGroups: string[];
  date: Date;
}
export interface UpdatedWorkout extends Partial<Workout> {}