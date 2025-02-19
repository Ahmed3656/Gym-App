import mongoose, { Schema, Document } from 'mongoose';
import { DietPlan } from '@/types';

export interface DietPlanDocument extends Omit<DietPlan, 'id'>, Document {}

const DietPlanSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  coachId: { type: Schema.Types.ObjectId, ref: 'Coach', required: true },
  mealIds: [{ type: Schema.Types.ObjectId, ref: 'Meal' }]
}, {
  timestamps: true
});

export default mongoose.model<DietPlanDocument>('DietPlan', DietPlanSchema);
