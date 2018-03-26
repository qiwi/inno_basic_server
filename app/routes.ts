import * as config from 'config';
import * as Router from 'koa-router';
import { AuthController } from "./controllers/auth";
import { Users as UsersController } from './controllers/users';

const router = new Router();
const users = new UsersController();
const auth = new AuthController();

const usersPublicRoute = config.get('appConfig.apiPrefix') + 'users/';
const usersProtectedRoute = config.get('appConfig.apiPrefix') + 'users/';
const authRoute = config.get('appConfig.publicApiPrefix') + 'auth/';

router

/**
 * @api {post} /public/auth/login
 * @apiName login
 * @apiGroup Auth
 *
 * @apiDescription Авторизует пользователя. В ответ на запрос отдаст JWT-Токен.
 * Его необходимо указывать в заголовке Authorization.
 *
 * @apiParam {String} email Почта пользователя.
 * @apiParam {String} password Пароль пользователя.
 *
 * @apiSuccess {String} result jwtToken
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cHWL6MGW4LeYvnm1JA"
 *     }
 */
    .post(authRoute + 'login', auth.login)
    /**
     * @api {post} /public/users/add
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
    .post(usersPublicRoute + 'add', users.addItem)
    /**
     * @api {get} /public/users/items
     * @apiName getUsers
     * @apiGroup User
     *
     * @apiDescription Возвращает список созданных юзеров
     *
     * @apiSuccess {Array} result Массив созданных пользователей.
     */
    .get(usersPublicRoute + 'items', users.getItems)
    /**
     * @api {get} /public/users/item
     * @apiName getUser
     * @apiGroup User
     *
     * @apiDescription Возвращает список созданных юзеров
     * @apiParam {Number} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result пользователь.
     */
    .get(usersPublicRoute + 'item', users.getItem)
    /**
     * @api {post} /users/update
     * @apiName updateUser
     * @apiGroup User
     *
     * @apiDescription Обновление пользователя
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {String} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result обновленный пользователь.
     */
    .post(usersProtectedRoute + 'update', users.updateItem)
    /**
     * @api {post} /users/remove
     * @apiName deleteUser
     * @apiGroup User
     *
     * @apiDescription Удаление пользователя
     * @apiParam {Number} id Идентификатор пользователя.
     *
     * @apiSuccess {Boolean} result результат удаления.
     */
    .post(usersProtectedRoute + 'remove', users.deleteItem);

export { router };