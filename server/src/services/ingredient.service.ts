import { Ingredient, UpdatedIngredient } from '@/types';
import IngredientModel, { IngredientDocument } from '@/database/models/ingredient.model';
import mongoose from 'mongoose';
import HttpError from '@/managers/responses/http-error';

export default class IngredientService {
  public static async getAllIngredients(): Promise<Ingredient[]> {
    try {
      const ingredients = await IngredientModel.find().lean();
      return ingredients.map(this.mapIngredientDocument);
    } catch (error) {
      throw new HttpError(500, 'Failed to fetch ingredients');
    }
  }

  public static async getIngredientById(id: string): Promise<Ingredient> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid ingredient ID');
    }
    const ingredient = await IngredientModel.findById(id).lean();
    if (!ingredient) {
      throw new HttpError(404, 'Ingredient not found');
    }
    return this.mapIngredientDocument(ingredient);
  }

  public static async createIngredient(ingredientData: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ingredient> {
    try {
      const newIngredient = new IngredientModel(ingredientData);
      const savedIngredient = await newIngredient.save();
      return this.mapIngredientDocument(savedIngredient);
    } catch (error) {
      throw new HttpError(400, 'Failed to create ingredient');
    }
  }

  public static async updateIngredient(id: string, updateData: UpdatedIngredient): Promise<Ingredient> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid ingredient ID');
    }
    const updatedIngredient = await IngredientModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedIngredient) {
      throw new HttpError(404, 'Ingredient not found');
    }
    return this.mapIngredientDocument(updatedIngredient);
  }

  public static async deleteIngredient(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid ingredient ID');
    }
    const result = await IngredientModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Ingredient not found');
    }
  }

  private static mapIngredientDocument(ingredient: IngredientDocument): Ingredient {
    return {
      id: ingredient.id.toString(),
      name: ingredient.name,
      calories: ingredient.calories,
      protein: ingredient.protein,
      carbs: ingredient.carbs,
      fat: ingredient.fat,
      unit: ingredient.unit,
      createdAt: ingredient.createdAt,
      updatedAt: ingredient.updatedAt
    };
  }
}
