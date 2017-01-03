//@flow
/**
 * Created by g.konnov on 24.12.2016.
 */
const Controller = require('../../innotrio/koa/controller');
//Модель по работе с данными пользователей
const userModel:UsersModel = new (require('../models/users'));

//Валидатор, который подключаем только если используется напрямую.
const Validator = require('../../innotrio/validation/validator');

/**
 * Контроллер, куда приходят все запросы, описанные в routes
 */
module.exports = class UsersCtrl extends Controller {
    async getItems(ctx, next) {
        ctx.body = await userModel.getItems();
    }

    async getItem(ctx, next) {
        //Пример работы с валидатором напрямую
        let id = Validator.isInt(ctx.request.query.id);

        ctx.body = await userModel.getItem(id);
    }

    async updateItem(ctx, next) {
        //Если получается несколько полей, то лучше использовать validateBody или validateQuery,
        //так не потребуется много раз прописывать ctx.request.query.
        //Также в ошибке валидации вернется поле, которое не прошло валидацию.
        let data = this.validateBody(ctx, (validator:ItemValidator) => {
            return {
                id: validator.isInt('id'),
                name: validator.escape('name')
            };
        });

        ctx.body = await userModel.updateItem(data.id,data.name);
    }
}

