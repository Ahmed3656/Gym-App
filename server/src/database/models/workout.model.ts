import mongoose, { Schema, Document } from 'mongoose';
import { Workout } from '@/types';

export interface WorkoutDocument extends Omit<Workout, 'id'>, Document {}

const WorkoutSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  clientsId: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  duration: [{ type: Number, required: true }],
  intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  muscleGroups: [{ type: String, required: true }],
  date: { type: Date, required: true }
}, {
  timestamps: true
});

export default mongoose.model<WorkoutDocument>('Workout', WorkoutSchema);
