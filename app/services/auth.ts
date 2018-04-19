import * as crypto from "crypto";
import { InnoError } from "innots";
import { IUser, UsersModel } from "../models/users";

const usersModel = new UsersModel();

export class AuthService {
    public async authUser(email: string, password: string): Promise<boolean> {
        const user = await usersModel.getUserForAuth(email);
        if (!user) {
            return false;
        }
        return this.getSha256(password) === user.userPassword;
    }

    public async addUser(email: string, name: string, password: string): Promise<IUser> {

        const existingUser = await usersModel.getItemByEmail(email);
        if (existingUser) {
            throw new InnoError('USER_EXISTS');
        }

        return await usersModel.addItem(email, name, this.getSha256(password));
    }

    protected getSha256(value: string): string {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
}