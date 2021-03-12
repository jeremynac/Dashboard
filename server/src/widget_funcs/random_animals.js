const fetch = require('node-fetch')

async function getRandomAnimal(widget) {
    console.log("get widget animal")
    const animal_type = widget.parameters.animal_type
    let animal;
    if (animal_type == "cat") {
        await fetch("https://aws.random.cat/meow").then(im => im.json()).then(body => { animal = body.file });
    } else if (animal_type == "fox") {
        await fetch("https://randomfox.ca/floof/").then(im => im.json()).then(body => { animal = body.image });
    } else {
        await fetch("https://random.dog/woof.json").then(im => im.json()).then(body => { animal = body.url });
    }
    return { type: "random_animal", id: widget.id, delay: widget.delay, widgetdata: { image: animal } }
}

module.exports = {
    getRandomAnimal: getRandomAnimal
}