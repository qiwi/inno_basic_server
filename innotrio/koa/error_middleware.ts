import {ResultError} from '../error';
import {Context} from 'koa';

export async function errorMiddleware(ctx: Context, next: Function): Promise<any> | never {
    try {
        await next();
    } catch (err) {
        const error = ResultError.isError(err) ? err : new ResultError('INTERNAL', 500, err);
        console.log(err);

        ResultError.logError(error.code, error.status, error.logObject);
        ctx.status = parseInt(error.status);
        ctx.body = {
            status: error.status,
            code: error.code,
            data: error.logObject
        };
    }
}