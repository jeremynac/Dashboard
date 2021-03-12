const db_funcs = require('../db/db_functions');
const fetch = require('node-fetch');

async function findHeader(header, name) {
    for (ii in header) {
        if (header[ii].name == name) {
            return header[ii].value
        }
    }
    return ''
}

async function processMails(mails) {
    let objs = []
    for (i in mails) {
        objs.push({});
        objs[i].snippet = mails[i].snippet;
        objs[i].from = await findHeader(mails[i].payload.headers, 'From');
        objs[i].to = await findHeader(mails[i].payload.headers, 'To');
        objs[i].subject = await findHeader(mails[i].payload.headers, 'Subject')
        objs[i].Date = await findHeader(mails[i].payload.headers, 'Date');
        objs[i].body = Buffer.from(mails[i].payload.parts[0].body.data, 'base64').toString();
    }
    return objs;
}

async function getGmailWidget(user, widget) {
    console.log("get widget gmail")
    try {
        const token_row = await db_funcs.getGmailToken(user.user_id)
        let token = token_row.rows[0].gmail_token
        let res;
        var mails_id = [];
        var mails = [];
        let entries;
        let labels;
        if (widget.parameters.labels) {
            labels = widget.parameters.labels
        } else {
            labels = "INBOX"
        }
        let url = "https://www.googleapis.com/gmail/v1/users/me/messages" + "?maxResults=" + widget.parameters.number + "&labelsID="
        labels + "&format=FULL"
        const option = {
            headers: { Authorization: "Bearer " + token }
        }
        await fetch(url, option).then(im => im.json()).then(body => { res = body })
        for (i in res.messages) {
            mails_id.push(res.messages[i].id)
        }
        if (!mails_id.length) {
            return Promise.reject('') //{
                //     type: widget.type,
                //     id: widget.id,
                //     delay: widget.delay,
                //     widgetdata: { entries: {} }
                // }
        }
        await Promise.all(mails_id.map(id => {
            return fetch("https://www.googleapis.com/gmail/v1/users/me/messages/" + id, option);
        })).then(function(responses) {
            return Promise.all(responses.map(function(response) {
                return response.json();
            }));
        }).then(res2 => {
            for (i in res2) {
                mails.push(res2[i])
            }
        }).catch(e => {
            return Promise.reject(e)
        })
        entries = await processMails(mails)
        return ({
            type: widget.type,
            id: widget.id,
            delay: widget.delay,
            widgetdata: { entries: entries }
        })
    } catch (e) {
        return Promise.reject('')
    }
}

module.exports = {
    getGmailWidget: getGmailWidget
}