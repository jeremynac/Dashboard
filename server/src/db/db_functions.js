const Koa = require('koa');
const { del } = require('request');
var request = require('request');
const db = require('./db');

async function getUser(user_id) {

    console.log("try find")
    var user = await db().query('SELECT * FROM users WHERE user_id = $1', [user_id])
    if (user) {
        if (user.rows[0]) {
            console.log("found user", user.rows[0])
            return user.rows[0]
        }
    }
    console.log("didnt find user", user_id)
    return null
}

async function checkUser(username, password, ctx) {
    try {
        var data = await db().query('SELECT * FROM users WHERE username = $1', [username])
    } catch (e) { //error
        return null
    }
    let users = data.rows
    if (users[0] === null) { //User doesnt exist
        return null
    } else { //User exists
        console.log("found user")
        return users[0]
    }
}

async function db_signup_widgets(user_id) {
    return db().query('INSERT INTO user_widgets (user_id) values ($1)', [user_id])
}

async function db_signup(username, password) {
    try {
        console.log("new user", username)
        var user = await db().query('INSERT INTO users (username, password) values ($1, $2) RETURNING *', [username, password])
        if (user) {
            if (user.rows[0]) {
                const widget_query = await db_signup_widgets(user.rows[0].user_id)
                if (widget_query) {
                    return user.rows[0] //user signed up
                } else {
                    return null
                }
            }
        } else {
            return null //user not signed up
        }
    } catch (e) { //user cannot be inserted
        console.log(e)
        return null
    }
}

async function getGmailToken(user_id) {
    try {
        var token = await db().query('SELECT gmail_token FROM users where user_id=$1', [user_id])
        if (token) {
            return token
        } else {
            null
        }
    } catch (e) {
        return null
    }
}

async function addGmailToken(user_id, token) {
    try {
        var ok = await db().query('UPDATE users SET gmail_token=$2 WHERE user_id=$1', [user_id, token])
        console.log("added gmail tok", token)
        if (ok) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

async function addWidget(user_widgets_id, type, delay, widget_params) {
    return db().query("INSERT INTO widget (widgets_id, type, delay, parameters) values ($1, $2, $3, $4) RETURNING *", [user_widgets_id, type, delay, widget_params])
}

async function getAllWidgets(user_id) {
    return db().query("SELECT * FROM widget WHERE widgets_id IN (SELECT widgets_id FROM user_widgets where user_id=$1)", [user_id])
}

async function getUserWidgets(user_id) {
    return db().query("SELECT widgets_id FROM user_widgets WHERE user_id=$1", [user_id]);
}

async function getWidget(user_id, widget_id) {
    return db().query("SELECT * FROM widget WHERE widgets_id IN (SELECT widgets_id FROM user_widgets where user_id=$1) AND id=$2", [user_id, widget_id])
}

async function deleteWidget(user_id, widget_id) {
    return db().query("DELETE FROM widget WHERE widgets_id IN (SELECT widgets_id FROM user_widgets where user_id=$1) AND id=$2", [user_id, widget_id])
}

module.exports = {
    getUser: getUser,
    checkUser: checkUser,
    db_signup: db_signup,
    getGmailToken: getGmailToken,
    addWidget: addWidget,
    getAllWidgets: getAllWidgets,
    getUserWidgets: getUserWidgets,
    getWidget: getWidget,
    addGmailToken: addGmailToken,
    deleteWidget: deleteWidget
}