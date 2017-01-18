import {Context} from 'koa';
import {Controller} from 'innots';
import {UsersModel} from '../models/users';
import {Validator} from 'innots'; // Валидатор, который подключаем только если используется напрямую.
import {IValidator} from "innots";
import {ResultError} from "innots";

const userModel = new UsersModel();

export class Users extends Controller {
    public addItem = async (ctx: Context): Promise<void> => {
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
            throw new ResultError('USER_EXISTS');
        }
        // TODO this.success in controller?
        ctx.body = {result: await userModel.addItem(data.email, data.name, data.password)}
    }

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = {result: await userModel.getItems()}
    }

    public getItem = async (ctx: Context): Promise<void> => {
        // Пример работы с валидатором напрямую
        const id = Validator.isInt(ctx.request.query.id);

        ctx.body = {result: await userModel.getItem(id)}
    }

    // TODO закрыть авторизационным middleware
    public updateItem = async (ctx: Context): Promise<void> => {
        const data = this.validateBody(ctx, (validator) => {
            return {
                id: validator.isInt('id'),
                name: validator.escape('name')
            };
        });

        ctx.body = {result: await userModel.updateItem(data.id, data.name)}
    }

    // TODO закрыть авторизационным middleware
    public deleteItem = async (ctx: Context): Promise<void> => {
        const id = Validator.isInt(ctx.request.body.id);

        ctx.body = {result: await userModel.deleteItem(id)}
    }
}