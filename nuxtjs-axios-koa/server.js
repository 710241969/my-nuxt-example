const KOA = require('koa')
const { Nuxt, Builder } = require('nuxt')

const APP = new KOA()
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8087
// Import and Set Nuxt.js options
const NUXT_CONFIG = require('./nuxt.config.js')
// Instantiate nuxt.js
const NUXT = new Nuxt(NUXT_CONFIG)

async function start() {
    // Build in development
    if (NUXT_CONFIG.dev) {
        await new Builder(NUXT).build()
    }

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