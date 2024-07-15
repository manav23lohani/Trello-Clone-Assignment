import { Router } from "express";
import tasksServices from "./tasks.services";
import { ITask, ZTask } from "./tasks.types";
import { Route } from "../routes/routes.types";
import { validator } from "../utilities/validator";

const router = Router();

router.post("/", validator("body", ZTask), async (req, res, next) => {
    try {
        const taskData: ITask = req.body;
        const response = await tasksServices.addNewTask(taskData);
        res.send(response);
    } catch (e) {
        next(e);
    }
});

router.get("/", async(req, res, next) => {
    try{
        const tasks = await tasksServices.getAllTasks();
        res.send(tasks);
    }catch(e){
        next(e);
    }
});

export default new Route("/task", router);