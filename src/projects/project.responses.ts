interface IResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}
export const projectResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "INTERNAL SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "PROJECT NOT FOUND",
	},
    ADDED_SUCCESSFULLY: {
        statusCode: 201,
        message: "PROJECT ADDED SUCCESSFULLY"
    }
};
