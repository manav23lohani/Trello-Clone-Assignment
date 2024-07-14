import { z } from "zod";
import { Document, Types } from "mongoose";

export const ZProject = z.object({
    name: z.string().min(1, {message: "Project should have a name"}).max(30, {message: "Project name cannot be more than 30 characters"}),
    description: z.string().min(1, {message: "Project should have a description"}).max(300, {message: "Description cannot be more than 300 characters"}),
    tasks: z.array(z.string()).default([]),
    createdBy: z.string().optional()
});

export interface IProject extends z.infer<typeof ZProject>{};

export interface ProjectDocument extends Document {
    name: string;
    description: string;
    tasks: Types.ObjectId[];
    createdBy: Types.ObjectId;
}