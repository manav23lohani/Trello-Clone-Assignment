import mongoose, { Schema } from 'mongoose';
import { UserDocument } from './user.types';

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model<UserDocument>('User', userSchema);