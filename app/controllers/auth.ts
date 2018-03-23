import { Controller, InnoError } from "innots";
import { Context } from "koa";
import * as jsonWebToken from 'jsonwebtoken';
import * as config from 'config';
import { UsersModel } from "../models/users";

const usersModel = new UsersModel();
const jwtSecret = config.get<string>('appConfig.jwt.secret');

export class AuthController extends Controller {
    login = async (ctx: Context, next: () => void): Promise<void> => {
        const data = this.validate(ctx, (validator) => {
            return {
                email: validator.isString('email'),
                password: validator.isString('password')
            };
        });

        const authResult = await usersModel.authUser(data.email, data.password);

        if (!authResult) {
            throw new InnoError('LOGIN_FAILED', 400, {});
        }

        ctx.body = jsonWebToken.sign(data.email, jwtSecret);
        next();
    }
}