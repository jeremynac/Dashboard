const db_funcs = require('./db/db_functions')
const rss = require('./widget_funcs/rss_widget')
const gmail = require('./widget_funcs/gmail_widget')
const r_animals = require('./widget_funcs/random_animals')
const r_food = require('./widget_funcs/random_food')
const r_joke = require('./widget_funcs/random_joke')
const w_data = require('./widget_funcs/world_data')
const clock = require('./widget_funcs/clock_widget')

async function getUserWidgets(user) {
    let query = await db_funcs.getUserWidgets(user.user_id)
    if (query.rows[0]) {
        return query.rows[0].widgets_id
    } else {
        return null
    }
}

async function addWidget(req, user) {
    let widget_params = JSON.stringify(req.body.data.parameters)
    let type = req.body.data.type
    let delay = req.body.data.delay
    let user_widgets_id = await getUserWidgets(user)
    if (user_widgets_id) {
        let query = await db_funcs.addWidget(user_widgets_id, type, delay, widget_params)
        if (query.rows[0]) {
            return { type: type, id: query.rows[0].id, widgetdata: {} }
        } else {
            return null
        }
    } else {
        return null
    }
}

async function processWidgets(widgets) {
    let widgets_obj = { widgets: {} };
    for (w in widgets) {
        if (widgets[w].value) {
            widgets_obj.widgets[widgets[w].value.id] = widgets[w].value
        }
    }
    return widgets_obj
}

async function getAllWidgets(user) {
    let widgets_query = await db_funcs.getAllWidgets(user.user_id)
    let widgets_rows = widgets_query.rows
    let obj;
    let objs;
    if (widgets_rows) {
        let test = await Promise.allSettled(widgets_rows.map(async wid => {
                return filterWidget(wid)
            })).then(res => {
                obj = res
            })
            .catch(e => {
                console.log("error getting all widgets", e)
                return null
            })
        await processWidgets(obj)
            .then(res => {
                objs = res
            })
        return objs
    } else {
        console.log(" failed widgets")
        return null
    }
}

async function getWidget(query, user) {
    console.log("trying to update", query.id)
    if (!query) {
        return null
    }
    console.log("trying to update widgets")
    let widget_query = await db_funcs.getWidget(user.user_id, Number(query.id));
    let widget = widget_query.rows[0]
    let w;
    if (widget) {
        await filterWidget(widget, user)
            .then(wid => {
                if (wid) {
                    w = wid
                } else {
                    return null
                }
            })
            .catch(error => {
                console.log("error", error)
                return null
            })
    } else {
        return null
    }
    console.log("updated widget")
    return w
}

async function deleteWidget(req, user) {
    let query = await db_funcs.deleteWidget(user.user_id, Number(req.body.data.id))
    return { error: null, deleted: "yes" }
}

async function filterWidget(widget, user) {
    try {
        switch (widget.type) {
            case "rss":
                return rss.getRssWidget(widget)
            case "gmail":
                return gmail.getGmailWidget(user, widget)
            case "random_animal":
                return r_animals.getRandomAnimal(widget)
            case "random_food":
                return r_food.getRandomFood(widget)
            case "random_joke":
                return r_joke.getRandomjokes(widget)
            case "world_data":
                return w_data.getWorldData(widget)
            case "clock":
                return clock.getClock(widget)
            default:
                return Promise.reject('')
        }
    } catch (e) {
        console.log("caught error", e)
        return Promise.reject(e)
    }
}

module.exports = {
    deleteWidget: deleteWidget,
    getWidget: getWidget,
    getAllWidgets: getAllWidgets,
    addWidget: addWidget
};