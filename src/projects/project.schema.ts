import mongoose, { Schema } from "mongoose";
import { ProjectDocument } from "./project.types";

const projectSchema = new Schema<ProjectDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const projectModel = mongoose.model<ProjectDocument>('Project', projectSchema);