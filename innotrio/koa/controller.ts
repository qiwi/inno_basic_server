import {Context} from 'koa';
import {ItemValidator} from '../validation/item_validator';

export class Controller {
    validateQuery(ctx: Context, cb: (ItemValidator) => any): any {
        return cb(this._validate(ctx.request.query));
    };

    validateBody(ctx: Context, cb: (ItemValidator) => any): any {
        return cb(this._validate(ctx.request.body));
    };

    _validate(item): ItemValidator {
        return new ItemValidator(item);
    };
}