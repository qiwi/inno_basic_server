import {Hash} from 'inno_ts';
import {Pool as IPool} from 'pg-pool';
import {PgService} from "inno_ts";
import * as config from 'config';

/**
 * NOTE: Декларация pg-pool и его имплементация немного различаются (видимо баг), поэтому подключим через require.
 */
// TODO Пока не реализован глобальный контекст/иной вариант переиспользования пула - создаем его в рамках модели
const Pool = require('pg-pool');
const pool: IPool = new Pool(config.get('db'));
const pgService = new PgService(pool);

export class UsersModel {
    public async addItem(email: string, name: string, password: string): Promise<{}> {
        let passHash: string = Hash.getSha256(password);
        return await pgService.getRow('INSERT INTO koa.obj_user (user_email, user_name, user_password) ' +
            'VALUES ($1, $2, $3) RETURNING id_user', [email, name, passHash]);
    }

    public async getItems(): Promise<Array<{}>> {
        return await pgService.getRows('SELECT id_user, user_email, user_name FROM koa.obj_user');
    }

    public async getItem(idUser: number): Promise<{}> {
        return await pgService.getRow('SELECT id_user, user_email, user_name FROM koa.obj_user ' +
            'WHERE id_user = $1', [idUser]);
    }

    public async getItemByEmail(email: string): Promise<{}> {
        return await pgService.getRow('SELECT id_user FROM koa.obj_user WHERE user_email = $1', [email]);
    }

    public async updateItem(idUser: number, name: string): Promise<boolean> {
        return await pgService.run('UPDATE koa.obj_user SET user_name = $2 WHERE id_user = $1', [idUser, name]);
    }

    public async deleteItem(idUser: number): Promise<boolean> {
        return await pgService.run('DELETE FROM koa.obj_user WHERE id_user = $1', [idUser]);
    }
}
