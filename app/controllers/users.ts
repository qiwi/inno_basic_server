import { Controller, InnoError, ItemValidator, Validator } from 'innots';
import { Context } from 'koa';
import { UsersModel } from '../models/users';

const usersModel = new UsersModel();

export class Users extends Controller {
    public addItem = async (ctx: Context): Promise<void> => {
        const data = this.validate(ctx, (validator: ItemValidator) => {
            return {
                email: validator.isEmail('email'),
                name: validator.escape('name'),
                password: validator.isString('password')
            };
        });

        const oldUser = await usersModel.getItemByEmail(data.email);
        if (oldUser) {
            throw new InnoError('USER_EXISTS');
        }
        ctx.body = await usersModel.addItem(data.email, data.name, data.password);
    }

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await usersModel.getItems();
    }

    public getItem = async (ctx: Context): Promise<void> => {
        const idUser: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = await usersModel.getItem(idUser);
    }

    public updateItem = async (ctx: Context): Promise<void> => {
        const data = this.validate(ctx, (validator) => {
            return {
                idUser: validator.isInt('id'),
                name: validator.escape('name')
            };
        });

        ctx.body = {result: await usersModel.updateItem(data.idUser, data.name)};
    }

    public deleteItem = async (ctx: Context): Promise<void> => {
        const idUser: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = {result: await usersModel.deleteItem(idUser)};
    }
}