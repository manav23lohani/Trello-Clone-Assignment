import { IResponses } from "../utilities/responses.type";

export const userResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "INTERNAL SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "USER NOT FOUND",
	},
    ALREADY_REGISTERED: {
		statusCode: 403,
		message: "USER ALREADY REGISTERED",
	},
    SIGNUP_SUCCESSFUL: {
        statusCode: 200,
        message: "USER REGISTERED SUCCESSFULLY"
    },
	INVALID_CREDENTIALS: {
		statusCode: 403,
		message: "INVALID CREDENTIALS",
	}
};
