import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UnprotectedRoutes } from "../routes/routes.types";

export const validateToken = (unprotectedRoutes: UnprotectedRoutes) => (req: Request, res: Response, next: NextFunction) => {
	try {
		if (unprotectedRoutes.find((route) => route.path === req.url && route.method === req.method)) return next();

		const token = req.headers.authorization?.split(" ")[1];
		if (!token) throw "FORBIDDEN";

		const { JWT_SECRET } = process.env;
		const payload = verify(token, JWT_SECRET);

		req.user = payload as string;

		next();
	} catch (e) {
		next({ statusCode: 403, message: "FORBIDDEN", err: e });
	}
};
