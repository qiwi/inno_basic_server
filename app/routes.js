//@flow
/**
 * Created by g.konnov on 31.12.2016.
 */

const Router = require('koa-router'),
    router = new Router(),
    users:UsersCtrl = new ((require('./controllers/users')))();

/** Функция сохранения контекста для класса контроллера. Иначе в контроллере контект будет от koa */
var context = (classItem, classMethod) => {
    return async(ctx, next) => await classMethod.call(classItem, ctx, next);
};

router.get('/api/users', context(users, users.getItems))
    .get('/api/user', context(users, users.getItem))
    .patch('/api/user', context(users, users.updateItem));

module.exports = router;


/*
 router
 .get('/users',        indexController.list)
 .get('/user/',    indexController.getId)
 .post('/users/',      indexController.createItem)
 .put('/users/',    indexController.updateItem)
 .delete('/users/', indexController.removeItem);
 };*/
