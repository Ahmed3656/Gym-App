import mongoose, { Schema, Document } from 'mongoose';
import { Coach } from '@/types';

export interface CoachDocument extends Omit<Coach, 'id'>, Document {}

const CoachSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  specialties: [{ type: String }],
  clientIds: [{ type: Schema.Types.ObjectId, ref: 'Client' }]
}, {
  timestamps: true
});

export default mongoose.model<CoachDocument>('Coach', CoachSchema);
