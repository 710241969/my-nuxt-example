const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8087
const ENV = process.env.NODE_ENV

const NUXT_CONFIG = require('./nuxt.config.js') //引入nuxt配置
NUXT_CONFIG.dev = ENV !== 'production' // 设置这dev的这一步不能少，否则页面将不会显示，可以在这里，也可以在nuxt.config.js中配置

const NUXT = new Nuxt(NUXT_CONFIG) // 创建nuxt实例
const APP = new Koa() //创建koa实例

async function start() {
    
    // 若dev为true，即不是生产环境，就构建一遍nuxt
    if (NUXT_CONFIG.dev) {
        await new Builder(NUXT).build()
    }

    // 使用nuxt的render，渲染页面中间件
    APP.use(async (ctx, next) => {
        await next()
        ctx.status = 200 // koa defaults to 404 when it sees that status is unset
        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve)
            ctx.res.on('finish', resolve)
            NUXT.render(ctx.req, ctx.res, promise => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject)
            })
        })
    })

    APP.listen(PORT, HOST)
    console.log('Server listening on ' + HOST + ':' + PORT) // eslint-disable-line no-console
}

start()