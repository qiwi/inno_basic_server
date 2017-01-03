//@flow

module.exports = class UsersModel {
    async getItems() {
        return await pg.getRows('SELECT id_user, user_name FROM obj_user');
    }

    async getItem(idUser:number) {
        return await pg.getRow('SELECT id_user, user_name FROM obj_user WHERE id_user = $1',[idUser]);
    }

    async updateItem(idUser:number, name:string) {
        return await pg.getRow('UPDATE obj_user SET user_name = $2 WHERE id_user = $1 RETURNING id_user, user_name',[idUser,name]);
    }
};
