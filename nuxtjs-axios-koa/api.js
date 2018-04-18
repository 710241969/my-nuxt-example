const Koa = require('koa')

const APP = new Koa()
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8088


var ROUTER = require('koa-router')();
ROUTER.get('/index', async (ctx) => {
    console.log('/index')
    ctx.body = {
        data: '/index'
    }
});
ROUTER.post('/foo', async (ctx) => {
    console.log(ctx)
    console.log('/foo')
    ctx.body = {
        data: '/foo'
    }
});
ROUTER.get('/bar', async (ctx) => {
    console.log('/bar')
    ctx.body = {
        data: '/bar'
    }
});
APP.use(ROUTER.routes())
    .use(ROUTER.allowedMethods());

APP.listen(PORT, HOST)
console.log('Server listening on ' + HOST + ':' + PORT) // eslint-disable-line no-console
