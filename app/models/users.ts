import { pgService } from "../../app";

export interface IUser {
    idUser: number;
    email: string;
    name: string;
}

export interface IUserAuth {
    userEmail: string;
    userPassword: string;
}

export class UsersModel {
    public async addItem(email: string, name: string, password: string): Promise<IUser> {
        return await pgService.getRow(
            `INSERT INTO obj_user (user_email, user_name, user_password)
            VALUES ($1, $2, $3) RETURNING id_user, user_email, user_name`,
            [email, name, password]);
    }

    public async getItems(): Promise<Array<IUser>> {
        return await pgService.getRows(`SELECT id_user, user_email, user_name FROM obj_user`);
    }

    public async getItem(idUser: number): Promise<IUser> {
        return await pgService.getRow(`
        SELECT id_user, user_email, user_name FROM obj_user
            WHERE id_user = $1`,
            [idUser]);
    }

    public async getItemByEmail(email: string): Promise<IUser> {
        return await pgService.getRow(
            `SELECT id_user, user_email, user_name FROM obj_user
            WHERE user_email = $1`,
            [email]);
    }

    public async updateItem(idUser: number, name: string): Promise<IUser> {
        await pgService.run(`UPDATE obj_user SET user_name = $2 WHERE id_user = $1`, [idUser, name]);
        return await this.getItem(idUser);
    }

    public async deleteItem(idUser: number): Promise<boolean> {
        await pgService.run(`DELETE FROM obj_user WHERE id_user = $1`, [idUser]);
        return true;
    }

    public async getUserForAuth(email: string): Promise<IUserAuth> {
        return await pgService.getRow(
            `
            SELECT user_email, user_password FROM obj_user
            WHERE user_email = $1
            `,
            [email]);
    }

}
