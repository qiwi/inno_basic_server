import * as bcrypt from "bcrypt";
import { InnoError } from "innots";
import { IUser, UsersModel } from "../models/users";

const usersModel = new UsersModel();

export class AuthService {
    public async authUser(email: string, password: string): Promise<boolean> {
        const user = await usersModel.getUserForAuth(email);
        return await bcrypt.compare(password, user.userPassword);
    }

    public async addUser(email: string, name: string, password: string): Promise<IUser> {

        const existingUser = await usersModel.getItemByEmail(email);
        if (existingUser) {
            throw new InnoError('USER_EXISTS');
        }

        password = await bcrypt.hash(password, 12);
        return await usersModel.addItem(email, name, password);
    }
}