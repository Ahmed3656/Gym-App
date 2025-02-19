interface BaseInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Client extends BaseInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  fitnessGoals?: string[];
  coachId?: string;
};
export interface UpdatedClient extends Partial<Client> {};

export interface Coach extends BaseInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialties?: string[];
  clientIds?: string[];
};
export interface UpdatedCoach extends Partial<Coach> {};

export interface DietPlan extends BaseInterface {
  name: string;
  description?: string;
  clientId: string;
  coachId: string;
  mealIds: string[];
};
export interface UpdatedDietPlan extends Partial<DietPlan> {};

export interface Ingredient extends BaseInterface {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: string;
};
export interface UpdatedIngredient extends Partial<Ingredient> {};

export interface Meal extends BaseInterface {
  name: string;
  description?: string;
  ingredientIds: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
export interface UpdatedMeal extends Partial<Meal> {};

export interface Workout extends BaseInterface {
  name: string;
  description?: string;
  clientsId?: string[];
  duration: [number, number];
  intensity: 'low' | 'medium' | 'high';
  muscleGroups: string[];
  date: Date;
};
export interface UpdatedWorkout extends Partial<Workout> {};
