//@flow
const PgModel = require('../../innotrio/db/pg_model');
const Hash = require('../../innotrio/hash');

module.exports = class UsersModel extends PgModel {
    async addItem(email:string, name: string, password: string) {
        let passHash: string = Hash.getSha256(password);
        return await this.pg.getRow('INSERT INTO koa.obj_user (user_email, user_name, user_password) VALUES ($1, $2, $3) RETURNING id_user', [email, name, passHash]);
    }

    async getItems() {
        return await this.pg.getRows('SELECT id_user, user_email, user_name FROM koa.obj_user');
    }

    async getItem(idUser: number) {
        return await this.pg.getRow('SELECT id_user, user_email, user_name FROM koa.obj_user WHERE id_user = $1', [idUser]);
    }

    async updateItem(idUser: number, name: string) {
        return await this.pg.run('UPDATE koa.obj_user SET user_name = $2 WHERE id_user = $1', [idUser, name]);
    }

    async deleteItem(idUser: number) {
        return await this.pg.run('DELETE FROM koa.obj_user WHERE id_user = $1', [idUser]);
    }
};
