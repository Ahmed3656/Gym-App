import { Coach, UpdatedCoach } from '@/types';
import CoachModel, { CoachDocument } from '@/database/models/coach.model';
import mongoose from 'mongoose';
import HttpError from '@/managers/responses/http-error';

export default class CoachService {
  public static async getAllCoaches(): Promise<Coach[]> {
    try {
      const coaches = await CoachModel.find().lean();
      return coaches.map(this.mapCoachDocument);
    } catch (error) {
      throw new HttpError(500, 'Failed to fetch coaches');
    }
  }

  public static async getCoachById(id: string): Promise<Coach> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid coach ID');
    }
    const coach = await CoachModel.findById(id).lean();
    if (!coach) {
      throw new HttpError(404, 'Coach not found');
    }
    return this.mapCoachDocument(coach);
  }

  public static async createCoach(coachData: Omit<Coach, 'id' | 'createdAt' | 'updatedAt'>): Promise<Coach> {
    try {
      const newCoach = new CoachModel(coachData);
      const savedCoach = await newCoach.save();
      return this.mapCoachDocument(savedCoach);
    } catch (error) {
      throw new HttpError(400, 'Failed to create coach');
    }
  }

  public static async updateCoach(id: string, updateData: UpdatedCoach): Promise<Coach> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid coach ID');
    }
    const updatedCoach = await CoachModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedCoach) {
      throw new HttpError(404, 'Coach not found');
    }
    return this.mapCoachDocument(updatedCoach);
  }

  public static async deleteCoach(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid coach ID');
    }
    const result = await CoachModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Coach not found');
    }
  }

  private static mapCoachDocument(coach: CoachDocument): Coach {
    return {
      id: coach.id.toString(),
      firstName: coach.firstName,
      lastName: coach.lastName,
      email: coach.email,
      phoneNumber: coach.phoneNumber,
      specialties: coach.specialties,
      clientIds: coach.clientIds?.map(id => id.toString()),
      createdAt: coach.createdAt,
      updatedAt: coach.updatedAt
    };
  }
}
