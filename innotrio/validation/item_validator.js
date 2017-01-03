/**
 * Created by g.konnov on 31.12.2016.
 */

const Validator = require('./validator');

/**
 * Валидатор, облегчающий массовую валидацию полей в контроллере
 */
module.exports = class ItemValidator {
    constructor(item) {
        this.item = item;
    }

    isInt(field) {
        return Validator.isInt(this.item[field]);
    }

    escape(field) {
        return Validator.escape(this.item[field]);
    }
};