import React, {useState, useEffect} from 'react'
import {Card, Image, Header, Reveal, Flag, Modal, Button, Select, Divider, Segment} from 'semantic-ui-react'
import AnalogClock from 'ras-react-component'
import * as Constants from '../Constants'
import rss_icon from '../asset/rss_icon.png'
import gmail_icon from '../asset/gmail_icon.png'
import animal_icon from '../asset/animal_icon.png'
import food_icon from '../asset/food_icon.png'
import joke_icon from '../asset/joke_icon.png'
import world_icon from '../asset/world_icon2.png'

export function RSSWidget(props) {
    return (
        <Segment color='grey'>
            <Header>
                {props.data.widgetdata.title}
            </Header>
            <Card.Group>
                {props.data.widgetdata.entries.map((entry, index)=>{ return(
                    <Card>
                        <Header>
                            {entry.title}
                        </Header>
                        <Divider />
                        <Card.Content>
                            <Button as='a' href={entry.link}>
                                {props.data.widgetdata.title}
                            </Button>
                        </Card.Content>
                        <Card.Content extra>
                            <Image src={rss_icon} size='mini'/>
                            RSS
                        </Card.Content>
                    </Card>)
                })}
            </Card.Group>
        </Segment>
    )
}

export function GmailWidget(props) {
    return (
            <Card.Group>
                {props.data.widgetdata.entries.map((entry, index)=>{ return (
                    <Card>
                        <Header color='blue'>
                            <p>This is your emails:</p>
                            {entry.snippet}
                        </Header>
                        <Divider />
                        <Card.Meta>
                            subject: {entry.subject}

                        </Card.Meta>
                        <Card.Meta>
                            From: {entry.from}

                        </Card.Meta>
                        <Card.Meta>
                            To: {entry.to}

                        </Card.Meta>
                        <Card.Content>
                            {entry.body}
                        </Card.Content>
                        <Card.Content extra>
                            {entry.Date}
                        </Card.Content>
                        <Card.Content extra>
                            <Image src={gmail_icon} size='mini' />
                            Gmail
                        </Card.Content>
                    </Card>
                )
                })}
            </Card.Group>
    )
}

export function AnimalWidget(props) {

    return (
        <Card size='small'>
                <Image src={props.data.widgetdata.image}/>
            <Card.Content extra>
                <Image src={animal_icon} size='mini' />
                Animals
            </Card.Content>
        </Card>
    )
}

export function FoodWidget(props) {
    return (
        <Card size='small'>
            <Image src={props.data.widgetdata.image} />
            <Card.Content extra>
                <Image src={food_icon} size='mini' />
                Food
            </Card.Content>
        </Card>
    )
}

export function JokeWidget(props) {
    return (
            <Card size='small'>
                <Card.Content>
                    <Header color='grey'>
                        {props.data.widgetdata.joke.setup}
                    </Header>
                    <Divider />
                    <Reveal animated='move right' instant>
                        <Reveal.Content visible>
                            <Card>
                                <Header content={'Click to get the joke !'} />
                            </Card>
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Card>
                                <Header content={ props.data.widgetdata.joke.punchline} />
                            </Card>
                        </Reveal.Content>
                    </Reveal>
                </Card.Content>
                <Card.Content extra><Image src={joke_icon} size='mini'/>Joke: {props.data.widgetdata.joke.type} </Card.Content>
            </Card>
    )
}

export function WorldWidget(props) {
    let name = props.data.widgetdata.country_data.name || ''
    let code = props.data.widgetdata.country_code || ''
    let capital = props.data.widgetdata.country_data.capitalCity || 'capital_city'
    let income = props.data.widgetdata.country_data.incomeLevel.value || 'income_level'
    let region = props.data.widgetdata.country_data.region.value || ''
    return (
            <Card size='small'>
                <Card.Content>
                <Header>
                    {name}
                    <Flag name={code} />
                </Header>
                <Divider />
                <Header>
                    {"Region: " + region}
                </Header>
                <Header>
                    {"Capital city: " + capital}
                </Header>
                <Header>
                    {"Income level: " + income}
                </Header>
                </Card.Content>
                <Card.Content extra><Image src={world_icon} size='mini' />World Data</Card.Content>
            </Card>
    )
}

export function ClockWidget(props) {
    const [temp_style, settemp_style] = useState({})
    const [style, setstyle] = useState(Constants.clocks.default)
    const timezone = props.data.widgetdata.timezone.value || ''
    const [open, setopen] = useState(false)
    
    useEffect(() => {
        let style_temp = JSON.parse(JSON.stringify(Constants.clocks[props.data.widgetdata.clock_style]))
        style_temp.iana = timezone
        setstyle(style_temp)
        console.log(style_temp.iana)
      return () => {
      };
    }, [])
    const modify = () => {
        let style_temp = JSON.parse(JSON.stringify(Constants.clocks[temp_style]))
        style_temp.iana = timezone
        setstyle(style_temp)
    }
    return (
        <Card>
            <Modal onClose={() => setopen(false)} onOpen={() => setopen(true)} trigger={<Button color='black'> Modify </Button>} size='mini' open={open}>
                {/* <TimeZoneSelect value={timezone} onChange={ssettimezone} /> */}
                <Select options={Constants.clock_style} value={temp_style} onChange={(e, data) => {settemp_style(data.value)}} />
                <Button onClick={() => modify()}>confirm</Button>
            </Modal>
            <Header>
                {props.data.widgetdata.timezone.value}
            </Header>
            <AnalogClock style={style} />
        </Card>
    )
}
