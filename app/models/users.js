/**
 * Created by g.konnov on 25.12.2016.
 */

module.exports = class Users {
    async getItems() {
        let items = await pg.query('SELECT id_user, user_name FROM obj_user');
        return items.rows;
    }

    async getItem(idUser) {
        let items = await pg.query('SELECT id_user, user_name FROM obj_user WHERE id_user = $1',[idUser]);
        return items.rows;
    }

    async updateItem(idUser, name) {
        let items = await pg.query('UPDATE obj_user SET user_name = $2 WHERE id_user = $1 RETURNING id_user, user_name',[idUser,name]);
        return items.rows;
    }
};
