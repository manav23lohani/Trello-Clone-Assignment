import { Router } from "express";
import { Route } from "../routes/routes.types";
import projectServices from "./project.services";
import { validator } from "../utilities/validator";
import { ZProject } from "./project.types";

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
        const userId = req.user._id, projectId = req.params.id;

        const response = await projectServices.getProjectByIdAndUser(userId, projectId);
        res.send(response);
    }catch(e){
        next(e);
    }
});

router.post("/", validator("body", ZProject), async(req, res, next)=>{
    try{
        const name: string = req.body.name, description: string = req.body.description;
        const createdBy: string = req.user._id;
        
        const response = await projectServices.addProject(name, description, createdBy);

        res.send(response);
    }catch(e){
        next(e);
    }
});

export default new Route("/project", router);