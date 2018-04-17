import * as config from "config";
import { Controller, IAppJwtConfig, InnoError, ItemValidator } from "innots";
import { JwtService } from "innots/build/lib/koa/services/jwt_service";
import { Context } from "koa";
import { AuthService } from "../services/auth";

const authService: AuthService = new AuthService();

export class AuthController extends Controller {
    protected jwtService: JwtService = new JwtService(config.get('appConfig.jwt') as IAppJwtConfig);

    public login = async (ctx: Context, next: () => void): Promise<void> => {
        const data = this.validate(ctx, (validator) => {
            return {
                email: validator.isString('email'),
                password: validator.isString('password')
            };
        });

        if (!(await authService.authUser(data.email, data.password))) {
            throw new InnoError('LOGIN_FAILED', 400, {});
        }

        ctx.body = this.jwtService.getToken(data.email);

        next();
    }

    public register = async (ctx: Context): Promise<void> => {
        const data = this.validate(ctx, (validator: ItemValidator) => {
            return {
                email: validator.isEmail('email'),
                name: validator.escape('name'),
                password: validator.isString('password')
            };
        });

        ctx.body = await authService.addUser(data.email, data.name, data.password);
    }

}