/**
 * Created by g.konnov on 24.12.2016.
 */
const userModel = new (require('../models/users'));

class Users {
    async getItems(ctx, next) {
        ctx.body = await userModel.getItems();
    }

    /** getItem (request, response) {
    const idUser = request.param('id');
  console.log(idUser);
    let user = yield UsersModel.getItem(idUser);
    response.send(user);
  }*/
}

module.exports = Users;
