import {Pg} from './pg';

export class PgModel {
    pg: Pg;

    constructor(pg: Pg) {
        this.pg = pg;
    }
};