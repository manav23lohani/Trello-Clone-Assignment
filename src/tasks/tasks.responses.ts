import { IResponses } from "../utilities/responses.type";

export const taskResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "INTERNAL SERVER ERR",
	},
    ADDED_SUCCESSFULLY: {
        statusCode: 201,
        message: "TASK ADDED SUCCESSFULLY"
    }
};