async function getClock(widget) {
    console.log("get widget clock")
    return { type: "clock", id: widget.id, delay: widget.delay, widgetdata: { timezone: widget.parameters.timezone, clock_style: widget.parameters.clock_style } }
}

module.exports = {
    getClock: getClock
}