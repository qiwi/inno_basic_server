import {Context} from 'koa';
import {Controller} from 'innots';
import {UsersModel} from '../models/users';
import {Validator} from 'innots'; // Валидатор, который подключаем только если используется напрямую.
import {IValidator} from "innots";
import {InnoError} from "innots";

const userModel = new UsersModel();

export class Users extends Controller {
    public addItem = async (ctx: Context, next: Function): Promise<void> => {
        // Если получается несколько полей, то лучше использовать validateBody или validateQuery,
        // так не потребуется много раз прописывать ctx.request.query.
        // Также в ошибке валидации вернется поле, которое не прошло валидацию.
        const data = this.validateBody(ctx, (validator: IValidator) => {
            return {
                email: validator.isEmail('email'),
                name: validator.escape('name'),
                password: validator.isString('password')
            };
        });

        const oldUser = await userModel.getItemByEmail(data.email);
        if (oldUser) {
            throw new InnoError('USER_EXISTS', 400);
        }

        ctx.body = await userModel.addItem(data.email, data.name, data.password);
        next();
    };

    public getItems = async (ctx: Context, next: Function): Promise<void> => {
        ctx.body = await userModel.getItems();
        next();
    };

    public getItem = async (ctx: Context, next: Function): Promise<void> => {
        // Пример работы с валидатором напрямую
        const id = Validator.isInt(ctx.request.query.id);

        ctx.body = await userModel.getItem(id);
        next();
    };

    public updateItem = async (ctx: Context, next: Function): Promise<void> => {
        const data = this.validateBody(ctx, (validator) => {
            return {
                id: validator.isInt('id'),
                name: validator.escape('name')
            };
        });

        ctx.body = await userModel.updateItem(data.id, data.name);
        next();
    };

    public deleteItem = async (ctx: Context, next: Function): Promise<void> => {
        const id = Validator.isInt(ctx.request.body.id);

        ctx.body = await userModel.deleteItem(id);
        next();
    }
}