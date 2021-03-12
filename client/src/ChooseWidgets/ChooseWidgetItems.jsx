import React, {useState} from 'react'
import { Card, Modal, Form, Image, Button, Select} from 'semantic-ui-react'
import rss_icon from '../asset/rss_icon.png'
import gmail_icon from '../asset/gmail_icon.png'
import GoogleLogin from 'react-google-login';
import animal_icon from '../asset/animal_icon.png'
import food_icon from '../asset/food_icon.png'
import joke_icon from '../asset/joke_icon.png'
import world_icon from '../asset/world_icon2.png'
import clock_icon from '../asset/clock_icon.png'
import * as Constants from '../Constants'
import TimeZoneSelect from 'react-timezone-select'
import {addGmailToken} from '../Api'

function ChooseWidgetItem(props) {
    const [open, setOpen] = useState(false);
    return (
        <Card>
            <Image src={props.icon} size='small' wrapped ui={false}/>
            <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} trigger={<Button> Add this widget</Button>} size='mini' open={open}>
                <Form onSubmit={(e)=>{setOpen(false); props.handleSubmit(e)}}>
                    {props.children}
                    <Button content='Cancel' onClick={()=>{setOpen(false)}} />
                    <Button.Group floated='right'>
                        <Button content='Add' type='submit' floated='right'/>
                    </Button.Group>
                </Form>
            </Modal>
        </Card>
    )
}

export function RssWidgetChoose(props) {
    const [name, setname] = useState('')
    const [rssurl, setrssurl] = useState('')
    const [number, setnumber] = useState(1)
    const [delay, setdelay] = useState(process.env.REACT_APP_W_RSS_DELAY)
    const handleSubmit = (e) => {
        const specs = {
            type: 'rss',
            name: name,
            delay: delay,
            parameters: {
                url: rssurl,
                number: number
            }
        }
        props.handleSubmit(specs)
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={rss_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <input type='number' step={1} value={number} onChange={(e)=>{setnumber(e.target.value)}} />
                <Form.Input placeholder='name' value={name} onChange = {(e) => {setname(e.target.value)}} />
                <Form.Input placeholder='rssurl' value={rssurl} onChange={(e) => {setrssurl(e.target.value)}} />
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

export function GmailWidgetChoose(props) {
    const [labels, setlabels] = useState('')
    const [number, setnumber] = useState(1)
    const [connected, setconnected] = useState(false)
    const [delay, setdelay] = useState(process.env.REACT_APP_W_GMAIL_DELAY)
    const handleSubmit = (e) => {
        if (!connected){
            return
        }
        const specs = {
            type: 'gmail',
            delay: delay,
            parameters: {
                labels: labels,
                number: number,
            }
        }
        props.handleSubmit(specs)
    }
    const responseGoogle = (response) => {
        console.log(response, response.Ow, response.accessToken)
        if (response) {
            addGmailToken(response.accessToken)
                .then(res=> {
                    console.log("added token")
                    setconnected(true)
                })
                .catch(e=>{
                    console.log("error adding token", e)
                })
        }
        console.log(response);
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={gmail_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <input type='number' step={1} value={number} onChange={(e)=>{setnumber(e.target.value)}} />
                <Select placeholder='labels' value={labels} options={Constants.labels} onChange={(e, data)=>{setlabels(data.value)}} />
                {connected ? "Already connected to google or ": ''}
                <GoogleLogin clientId="981693314082-h63tnmq50p70dedppoog05q19nkc1p7s.apps.googleusercontent.com"
                    scope = 'https://www.googleapis.com/auth/gmail.readonly'
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

export function AnimalWidgetChoose(props) {
    const [animal_type, setanimal_type] = useState('')
    const [delay, setdelay] = useState(process.env.REACT_APP_W_ANIMAL_DELAY)
    const handleSubmit = (e) => {
        if (animal_type === '') {
            setanimal_type('dog')
        }
        const specs = {
            type: 'random_animal',
            delay: delay,
            parameters: {
                animal_type: animal_type,
            }
        }
        props.handleSubmit(specs)
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={animal_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <Select placeholder='Choose an animal' options={Constants.animals} value={animal_type} onChange={ (e, data)=>{setanimal_type(data.value)}} />
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

export function FoodWidgetChoose(props) {
    const [food_type, setfood_type] = useState('')
    const [delay, setdelay] = useState(process.env.REACT_APP_W_FOOD_DELAY)
    const handleSubmit = (e) => {
        const specs = {
            type: 'random_food',
            delay: delay,
            parameters: {
                food_type: food_type
            }
        }
        props.handleSubmit(specs)
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={food_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <Select placeholder='Choose a dish' options={Constants.food} value={food_type} onChange={ (e, data)=>{setfood_type(data.value)}}/>
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

export function JokeWidgetChoose(props) {
    const [joke_type, setjoke_type] = useState('')
    const [delay, setdelay] = useState(process.env.REACT_APP_W_JOKE_DELAY)
    const handleSubmit = (e) => {
        console.log(joke_type)
        const specs = {
            type: 'random_joke',
            delay: delay,
            parameters: {
                joke_type: joke_type
            }
        }
        props.handleSubmit(specs)
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={joke_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <Select placeholder='What kind of joke do you want' options={Constants.jokes} value={joke_type} onChange={ (e, data)=>{setjoke_type(data.value)}}/>
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

export function WorldDataWidgetChoose(props) {
    const [country, setcountry] = useState('')
    const [delay, setdelay] = useState(process.env.REACT_APP_W_WORLD_DELAY)
    const handleSubmit = (e) => {
        if (country === '') {
            setcountry('al')
        }
        const specs = {
            type: 'world_data',
            delay: delay,
            parameters: {
                country: country
            }
        }
        props.handleSubmit(specs)
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={world_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <Select placeholder='What Country do you want data on' options={Constants.countries} value={country} onChange={ (e, data)=>{setcountry(data.value)}}/>
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

export function ClockWidgetChoose(props) {
    const [timezone, settimezone] = useState('')
    const [clock_style, setclock_style] = useState('default')
    const [delay, setdelay] = useState(process.env.REACT_APP_W_CLOCK_DELAY)
    const handleSubmit = (e) => {
        if (timezone === '') {
            settimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
        }
        const specs = {
            type: 'clock',
            delay: delay,
            parameters: {
                timezone: timezone,
                clock_style: clock_style
            }
        }
        props.handleSubmit(specs)
    }
    return (
        <ChooseWidgetItem handleSubmit={handleSubmit} icon={clock_icon}>
            <Form.Field>
                <input type='delay' step={1} value={delay} onChange={(e)=>{setdelay(e.target.value)}} />
                <TimeZoneSelect value={timezone} onChange={settimezone} />
                <Select options={Constants.clock_style} value={clock_style} onChange={(e, data) => {setclock_style(data.value)}} />
            </Form.Field>
        </ChooseWidgetItem>
        
    )
}

