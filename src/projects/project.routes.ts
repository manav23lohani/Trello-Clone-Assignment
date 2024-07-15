import { Router } from "express";
import { Route } from "../routes/routes.types";
import projectServices from "./project.services";
import { validator } from "../utilities/validator";
import { IProject, ZProject } from "./project.types";

const router = Router();

router.get("/", async(req, res, next)=>{
    try{
        const userId = req.user._id;
        const page = parseInt(req.query.page as string) || 1, limit = parseInt(req.query.limit as string) || 10;
        
        const response = await projectServices.getAllProjectsOfUser(userId, page, limit);   
        res.send(response);
    }catch(e){
        next(e);
    }
});

router.get("/:id", async(req, res, next)=>{
    try{
        const projectId = req.params.id;

        const response = await projectServices.getProjectById(projectId);
        res.send(response);
    }catch(e){
        next(e);
    }
});

router.post("/", validator("body", ZProject), async(req, res, next)=>{
    try{
        const projectData: IProject = req.body;
        projectData.createdBy = req.user._id;
        const response = await projectServices.addProject(projectData);

        res.send(response);
    }catch(e){
        next(e);
    }
});

export default new Route("/project", router);