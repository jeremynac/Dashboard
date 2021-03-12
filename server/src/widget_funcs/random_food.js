const fetch = require('node-fetch');

async function getRandomFood(widget) {
    console.log("get widget food")
    const food_type = widget.parameters.food_type
    let food;
    if (food_type == '' || food_type == 'random')
        await fetch("https://foodish-api.herokuapp.com/api/").then(im => im.json()).then(body => { food = body.image })
    else
        await fetch("https://foodish-api.herokuapp.com/api/images/" + food_type).then(im => im.json()).then(body => { food = body.image })
    return { type: "random_food", id: widget.id, delay: widget.delay, widgetdata: { image: food } }
}

module.exports = {
    getRandomFood: getRandomFood
}