const LocalStrategy = require('passport-local').Strategy;
const passport = require('koa-passport')
const db_funcs = require('./db/db_functions')
passport.serializeUser((user, done) => {
    console.log("serialize")
    done(null, user.user_id)
});

passport.deserializeUser(async(user_id, done) => {
    console.log("deserialize")
    try {
        const user = await db_funcs.getUser(user_id)
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use('local-signup', new LocalStrategy((username, password, done) => {
    db_funcs.checkUser(username, password)
        .then(user => {
            if (user) {
                console.log("localsignup1")
                done(null, null, 0)
            } else {
                console.log("localsignup2")
                db_funcs.db_signup(username, password)
                    .then(user => {
                        if (user) {
                            console.log("localsignup3")
                            done(null, user, 1);
                        } else {
                            console.log("localsignup4")
                            done(null, null, 2);
                        }
                    })
                    .catch(error => {
                        console.log("localsignup5")
                        done(null, null, 2);
                    })
            }
        })
        .catch(error => {
            done(error, null, 2);
        })
}))

passport.use('local', new LocalStrategy((username, password, done) => {
    console.log('try to log in')
    db_funcs.checkUser(username, password)
        .then(
            user => {
                if (user) {
                    if (password != user.password) {
                        console.log("wrong password", user)
                        done(null, false, 0)
                    } else {
                        console.log("ok connect")
                        done(null, user, 1)
                    }
                } else {
                    console.log('error connect')
                    done(null, false, 2)
                }
            }
        )
}));

/*
passport.use(new LocalStrategy((username, password, done) => {
    console.log(username)
    user2 = fetchUser2(username)
    console.log(user2.username, user2.password)
    if (username === user2.username && password === user2.password) {
        console.log("log")
        done(null, user2);
    } else {
        console.log("notlog")
        done(null, false);
    }
}));*/