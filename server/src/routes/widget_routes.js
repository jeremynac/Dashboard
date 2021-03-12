const Router = require('koa-router')
const wid = require('../widgets')
const db_funcs = require('../db/db_functions')
var router = new Router()

router.get('/getwidgets', async(ctx, next) => {
    console.log("getwidgets")
    await wid.getAllWidgets(ctx.req.user)
        .then(res => {
            console.log("get widgets", res)
            ctx.body = res
        })
        .catch(e => {
            ctx.throw('400', 'error getting widgets', e)
        })
    await next()
})

router.post('/addwidget', async(ctx, next) => {
    await wid.addWidget(ctx.request, ctx.req.user)
        .then(res => {
            console.log("ok", res)
            ctx.body = res
        })
        .catch(e => {
            ctx.throw('400', e + 'error adding widgets')
        })
    console.log("added widget", ctx.body)
    await next()
})
router.get('/updatewidget', async(ctx, next) => {
    await wid.getWidget(ctx.request.query, ctx.req.user)
        .then(res => {
            if (res) {
                ctx.body = res
            } else {
                ctx.throw(400, 'error updating widgets')
            }
        })
        .catch(e => {
            ctx.throw(400, 'error updating widgets' + e)
        })
    console.log("updated widget")
})

router.post('/deletewidget', async(ctx, next) => {
    console.log("delete", ctx.request, ctx.req)
    await wid.deleteWidget(ctx.request, ctx.req.user)
        .then(res => {
            ctx.body = res
            console.log("deleted")
        })
        .catch(e => {
            ctx.throw('400', 'error deleting widget', e)
        })
})

router.post('/gmail_token', async(ctx, next) => {
    console.log("try token", ctx.request.body.token)
    await db_funcs.addGmailToken(ctx.req.user.user_id, ctx.request.body.token)
        .then(res => {
            ctx.body = { sent_token: "ok" }
        })
        .catch(e => {
            ctx.throw('400', 'error adding gmail token' + e)
        })
})

module.exports = router