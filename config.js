process.env.NODE_ENV = 'development';
//ТОЛЬКО для разработки. УБРАТЬ в production
require('flow-remove-types/register');

module.exports = {
    port: 2211,
    url: '/api/',
    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'koa',
        user: 'postgres',
        password: '',

        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    }
};
