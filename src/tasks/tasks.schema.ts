import mongoose, { Schema } from "mongoose";
import { TaskDocument } from "./tasks.types";

const taskSchema = new Schema<TaskDocument>({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Backlog", "In Discussion", "In Progress", "Done"],
        default: "Backlog"
    },
    tags: [{
        type: String
    }],
    dueDate: {
        type: Date,
        required: true
    },
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const taskModel = mongoose.model<TaskDocument>('Task', taskSchema);
