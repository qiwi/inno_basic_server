import {Context} from 'koa';
import {Controller, AuthError} from 'innots';
import {UsersModel} from '../models/users';
import {Validator} from 'innots'; // Валидатор, который подключаем только если используется напрямую.
import {IValidator} from "innots";
import {InnoError} from "innots";
import * as jsonWebToken from 'jsonwebtoken'
import * as config from 'config'

const userModel = new UsersModel();

export class Auth extends Controller {
    public login = async (ctx: Context): Promise<void> => {
        const data = this.validateBody(ctx, (validator: IValidator) => {
            return {
                email: validator.isEmail('email'),
                password: validator.isString('password')
            };
        });

        const authResult = await userModel.checkUser(data.email, data.password);

        if (!authResult) {
            throw new AuthError(AuthError.AUTH_REJECTED);
        }


        ctx.body = jsonWebToken.sign({user: data.email}, config.get<string>('jwt.secret'));
    };
}