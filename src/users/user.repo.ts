import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const findUsers = async (query: Partial<IUser>) => await userModel.find(query);

const findUser = async (query: Partial<IUser>) => await userModel.findOne(query);

const addUser = async (user: IUser) => await userModel.create(user);

const updateUser = async (findQuery: Partial<IUser>, updateObj: Partial<IUser>) =>
	await userModel.findOneAndUpdate(findQuery, updateObj);

export default {
    findUsers,
    findUser,
    addUser,
    updateUser
};