import { Controller, InnoError } from "innots";
import { JwtService } from "innots/build/lib/services/jwt";
import { Context } from "koa";
import { UsersModel } from "../models/users";

const usersModel = new UsersModel();

export class AuthController extends Controller {
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

        ctx.body = JwtService.getToken(data.email);
        next();
    }
}