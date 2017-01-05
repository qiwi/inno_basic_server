//@flow
const ResultError = require('../error');

/**
 * Created by g.konnov on 03.01.2017.
 */
module.exports = class Pg {
    pool: *;

    constructor(pgPool: *) {
        this.pool = pgPool;
    }

    async _run(query: string, params: Array<string>|void) {
        try {
            return await this.pool.query(query, params);
        } catch (err) {
            throw new ResultError('DB_QUERY', 500, query);
        }
    }

    /**
     * Просто выполняем запрос
     */
    async run(query: string, params: Array<string>|void) {
        await this._run(query, params);
        return true;
    }

    /**
     * Возвращаем массив объектов
     */
    async getRows(query: string, params: Array<string>|void) {
        let items = await this._run(query, params);
        return items.rows;
    }

    /**
     * Возвращаем объект
     */
    async getRow(query: string, params: Array<string>|void) {
        let items = await this._run(query, params);
        let rows = items.rows || [];
        if (rows.length == 0) {
            return false;
        }

        if (rows.length > 1) {
            console.log('WARNING_DB_GET_ROW. Expected 1 row. Got %j %s', rows.length, query);
        }

        return rows[0];
    }

    /**
     * Обязательно должны вернуть объект
     * @param errorCode Код ошибки, если объект не получен. К примеру, USER
     * @param query
     * @param params
     */
    async mustGetRow(errorCode: string, query: string, params: Array<string>|void) {
        let row = this.getRow(query, params);
        if (row == false) {
            throw new ResultError('DB_NO_SUCH_'.errorCode);
        }
        return row;
    }


    /*
     func (self *Model)logError(err error, message string) (safeerror.ISafeError) {
     if (err != nil) {
     if len(message) > LOG_MESSAGE_LENGTH {
     message = message[:LOG_MESSAGE_LENGTH]
     }
     fmt.Println("DB_ERROR", err, message)
     return safeerror.New(err, "DB_ERROR")
     }
     return nil
     }

     */
};
