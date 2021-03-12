const Router = require('koa-router')
const passport = require('koa-passport')
const fs = require('fs')
var router = new Router()

router.get('/login2', async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/login.html');
})

router.get('/signup2', async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/signup.html');
})

router.post('/login', async(ctx) => {
    console.log("try")
    console.log(ctx.request.body)
    return passport.authenticate('local', (err, user, info, status) => {
        if (user === false) {
            if (status == 2) {
                ctx.body = { error: false, connected: false, exists: false }
            } else if (status == 0) {
                ctx.body = { error: false, connected: false, exists: true }
            }
        } else {
            console.log('log in')
            ctx.body = { error: false, connected: true, exists: true }
            return ctx.login(user)
        }
    })(ctx)
})

router.post('/signup', async(ctx) => {
    console.log("try")
    console.log(ctx.request.body)
    return passport.authenticate('local-signup', (err, user, info, status) => {
        console.log(err, user, info, status)
        if (status == 2) {
            ctx.body = { error: true, signedup: false, exists: false } //error
            console.log("error signing up")
        } else if (status == 0) {
            ctx.body = { error: false, signup: false, exists: true } //already exists
            console.log("user already exists")
        } else {
            ctx.body = { error: false, signedup: true, exists: true } //signed up
            console.log("signed up", user)
            ctx.login(user)
        }
    })(ctx)

})

router.get('/logout', async(ctx) => {
    console.log("logout")
    ctx.logout();
    ctx.body = { error: false, loggedout: true }
})

router.get('/checkconnected', async(ctx) => {
    console.log('checkconnected')
    if (ctx.isAuthenticated()) {
        ctx.body = { connected: true }
        console.log("ok")
    } else {
        ctx.body = { connected: false }
        console.log("ko")
    }
})

module.exports = router