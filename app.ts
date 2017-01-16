import * as config from 'config';

/**
 * NOTE: Декларация pg-pool и его имплементация немного различаются (видимо баг), поэтому подключим через require.
 */
import {router} from './app/routes';
import {App} from "inno_ts";

const app = new App(config, router);