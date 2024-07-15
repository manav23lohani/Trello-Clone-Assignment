import { Types } from "mongoose"
import tasksRepo from "./tasks.repo";
import { taskResponses } from "./tasks.responses";
import { ITask } from "./tasks.types";
import projectServices from "../projects/project.services";

const addNewTask = async(taskData: ITask) => {
    try{
        const projectId = new Types.ObjectId(taskData.project);
        const assignedUser = new Types.ObjectId(taskData.assignedUser);
        const {name, description, status, tags, dueDate} = taskData;
        
        const task = await tasksRepo.addNewTask(projectId, name, description, status, tags, new Date(dueDate), assignedUser);
        
        const project = await projectServices.getProjectById(taskData.project);
                
        project.tasks.push(task.id);
        await project.save();
 
        return taskResponses.ADDED_SUCCESSFULLY;
    }catch(err: any){
        if(err?.statusCode)     throw err;
        throw taskResponses.SERVER_ERR;
    }
};

const getAllTasks = async() => {
    try{
        const tasks = await tasksRepo.getAllTasks();
        return tasks;
    }catch(err: any){
        throw taskResponses.SERVER_ERR;
    }
};

export default {getAllTasks, addNewTask};