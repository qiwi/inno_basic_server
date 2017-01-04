//@flow
/**
 * Created by g.konnov on 31.12.2016.
 */

const Router = require('koa-router'),
    router = new Router(),
    config = require('../config'),
    users:UsersCtrl = new ((require('./controllers/users')))();

/** Функция сохранения контекста для класса контроллера. Иначе в контроллере контект будет от koa */
var context = (classItem, classMethod) => {
    return async(ctx, next) => await classMethod.call(classItem, ctx, next);
};

router
    .post(config.apiPath+'user', context(users, users.addItem))
    .get(config.apiPath+'users', context(users, users.getItems))
    .get(config.apiPath+'user', context(users, users.getItem))
    .patch(config.apiPath+'user', context(users, users.updateItem))
    .delete(config.apiPath+'user', context(users, users.deleteItem));

module.exports = router;