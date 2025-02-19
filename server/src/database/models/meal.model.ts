import mongoose, { Schema, Document } from 'mongoose';
import { Meal } from '@/types';

export interface MealDocument extends Omit<Meal, 'id'>, Document {}

const MealSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  ingredientIds: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model<MealDocument>('Meal', MealSchema);
