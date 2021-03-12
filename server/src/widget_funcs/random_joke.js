const fetch = require('node-fetch')

async function getRandomjokes(widget) {
    console.log("get widget joke", widget.parameters.joke_type)
    const joke_type = widget.parameters.joke_type
    let joke;
    if (joke_type == "random" || joke_type == undefined || joke_type == '') {
        await fetch("https://official-joke-api.appspot.com/jokes/random").then(im => im.json()).then(body => { joke = body })
    } else {
        await fetch("https://official-joke-api.appspot.com/jokes/" + joke_type + "/random").then(im => im.json()).then(body => { joke = body[0] })
    }
    console.log(joke)
    return { type: "random_joke", id: widget.id, delay: widget.delay, widgetdata: { joke: joke } }
}

module.exports = {
    getRandomjokes: getRandomjokes
}