import * as config from 'config';

import {Pool as IPool} from 'pg-pool';
import {Pg} from "./innotrio/db/pg";


/**
 * NOTE: Декларация pg-pool и его имплементация немного различаются (видимо баг), поэтому подключим через require.
 */
const Pool = require('pg-pool');
const pool: IPool = new Pool(config.get('db'));
global.pg = this.pg = new Pg(pool);


/**
 * NOTE: Декларация pg-pool и его имплементация немного различаются (видимо баг), поэтому подключим через require.
 */
import {router} from './app/routes';
import {App} from "./innotrio/koa/app";

const app = new App(config,router);