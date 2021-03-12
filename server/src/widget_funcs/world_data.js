const fetch = require('node-fetch');

async function getWorldData(widget) {
    console.log("get widget world")
    const country = widget.parameters.country
    let country_data;
    await fetch("http://api.worldbank.org/v2/country/" + country + "?format=json").then(im => im.json()).then(body => { country_data = body })
    return { type: "world_data", id: widget.id, delay: widget.delay, widgetdata: { country_data: country_data[1][0], country_code: country } }
}

module.exports = {
    getWorldData: getWorldData
}