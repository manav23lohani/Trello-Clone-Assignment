import { z } from "zod";
import { Document, Types } from "mongoose";

export const ZTask = z.object({
    project: z.string().min(1, { message: "Task should be associated with a project" }),
    name: z.string().min(1, { message: "Task should have a name" }).max(40, { message: "Task name cannot be more than 100 characters" }),
    description: z.string().min(1, { message: "Task should have a detailed description" }).max(400, { message: "Description cannot be more than 500 characters" }),
    status: z.enum(["Backlog", "In Discussion", "In Progress", "Done"]).default("Backlog"),
    tags: z.array(z.string()).default([]),
    dueDate: z.string().date(),
    assignedUser: z.string()
});

export interface ITask extends z.infer<typeof ZTask>{};

export interface TaskDocument extends Document {
    project: Types.ObjectId;
    name: string;
    description: string;
    status: "Backlog" | "In Discussion" | "In Progress" | "Done";
    tags: string[];
    dueDate: Date;
    assignedUser: Types.ObjectId;
}