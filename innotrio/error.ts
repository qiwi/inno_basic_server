export const ERROR_PREFIX = 'ERROR_';

export class ResultError {
    public static isError(value: any): boolean {
        return value instanceof ResultError;
    }

    public static logError(code: string, message: string, logObject: any): void {
        console.error((
        new Date()).toISOString() +
            " Error \n" + code + ": " +
            message + "\ndata: " +
            JSON.stringify(logObject || {}
        ));
    }

    public code: string;
    public status: number;
    public logObject: any;

    constructor(code: string, httpStatus?: number, internalLogObject?: any) {
        this.code = ERROR_PREFIX + code;
        this.status = httpStatus || 400;
        this.logObject = internalLogObject || {};
    }
}