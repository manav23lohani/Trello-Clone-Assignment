import { z } from 'zod';
import { Document } from 'mongoose';
export const ZUser = z.object({
  name: z.string().min(1,{message: 'Name cannot be empty'}).max(50, {message: 'Name cannot be more than 50 characters'}),
  email: z.string().email({message: 'Not a valid email'}),
  password: z.string().min(8, {message: 'Password should contain minimum 8 characters'}),
});

export interface IUser extends z.infer<typeof ZUser>{};
export type UserDocument = Document & IUser;