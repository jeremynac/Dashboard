const Parser = require('rss-parser');
const parser = new Parser()

async function getRssWidget(widget) {
    console.log("get widget rss")
    let feed;
    try {
        if (widget.parameters.url == '' || widget.parameters.url == undefined) {
            return Promise.reject('')
        }
        feed = await parser.parseURL(widget.parameters.url);
        if (feed != null) {
            var obj = { type: widget.type, id: widget.id, delay: widget.delay, widgetdata: { title: feed.title, entries: [] } }
            for (i = 0; i < Math.min(feed.items.length, widget.parameters.number); i++) {
                obj.widgetdata.entries.push({ title: feed.items[i].title, link: feed.items[i].link })
                    //console.log(obj.widgetdata.entries)
            }
            console.log("returning", widget.id)
            return obj;
        } else {
            return Promise.reject('')
        }
    } catch (e) {
        return Promise.reject(e)
    }
}

module.exports = {
    getRssWidget: getRssWidget
}