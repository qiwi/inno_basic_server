import { Controller, IAppJwtConfig, InnoError } from "innots";
import { JwtService } from "innots/build/lib/koa/services/jwt_service";
import * as config from "config";
import { Context } from "koa";
import { UsersModel } from "../models/users";

const usersModel = new UsersModel();

export class AuthController extends Controller {
    protected jwtService = new JwtService(config.get('appConfig.jwt') as IAppJwtConfig);

    public login = async (ctx: Context, next: () => void): Promise<void> => {
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

        ctx.body = this.jwtService.getToken(data.email);

        next();
    }
}