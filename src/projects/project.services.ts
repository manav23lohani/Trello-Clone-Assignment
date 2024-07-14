import { Types } from "mongoose";
import projectRepo from "./project.repo";
import { projectResponses } from "./project.responses";

const getAllProjectsOfUser = async (userid: string, page: number, limit: number) => {
    try {
        const userId = new Types.ObjectId(userid);
        const projects = await projectRepo.getAllProjectsOfUser(userId, { page, limit });
        return projects;
    } catch (err: any) {
        throw projectResponses.SERVER_ERR;
    }
};

const getProjectByIdAndUser = async (userid: string, projectid: string) => {
    try {
        const userId = new Types.ObjectId(userid);
        const projectId = new Types.ObjectId(projectid);

        const project = await projectRepo.getProjectByIdAndUser(userId, projectId);

        if (!project) {
            throw projectResponses.NOT_FOUND;
        }

        return project;
    } catch (err: any) {
        if (err?.statusCode) throw err;
        throw projectResponses.SERVER_ERR;
    }
};

const addProject = async(name: string, description: string, createdBy: string) => {
    try{
        const userId = new Types.ObjectId(createdBy);

        await projectRepo.addNewProject(name, description, userId);
        
        return projectResponses.ADDED_SUCCESSFULLY;
    }catch(err: any){
        throw projectResponses.SERVER_ERR;
    }
};

export default {getAllProjectsOfUser, getProjectByIdAndUser, addProject};