import { Types } from "mongoose";
import { taskModel } from "./tasks.schema";

const addNewTask = async(project: Types.ObjectId, name: string, description: string, status: string, tags: string[], dueDate: Date, assignedUser: Types.ObjectId) => {
    const task = await taskModel.create({project, name, description, status, tags, dueDate, assignedUser});
    return task;
};

const getAllTasks = async () => {
    const tasksByStatus = await taskModel.aggregate([
        {
            $lookup: {
                from: 'projects',
                localField: 'project',
                foreignField: '_id',
                as: 'project'
            }
        },
        {
            $unwind: '$project'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'assignedUser',
                foreignField: '_id',
                as: 'assignedUser'
            }
        },
        {
            $unwind: '$assignedUser'
        },
        {
            $group: {
                _id: '$status',
                tasks: {
                    $push: {
                        _id: '$_id',
                        name: '$name',
                        description: '$description',
                        project: {
                            _id: '$project._id',
                            name: '$project.name'
                        },
                        assignedUser: {
                            _id: '$assignedUser._id',
                            name: '$assignedUser.name'
                        }
                    }
                }
            }
        }
    ]);
    return tasksByStatus;
};



export default {addNewTask, getAllTasks};