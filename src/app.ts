import express from "express";
import { connectToMongoDB } from "./connections/mongooseConnection";

export const startServer = async () => {
	try {
		const app = express();

		await connectToMongoDB();
		
        const { PORT } = process.env;
		app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
