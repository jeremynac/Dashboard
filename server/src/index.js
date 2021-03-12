const koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')
const app = new koa()
const WidgRoutes = require('./routes/widget_routes')
const LogRoutes = require('./routes/login_routes')
const AboutRoutes = require('./routes/about_route')

app.use(bodyParser());

app.keys = ['newest secret key', 'older secret key'];

app.use(session(app))

app.use(passport.initialize());

app.use(passport.session());

require("./auth")

app.use(AboutRoutes.routes())

app.use(LogRoutes.routes())

app.use(async(ctx, next) => {
    console.log("connect")
    if (ctx.isAuthenticated()) {
        console.log("connected")
        await next();
    } else {
        ctx.body = { error: "not connected" }
    }
})

app.use(WidgRoutes.routes())

app.use((ctx, next) => {
    console.log("go")
    try {
        console.log("no errors")
    } catch (e) {
        ctx.status = e.status;
        ctx.body = e.message
        console.log("error", e.status, e.message)
    }
})
app.listen(process.env.SERVER_PORT)