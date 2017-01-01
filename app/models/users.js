/**
 * Created by g.konnov on 25.12.2016.
 */

class Users {
    async getItems() {
        let items = await pg.query('SELECT id_user, user_name FROM obj_user');
        return items.rows;//[{name:'a',id:2}];
    }

    /** getItem (idUser) {
    return yield Database.select('*').from('obj_user').where('id_user', idUser)
  }*/
}

module.exports = Users;
