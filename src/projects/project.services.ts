import { Types } from "mongoose";
import projectRepo from "./project.repo";
import { projectResponses } from "./project.responses";
import { IProject } from "./project.types";

const getAllProjectsOfUser = async (userid: string, page: number, limit: number) => {
    try {
        const userId = new Types.ObjectId(userid);
        const projects = await projectRepo.getAllProjectsOfUser(userId, page, limit );
        return projects;
    } catch (err: any) {
        throw projectResponses.SERVER_ERR;
    }
};

const getProjectById = async (projectid: string) => {
    try {
        const projectId = new Types.ObjectId(projectid);

        const project = await projectRepo.getProjectById(projectId);

        if (!project) {
            throw projectResponses.NOT_FOUND;
        }

        return project;
    } catch (err: any) {
        if (err?.statusCode) throw err;
        throw projectResponses.SERVER_ERR;
    }
};

const addProject = async(projectData: IProject) => {
    try{
        const {name, description, createdBy} = projectData;
        
        const userId = new Types.ObjectId(createdBy);

        await projectRepo.addNewProject(name, description, userId);
        
        return projectResponses.ADDED_SUCCESSFULLY;
    }catch(err: any){
        throw projectResponses.SERVER_ERR;
    }
};

export default {getAllProjectsOfUser, getProjectById, addProject};