//@flow
/**
 * Created by g.konnov on 04.01.2017.
 */
const Pg = require('pg');

module.exports = class PgModel {
    pg: Pg;

    constructor(pg:Pg) {
        this.pg = pg;
    }
};