import { Meal, UpdatedMeal } from '@/types';
import MealModel, { MealDocument } from '@/database/models/meal.model';
import mongoose from 'mongoose';
import HttpError from '@/managers/responses/http-error';

export default class MealService {
  public static async getAllMeals(): Promise<Meal[]> {
    try {
      const meals = await MealModel.find().lean();
      return meals.map(this.mapMealDocument);
    } catch (error) {
      throw new HttpError(500, 'Failed to fetch meals');
    }
  }

  public static async getMealById(id: string): Promise<Meal> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid meal ID');
    }
    const meal = await MealModel.findById(id).lean();
    if (!meal) {
      throw new HttpError(404, 'Meal not found');
    }
    return this.mapMealDocument(meal);
  }

  public static async createMeal(mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meal> {
    try {
      const newMeal = new MealModel(mealData);
      const savedMeal = await newMeal.save();
      return this.mapMealDocument(savedMeal);
    } catch (error) {
      throw new HttpError(400, 'Failed to create meal');
    }
  }

  public static async updateMeal(id: string, updateData: UpdatedMeal): Promise<Meal> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid meal ID');
    }
    const updatedMeal = await MealModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedMeal) {
      throw new HttpError(404, 'Meal not found');
    }
    return this.mapMealDocument(updatedMeal);
  }

  public static async deleteMeal(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid meal ID');
    }
    const result = await MealModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Meal not found');
    }
  }

  private static mapMealDocument(meal: MealDocument): Meal {
    return {
      id: meal.id.toString(),
      name: meal.name,
      description: meal.description,
      ingredientIds: meal.ingredientIds.map(id => id.toString()),
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      createdAt: meal.createdAt,
      updatedAt: meal.updatedAt
    };
  }
}
