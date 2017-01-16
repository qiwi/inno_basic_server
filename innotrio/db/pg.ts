import {ResultError} from '../error';
import {Pool} from 'pg-pool';

export class Pg {
    pool: Pool;

    constructor(pgPool: Pool) {
        this.pool = pgPool;
    };

    async _run(query: string, params?: Array<string | number>): Promise<any> | never {
        try {
            return await this.pool.query(query, params);
        } catch (err) {
            throw new ResultError('DB_QUERY', 500, query);
        }
    }

    /**
     * Просто выполняем запрос
     */
    async run(query: string, params?: Array<string | number>): Promise<boolean> {
        await this._run(query, params);
        return true;
    }

    /**
     * Возвращаем массив объектов
     */
    async getRows(query: string, params?: Array<string | number>): Promise<Array<{}>> {
        let items = await this._run(query, params);
        return items.rows;
    }

    /**
     * Возвращаем объект
     */
    async getRow(query: string, params?: Array<string | number>): Promise<{}> {
        const items = await this._run(query, params);
        const rows = items.rows || [];
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
    async mustGetRow(errorCode: number, query: string, params?: Array<string | number>): Promise<{}> | never {
        const row = await this.getRow(query, params);
        if (row === false) {
            throw new ResultError('DB_NO_SUCH_', errorCode);
        }
        return row;
    }
}
