import { Request, Response, NextFunction } from 'express';
import IngredientService from '@/services/ingredient.service';
import { Ingredient, UpdatedIngredient } from '@/types';

export const getAllIngredients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await IngredientService.getAllIngredients();
    res.jsend.success(ingredients);
  } catch (error) {
    next(error);
  }
};

export const getIngredientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ingredient = await IngredientService.getIngredientById(id);
    res.jsend.success(ingredient);
  } catch (error) {
    next(error);
  }
};

export const createIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientData: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    const newIngredient = await IngredientService.createIngredient(ingredientData);
    res.jsend.success(newIngredient, 201);
  } catch (error) {
    next(error);
  }
};

export const updateIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: UpdatedIngredient = req.body;
    const updatedIngredient = await IngredientService.updateIngredient(id, updateData);
    res.jsend.success(updatedIngredient);
  } catch (error) {
    next(error);
  }
};

export const deleteIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await IngredientService.deleteIngredient(id);
    res.jsend.success(null, 204);
  } catch (error) {
    next(error);
  }
};
