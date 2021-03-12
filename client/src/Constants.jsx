export const animals = [
    { key: 'cat', value: 'cat', text: 'Cat' },
    { key: 'fox', value: 'fox', text: 'Fox' },
    { key: 'dog', value: 'dog', text: 'Dog' }
]

export const food = [
    { key: 'pizza', value: 'pizza', text: 'Pizza' },
    { key: 'burger', value: 'burger', text: 'Burger' },
    { key: 'idly', value: 'idly', text: 'Idly (Indian rice cake)' },
    { key: 'dosa', value: 'dosa', text: 'Dosa (Indian rie pancake)' }
]

export const jokes = [
    { key: 'random', value: 'random', text: "Any joke" },
    { key: 'general', value: 'general', text: 'General' },
    { key: 'programming', value: 'programming', text: 'Programming' },
    { key: 'knock-knock', value: 'knock-knock', text: 'Knock-knock' },
]

export const countries = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
]

export const labels = [
    { key: 'INBOX', value: 'INBOX', text: 'inbox' },
    { key: 'UNREAD', value: 'UNREAD', text: 'unread' },
    { key: 'PRIORITY', value: 'PRIORITY', text: 'priority' },
    { key: 'IMPORTANT', value: 'IMPORTANT', text: 'important' }
]

export const clock_style = [
    { key: 'default', value: 'default', text: 'default' },
    { key: 'modern', value: 'modern', text: 'modern' },
    { key: 'classic', value: 'classic', text: 'classic' },
    { key: 'colorful', value: 'colorful', text: 'colorful' }
]

export const clocks = {
    default: {   showRomanNumbers: false,
        showMinuteScale: true,
        showHourScale: true,
        showNumbers: true,
        radialDirectionOfNumbers: false,
        colorOfScalesAndNumbers: `black`,
        hourHandColor: `#151515`,
        minuteHandColor: `black`,
        secondHandColor: `red`,
        firstCircleColor: `white`,
        secondCircleColor: `white`,
        thirdCircleColor: `white`,
        fourthCircleColor: `black`,
        centerDotColor: `black`,
        width: 300,
        numberSize: 150
    }, modern: {   showRomanNumbers: false,
        showMinuteScale: false,
        showHourScale: false,
        showNumbers: false,
        radialDirectionOfNumbers: false,
        colorOfScalesAndNumbers: `black`,
        hourHandColor: `#151515`,
        minuteHandColor: `white`,
        secondHandColor: `white`,
        firstCircleColor: `white`,
        secondCircleColor: `white`,
        thirdCircleColor: `white`,
        fourthCircleColor: `black`,
        centerDotColor: `white`,
        width: 300,
        numberSize: 150
    }, classic: {   
        showRomanNumbers: true,
        showMinuteScale: false,
        showHourScale: false,
        showNumbers: true,
        radialDirectionOfNumbers: false,
        colorOfScalesAndNumbers: `black`,
        hourHandColor: `#151515`,
        minuteHandColor: `black`,
        secondHandColor: `black`,
        firstCircleColor: `white`,
        secondCircleColor: `white`,
        thirdCircleColor: `white`,
        fourthCircleColor: `white`,
        centerDotColor: `white`,
        width: 300,
        numberSize: 150
    },colorful: {  
        showRomanNumbers: false,
        showMinuteScale: true,
        showHourScale: true,
        showNumbers: true,
        radialDirectionOfNumbers: false,
        colorOfScalesAndNumbers: `red`,
        hourHandColor: `#151515`,
        minuteHandColor: `white`,
        secondHandColor: `white`,
        firstCircleColor: `yellow`,
        secondCircleColor: `red`,
        thirdCircleColor: `yellow`,
        fourthCircleColor: `red`,
        centerDotColor: `yellow`,
        width: 300,
        numberSize: 150
    }
}