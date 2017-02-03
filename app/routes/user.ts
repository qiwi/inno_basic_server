import * as Router from 'koa-router';
import * as config from 'config';
import {Users as UsersController} from '../controllers/users';
import {Auth as AuthController} from '../controllers/auth';

const router = new Router();
const users = new UsersController();
const auth = new AuthController();

const userBaseRoute = config.get('url') + 'users/';

router
    /**
     * @api {post} /users/add
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
    .post(userBaseRoute + 'add', users.addItem)
    /**
     * @api {get} /users/items
     * @apiName getUsers
     * @apiGroup User
     *
     * @apiDescription Возвращает список созданных юзеров
     *
     * @apiSuccess {Array} result Массив созданных пользователей.
     */
    .get(userBaseRoute + 'items', users.getItems)
    /**
     * @api {get} /users/item
     * @apiName getUser
     * @apiGroup User
     *
     * @apiDescription Возвращает список созданных юзеров
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result пользователь.
     */
    .get(userBaseRoute + 'item', users.getItem)
    /**
     * @api {post} /users/update
     * @apiName updateUser
     * @apiGroup User
     *
     * @apiDescription Обновление пользователя
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result обновленный пользователь.
     */
    .post(userBaseRoute + 'update', users.updateItem)
    /**
     * @api {post} /users/remove
     * @apiName deleteUser
     * @apiGroup User
     *
     * @apiDescription Удаление пользователя
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Boolean} result результат удаления.
     */
    .post(userBaseRoute + 'remove', users.deleteItem);

export {router};