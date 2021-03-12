const Router = require('koa-router')
const services = require('../services.json')
var router = new Router()

router.get('/about.json', async(ctx, next) => {
    let ip = ctx.request.ip;
    let time = Math.floor(Date.now() / 1000);
    ctx.body = {
        customer: {
            host: ip
        },
        server: {
            current_time: time,
            services: services.services
        }
    }
})

module.exports = router