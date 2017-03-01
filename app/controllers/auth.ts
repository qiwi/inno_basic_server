import {Context} from 'koa';
import {Controller, AuthError, ItemValidator} from 'innots';
import {UsersModel} from '../models/users';
import * as jsonWebToken from 'jsonwebtoken'
import * as config from 'config'

const userModel = new UsersModel();

export class Auth extends Controller {
    public login = async (ctx: Context, next: Function): Promise<void> => {
        const data = this.validate(ctx, (validator: ItemValidator) => {
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
        next();
    };
}