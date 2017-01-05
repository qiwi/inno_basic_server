/**
 * Created by g.konnov on 02.01.2017.
 */

var ItemValidator = require('./../validation/item_validator');

class Controller {

    validateQuery(ctx, cb) {
        return cb(this._validate(ctx.request.query));
    };

    validateBody(ctx, cb) {
        return cb(this._validate(ctx.request.body));
    };

    _validate(item) {
        return new ItemValidator(item);
    };
}

module.exports = Controller;