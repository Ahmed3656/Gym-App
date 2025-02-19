import { DietPlan, UpdatedDietPlan } from '@/types';
import DietPlanModel, { DietPlanDocument } from '@/database/models/dietPlan.model';
import mongoose from 'mongoose';
import HttpError from '@/managers/responses/http-error';

export default class DietPlanService {
  public static async getAllDietPlans(): Promise<DietPlan[]> {
    try {
      const dietPlans = await DietPlanModel.find().lean();
      return dietPlans.map(this.mapDietPlanDocument);
    } catch (error) {
      throw new HttpError(500, 'Failed to fetch diet plans');
    }
  }

  public static async getDietPlanById(id: string): Promise<DietPlan> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid diet plan ID');
    }
    const dietPlan = await DietPlanModel.findById(id).lean();
    if (!dietPlan) {
      throw new HttpError(404, 'Diet plan not found');
    }
    return this.mapDietPlanDocument(dietPlan);
  }

  public static async createDietPlan(dietPlanData: Omit<DietPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<DietPlan> {
    try {
      const newDietPlan = new DietPlanModel(dietPlanData);
      const savedDietPlan = await newDietPlan.save();
      return this.mapDietPlanDocument(savedDietPlan);
    } catch (error) {
      throw new HttpError(400, 'Failed to create diet plan');
    }
  }

  public static async updateDietPlan(id: string, updateData: UpdatedDietPlan): Promise<DietPlan> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid diet plan ID');
    }
    const updatedDietPlan = await DietPlanModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedDietPlan) {
      throw new HttpError(404, 'Diet plan not found');
    }
    return this.mapDietPlanDocument(updatedDietPlan);
  }

  public static async deleteDietPlan(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid diet plan ID');
    }
    const result = await DietPlanModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Diet plan not found');
    }
  }

  private static mapDietPlanDocument(dietPlan: DietPlanDocument): DietPlan {
    return {
      id: dietPlan.id.toString(),
      name: dietPlan.name,
      description: dietPlan.description,
      clientId: dietPlan.clientId.toString(),
      coachId: dietPlan.coachId.toString(),
      mealIds: dietPlan.mealIds.map(id => id.toString()),
      createdAt: dietPlan.createdAt,
      updatedAt: dietPlan.updatedAt
    };
  }
}
