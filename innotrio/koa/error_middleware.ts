/**
 * Created by g.konnov on 01.01.2017.
 */

let ResultError = require('../error');

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        let error;
        if (!ResultError.isError(err)){
            error = new ResultError('INTERNAL',500,err);
        }else{
            error = err;
        }

        ResultError.logError(error.code,error.status,error.logObject);

        ctx.status = error.status;
        ctx.body = {
            status:'error',
            code: error.code
        };
    }
}