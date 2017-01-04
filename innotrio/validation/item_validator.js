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

    /**
     * Проверяет, что значение - целое число. undefined не принимает.
     */
    isInt(field) {
        return Validator.isInt(this.item[field]);
    }

    /**
     * Эскейпит строку. Не проверяет наличие.
     */
    escape(field) {
        return Validator.escape(this.item[field]);
    }

    /**
     * Проверяет, что значение - строка, эскейпит, тримит. undefined вызовет ошибку.
     */
    isString(field) {
        return Validator.isString(this.item[field]);
    }

    /**
     * Проверяет, что передан email + lowercase+trim+escape
     */
    isEmail(field) {
        return Validator.isEmail(this.item[field]);
    }

};