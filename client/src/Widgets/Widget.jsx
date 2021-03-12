import React, { useEffect, useCallback } from 'react'
import { RSSWidget, GmailWidget, JokeWidget, AnimalWidget, FoodWidget, WorldWidget, ClockWidget} from './Widgets'
import ErrorBoundary from '../ErrorBoundary'
import { Button, Segment } from 'semantic-ui-react'

function Widget(props) {
    console.log(props)
    const id = props.data.id
    const type = props.data.type
    const delay = props.data.delay * 1000
    const update = useCallback(() => {
        props.update(id)
    }, [props, id])

    const del = useCallback(() => {
        props.del(id)
    }, [props, id])

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("update widget interval")
            update();
        }, delay);
        return () => clearInterval(interval);
    }, [update, delay]);
    // const type = "random_animal"
    function renderWidget() {
        switch (type) {
            case 'rss':
                return <RSSWidget data = { props.data }/>
            case "gmail":
                return <GmailWidget data = { props.data }/>
            case "random_joke":
                return <JokeWidget data = { props.data }/>
            case "random_animal":
                return <AnimalWidget data = { props.data }/>
            case "random_food":
                return <FoodWidget data = { props.data }/>
            case "world_data":
                return <WorldWidget data = { props.data }/>
            case "clock":
                return <ClockWidget data = { props.data }/>
            default:
                return <h1 > no widget </h1>
        }
    }
    return ( 
            < ErrorBoundary >
                <Segment basic>
                        <Button circular icon='close' color='black' onClick={()=>{del()}}/>
                    { renderWidget() } 
                </Segment>
            </ErrorBoundary>)
        // return (<AnimalWidget data={props.data} />)
    }

    export default Widget