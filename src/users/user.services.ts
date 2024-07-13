import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { encrypt } from "../utilities/encryption";
import userRepo from "./user.repo";
import { userResponses } from "./user.responses";
import { IUser } from "../users/user.types";

const login = async (credentials: Omit<IUser, 'name'>) => {
	try {
		const user = await userRepo.findUser({ email: credentials.email });
        if(user){
		    const didMatch = await compare(credentials.password, user.password);
            if (!didMatch) throw userResponses.INVALID_CREDENTIALS;

            const { email, name } = user;
            const { JWT_SECRET } = process.env;
            
            const token = jwt.sign({ name, email }, JWT_SECRET || "");
            
            return { token };
        }
	} catch (err: any) {
		if (err.statusCode) throw err;
		throw userResponses.SERVER_ERR;
	}
};

const signup = async (userData: IUser) => {
	try {
		const user = await userRepo.findUser({email: userData.email});
		if (user) throw userResponses.USER_ALREADY_REGISTERED;

		const encryptedPassword = await encrypt(userData.password);
		userData = { ...userData, password: encryptedPassword };

		await userRepo.addUser(userData);
		
        return userResponses.SIGNUP_SUCCESSFUL;
	} catch (err: any) {
		if (err.statusCode) throw err;
		throw userResponses.SERVER_ERR;
	}
};

export default {
	login,
	signup,
};