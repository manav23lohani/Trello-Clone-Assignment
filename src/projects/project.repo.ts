import {Types} from "mongoose";
import { projectModel } from "./project.schema";

interface PaginationOptions {
    page: number;
    limit: number;
}

const getAllProjectsOfUser = async (userId: Types.ObjectId, options: PaginationOptions) => {
    const { page, limit } = options;
    const projects = await projectModel.find({ createdBy: userId })
        .select('name description')
        .skip((page - 1) * limit)
        .limit(limit);
    return projects;
}

const getProjectByIdAndUser = async (userId: Types.ObjectId, projectId: Types.ObjectId) => {
    const project = await projectModel.findOne({ _id: projectId, createdBy: userId });
        // .populate({
        //     path: 'tasks',
        //     model: 'Task'
        // });
    return project;
}

const addNewProject = async (name: string, description: string, createdBy: Types.ObjectId) =>
    await projectModel.create({ name, description, createdBy });

export default { getAllProjectsOfUser, getProjectByIdAndUser, addNewProject };