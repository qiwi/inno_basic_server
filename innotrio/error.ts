export const ERROR_PREFIX = 'ERROR_';

export class ResultError {
    code: string;
    status: number;
    logObject: any;

    constructor(code: string, httpStatus?: number, internalLogObject?: any) {
        this.code = ERROR_PREFIX + code;
        this.status = httpStatus || 400;
        this.logObject = internalLogObject || {};
    }

    static isError(value: any): boolean {
        return value instanceof ResultError;
    }

    static logError(code: string, message: string, logObject: any) {
        console.error(
            (new Date()).toISOString() + " Error \n" + code + ": " + message + "\ndata: " + JSON.stringify(logObject || {})
        );
    }
};