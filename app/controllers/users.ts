import {Context} from 'koa';
import {Controller} from '../../innotrio/koa/controller';
import {UsersModel} from '../models/users';
import {Validator} from '../../innotrio/validation/validator'; // Валидатор, который подключаем только если используется напрямую.
import {IValidator} from "../../innotrio/validation/interfaces";
import {ResultError} from "../../innotrio/error";

const userModel = new UsersModel(global.pg);

/**
 * Контроллер, куда приходят все запросы, описанные в routes
 */
export class Users extends Controller {
    async addItem(ctx:Context): Promise<void> {
        //Если получается несколько полей, то лучше использовать validateBody или validateQuery,
        //так не потребуется много раз прописывать ctx.request.query.
        //Также в ошибке валидации вернется поле, которое не прошло валидацию.
        const data = this.validateBody(ctx, (validator: IValidator) => {
            return {
                email: validator.isEmail('email'),
                name: validator.escape('name'),
                password: validator.isString('password')
            };
        });

        const oldUser = await userModel.getItemByEmail(data.email);
        if (oldUser)
            throw new ResultError('USER_EXISTS');

        ctx.body = await userModel.addItem(data.email, data.name, data.password);
    }

    async getItems(ctx: Context): Promise<void> {
        ctx.body = await userModel.getItems();
    }

    async getItem(ctx: Context): Promise<void> {
        // Пример работы с валидатором напрямую
        const id = Validator.isInt(ctx.request.query.id);

        ctx.body = await userModel.getItem(id);
    }

    // TODO закрыть авторизационным middleware
    async updateItem(ctx: Context): Promise<void> {
        const data = this.validateBody(ctx, (validator) => {
            return {
                id: validator.isInt('id'),
                name: validator.escape('name')
            };
        });

        ctx.body = await userModel.updateItem(data.id, data.name);
    }

    //TODO закрыть авторизационным middleware
    async deleteItem(ctx: Context): Promise<void> {
        const id = Validator.isInt(ctx.request.body.id);

        ctx.body = await userModel.deleteItem(id);
    }
}

