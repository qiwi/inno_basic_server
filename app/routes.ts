import * as Router from 'koa-router';
import * as config from 'config';
import {Users as UsersController} from './controllers/users';

const router = new Router();
const users = new UsersController();

/** Функция сохранения контекста для класса контроллера. Иначе в контроллере контект будет от koa */
const context = (classItem, classMethod) => {
    return async(ctx, next) => await classMethod.call(classItem, ctx, next);
};

router
    .post(config.get('url') + 'user', context(users, users.addItem))
    .get(config.get('url') + 'users', context(users, users.getItems))
    .get(config.get('url') + 'user', context(users, users.getItem))
    .patch(config.get('url') + 'user', context(users, users.updateItem))
    .delete(config.get('url') + 'user', context(users, users.deleteItem));

export {router};