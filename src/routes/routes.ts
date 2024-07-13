import { Application, json, Request, Response, NextFunction } from "express";

import { routes, unprotectedRoutes } from "./routes.data";
import { validateToken } from "../utilities/authorization";

export const registerMiddlewares = (app: Application) => {
	app.use(json());

	app.use(validateToken(unprotectedRoutes));

	for (let route of routes) {
		app.use(route.path, route.router);
	}
	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		res.status(err.statusCode || 500).send(err);
	});
};