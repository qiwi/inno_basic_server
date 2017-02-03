import * as Router from 'koa-router';
import * as config from 'config';
import {Auth as AuthController} from '../controllers/auth';

const router = new Router();
const auth = new AuthController();

/**
 * @api {post} /public/auth/login
 * @apiName auth
 * @apiGroup Public
 *
 * @apiDescription Попытка залогиниться.
 * @apiParam {String} email Email пользователя.
 * @apiParam {String} password Пароль.
 *
 * @apiSuccess {String} result token.
 */
router
     .post(config.get('url') + 'public/auth/login', auth.login);

export {router};