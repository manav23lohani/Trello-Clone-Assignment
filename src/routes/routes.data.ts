import projectRoutes from "../projects/project.routes";
import userRoutes from "../users/user.routes";
import { UnprotectedRoutes, Route } from "./routes.types";

export const routes: Route[] = [userRoutes, projectRoutes];

export const unprotectedRoutes: UnprotectedRoutes = [
	{ path: "/user/login", method: "POST" },
	{ path: "/user/signup", method: "POST" },
];
