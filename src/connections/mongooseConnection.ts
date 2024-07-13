import mongoose from "mongoose";

export const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("CONNECTED TO MONGO DB");
		return true;
	} catch (e) {
		throw "FAILED TO CONNECT MONGODB";
	}
};