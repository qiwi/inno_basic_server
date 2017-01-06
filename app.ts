import * as config from 'config';

import {Pool as IPool} from 'pg-pool';
import {Pg} from './innotrio/db/pg';
/**
 * NOTE: Декларация pg-pool и его имплементация немного различаются (видимо баг), поэтому подключим через require.
 */
const Pool = require('pg-pool');
const pool: IPool = new Pool(config.get('db'));
global.pg = new Pg(pool);


import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import {router} from './app/routes';
import {errorMiddleware} from './innotrio/koa/error_middleware';

const app = new Koa();
const appPort = config.get('port');

app.use(bodyParser());
app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());


app.on('error', (err, ctx) => console.log('REQUEST_ERROR', err, ctx));
process.on('uncaughtException', (err) => console.log('PROCESS_EXCEPTION', err.stack));


app.listen(appPort, () => console.log('Server listening on port ' + appPort));

//непереведенные старые части
/*
 //CORS middleware
 var allowCrossDomain = function (req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

 next();
 };

 app.use(express.compress());
 app.use(express.favicon());
 if (env === 'development') {
 app.use(express.logger('dev'));
 }
 app.use(allowCrossDomain);
 app.disable('etag');

 router(app, {
 root: configs.url,
 controllersPath: 'application/controllers',
 authMiddleware: require('./application/middlewares/authentication')
 }).route();


 // Задачи cron
 var cronTasks = new (require('./cron_tasks'))();
 if (env != 'development') {
 cronTasks.init();
 }

 //Бот
 var TelegramBot = require('node-telegram-bot-api'),
 BotRouter = require('./application/bot/bot_router').BotRouter;

 var botApi = new TelegramBot(configs.botToken, {polling: true});

 var bot = new BotRouter(configs, botApi);
 bot.init();

 GLOBAL.bot = bot;*/