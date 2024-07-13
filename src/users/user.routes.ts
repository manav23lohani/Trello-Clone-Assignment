import { Router } from "express";
import { Route } from "../routes/routes.types";
import userServices from "./user.services";

const router = Router();
router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const response = await userServices.login({email, password});
        res.send(response);
    } catch (e) {
        next(e);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const response = await userServices.signup({name, email, password});
        res.send(response);
    } catch (e) {
        next(e);
    }
});

export default new Route("/user", router);