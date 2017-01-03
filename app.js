const config = require('./config');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./app/routes');

const Pool = require('pg-pool');
global.pg = new Pool(config.db);

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => console.log('REQUEST_ERROR', err, ctx));
process.on('uncaughtException', (err) => console.log('PROCESS_EXCEPTION', err.stack));


app.listen(config.port, () => console.log('Server listening on port ' + config.port));


/*GLOBAL.configs = configs;

 var express = require('express'),
 http = require('http'),
 path = require('path'),
 async = require('async'),
 router = require('./innotrio_nodejs/express/router').router,
 modelsLoader = require('./innotrio_nodejs/db').modelsLoader,
 pg = require('./innotrio_nodejs/db').pg,
 errors = require('./application/errors'),
 logger = require('./innotrio_nodejs/logger/index').logger;

 GLOBAL.waterfall = async.waterfall;
 GLOBAL.async = async;
 GLOBAL.series = async.series;
 GLOBAL.each = async.each;
 GLOBAL.parallel = async.parallel;
 GLOBAL.map = async.map;
 GLOBAL.logger = logger;
 GLOBAL['ERRORS'] = errors;

 var dbObject = pg(configs.db);

 dbObject.client.on('error', (error) => {
 console.log(`[ERROR] Data base error - ${error}`);
 process.exit(1);
 });

 GLOBAL.services = {
 db: dbObject.connect()
 };

 GLOBAL.controller = require('./innotrio_nodejs/express/controller').controller;
 GLOBAL.model = require('./innotrio_nodejs/db').modelFactory(services.db);

 GLOBAL.models = modelsLoader({
 modelsPath: 'application/models'
 }).load();

 process.on('uncaughtException', function (err) {
 console.log(err.stack);
 console.log(err);
 });

 //CORS middleware
 var allowCrossDomain = function (req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

 next();
 };

 var app = express();

 // all environments
 app.set('port', process.env.PORT || configs.port);

 app.use(express.cookieParser(configs.cookies.secret));
 app.use(express.cookieSession());
 app.use(express.compress());
 app.use(express.favicon());
 if (env === 'development') {
 app.use(express.logger('dev'));
 }
 app.use(express.json());
 app.use(express.urlencoded());
 app.use(express.methodOverride());
 app.use(allowCrossDomain);
 app.use(express.errorHandler());
 app.disable('etag');

 router(app, {
 root: configs.url,
 controllersPath: 'application/controllers',
 authMiddleware: require('./application/middlewares/authentication')
 }).route();

 http.createServer(app).listen(app.get('port'), function () {
 console.log('Express server listening on port ' + app.get('port'));
 });

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