import { Request, Response, NextFunction } from 'express';
import CoachService from '@/services/coach.service';
import { Coach, UpdatedCoach } from '@/types';

export const getAllCoaches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coaches = await CoachService.getAllCoaches();
    res.jsend.success(coaches);
  } catch (error) {
    next(error);
  }
};

export const getCoachById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const coach = await CoachService.getCoachById(id);
    res.jsend.success(coach);
  } catch (error) {
    next(error);
  }
};

export const createCoach = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coachData: Omit<Coach, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    const newCoach = await CoachService.createCoach(coachData);
    res.jsend.success(newCoach, 201);
  } catch (error) {
    next(error);
  }
};

export const updateCoach = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: UpdatedCoach = req.body;
    const updatedCoach = await CoachService.updateCoach(id, updateData);
    res.jsend.success(updatedCoach);
  } catch (error) {
    next(error);
  }
};

export const deleteCoach = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await CoachService.deleteCoach(id);
    res.jsend.success(null, 204);
  } catch (error) {
    next(error);
  }
};
