import { z } from 'zod';
import { Document } from 'mongoose';
export const ZUser = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(/[a-zA-Z0-9@$!%*?&]+/),
});

export interface IUser extends z.infer<typeof ZUser>{};
export type UserDocument = Document & IUser;