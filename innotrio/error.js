//@flow
/**
 * Created by g.konnov on 04.01.2017.
 */
module.exports = class ResultError {
    code: string;
    status: number;
    //скрытый объект, который отобразится в логах
    logObject:any;

    constructor(code: string, httpStatus: string|void, internalLogObject:any|void) {
        this.code = 'ERROR_'+code;
        this.status = httpStatus || 400;
        this.logObject = internalLogObject || {};
    }

    /**
     * Проверяем является ли объект ошибкой
     */
    static isError(value: any) {
        value = value || {};
        let code = value.code || '';
        let status = value.status || '';

        if (code.length > 0 && status.toString().length > 0) {
            return true;
        }
        return false;
    }

    static logError(code: string, message: string, logObject: any) {
        var objectText = '';
        if (logObject !== undefined) {
            objectText = JSON.stringify(logObject);
        }

        console.log((new Date()).toISOString() + "Error \n" + code + ": " + message + "\ndata: " + objectText);
    }
};