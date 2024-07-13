import { Router } from "express";
type UnprotectedRoute = {
	path: string;
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
};

export type UnprotectedRoutes = UnprotectedRoute[];

export class Route {
	static registeredRoutes: Route[] = [];

	constructor(public path: string, public router: Router) {
		if (!path.startsWith("/")) {
			throw new Error("INVALID PATH");
		}

		if (Route.registeredRoutes.find((route) => route.path === this.path)) {
			throw new Error(`PATH: ${this.path} ALREADY EXISTS`);
		}

		Route.registeredRoutes.push(this);
	}
}