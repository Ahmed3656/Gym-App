import { Request, Response, NextFunction } from 'express';
import MealService from '@/services/meal.service';
import { Meal, UpdatedMeal } from '@/types';

export const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meals = await MealService.getAllMeals();
    res.jsend.success(meals);
  } catch (error) {
    next(error);
  }
};

export const getMealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const meal = await MealService.getMealById(id);
    res.jsend.success(meal);
  } catch (error) {
    next(error);
  }
};

export const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    const newMeal = await MealService.createMeal(mealData);
    res.jsend.success(newMeal, 201);
  } catch (error) {
    next(error);
  }
};

export const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: UpdatedMeal = req.body;
    const updatedMeal = await MealService.updateMeal(id, updateData);
    res.jsend.success(updatedMeal);
  } catch (error) {
    next(error);
  }
};

export const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await MealService.deleteMeal(id);
    res.jsend.success(null, 204);
  } catch (error) {
    next(error);
  }
};
