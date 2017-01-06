import {PgModel} from '../../innotrio/db/pg_model';
import {Hash} from '../../innotrio/hash';

export class UsersModel extends PgModel {
    async addItem(email: string, name: string, password: string): Promise<{}> {
        let passHash: string = Hash.getSha256(password);
        return await this.pg.getRow('INSERT INTO koa.obj_user (user_email, user_name, user_password) VALUES ($1, $2, $3) RETURNING id_user', [email, name, passHash]);
    }

    async getItems(): Promise<Array<{}>> {
        return await this.pg.getRows('SELECT id_user, user_email, user_name FROM koa.obj_user');
    }

    async getItem(idUser: number): Promise<{}> {
        return await this.pg.getRow('SELECT id_user, user_email, user_name FROM koa.obj_user WHERE id_user = $1', [idUser]);
    }

    async updateItem(idUser: number, name: string): Promise<boolean> {
        return await this.pg.run('UPDATE koa.obj_user SET user_name = $2 WHERE id_user = $1', [idUser, name]);
    }

    async deleteItem(idUser: number): Promise<boolean> {
        return await this.pg.run('DELETE FROM koa.obj_user WHERE id_user = $1', [idUser]);
    }
};
