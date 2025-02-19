import mongoose, { Schema, Document } from 'mongoose';
import { Client } from '@/types';

export interface ClientDocument extends Omit<Client, 'id'>, Document {}

const ClientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  fitnessGoals: [{ type: String }],
  coachId: { type: Schema.Types.ObjectId, ref: 'Coach' }
}, {
  timestamps: true
});

export default mongoose.model<ClientDocument>('Client', ClientSchema);
