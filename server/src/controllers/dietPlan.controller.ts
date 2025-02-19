import { Request, Response, NextFunction } from 'express';
import DietPlanService from '@/services/dietPlan.service';
import { DietPlan, UpdatedDietPlan } from '@/types';

export const getAllDietPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dietPlans = await DietPlanService.getAllDietPlans();
    res.jsend.success(dietPlans);
  } catch (error) {
    next(error);
  }
};

export const getDietPlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const dietPlan = await DietPlanService.getDietPlanById(id);
    res.jsend.success(dietPlan);
  } catch (error) {
    next(error);
  }
};

export const createDietPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dietPlanData: Omit<DietPlan, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    const newDietPlan = await DietPlanService.createDietPlan(dietPlanData);
    res.jsend.success(newDietPlan, 201);
  } catch (error) {
    next(error);
  }
};

export const updateDietPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: UpdatedDietPlan = req.body;
    const updatedDietPlan = await DietPlanService.updateDietPlan(id, updateData);
    res.jsend.success(updatedDietPlan);
  } catch (error) {
    next(error);
  }
};

export const deleteDietPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await DietPlanService.deleteDietPlan(id);
    res.jsend.success(null, 204);
  } catch (error) {
    next(error);
  }
};
