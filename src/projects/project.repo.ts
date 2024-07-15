import { Types } from "mongoose";
import { projectModel } from "./project.schema";

const getAllProjectsOfUser = async (userId: Types.ObjectId, page: number, limit: number) => {
    const projects = await projectModel.find({ createdBy: userId })
        .select('name description')
        .skip((page - 1) * limit)
        .limit(limit);
    return projects;
}

const getProjectById = async (projectId: Types.ObjectId) => {
    const project = await projectModel
        .findOne({ _id: projectId })
        .populate('tasks')
        .populate({
            path: 'createdBy',
            select: 'name'
        })
        .populate({
            path: 'tasks.assignedUser',
            select: 'name'
        });

    return project;
}


const addNewProject = async (name: string, description: string, createdBy: Types.ObjectId) =>
    await projectModel.create({ name, description, createdBy });

export default { getAllProjectsOfUser, getProjectById, addNewProject };