import mongoose, { Schema, Document } from 'mongoose';
import { Ingredient } from '@/types';

export interface IngredientDocument extends Omit<Ingredient, 'id'>, Document {}

const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  unit: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IngredientDocument>('Ingredient', IngredientSchema);
