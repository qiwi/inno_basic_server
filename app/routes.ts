import * as Router from 'koa-router';
import * as config from 'config';
import {Users as UsersController} from './controllers/users';

const router = new Router();
const users = new UsersController();

// TODO routes refactoring
router
    /**
     * @api {post} /user
     * @apiName createUser
     * @apiGroup User
     *
     * @apiDescription Добавляет нового пользователя
     *
     * @apiParam {String} email Почта пользователя.
     * @apiParam {String} name Имя пользователя.
     * @apiParam {String} password Пароль пользователя.
     *
     * @apiSuccess {Object} result Созданный пользователь.
     */
    .post(config.get('url') + 'user', users.addItem)
    /**
     * @api {get} /users
     * @apiName getUsers
     * @apiGroup User
     *
     * @apiDescription Возвращает список созданных юзеров
     *
     * @apiSuccess {Array} result Массив созданных пользователей.
     */
    .get(config.get('url') + 'users', users.getItems)
    /**
     * @api {get} /user
     * @apiName getUser
     * @apiGroup User
     *
     * @apiDescription Возвращает список созданных юзеров
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result пользователь.
     */
    .get(config.get('url') + 'user', users.getItem)
    /**
     * @api {patch} /user
     * @apiName patchUser
     * @apiGroup User
     *
     * @apiDescription Обновление пользователя
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result обновленный пользователь.
     */
    .patch(config.get('url') + 'user', users.updateItem)
    /**
     * @api {delete} /user
     * @apiName deleteUser
     * @apiGroup User
     *
     * @apiDescription Удаление пользователя
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Boolean} result результат удаления.
     */
    .delete(config.get('url') + 'user', users.deleteItem);

export {router};