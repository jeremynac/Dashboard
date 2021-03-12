import React, { useCallback } from 'react'
import {Grid} from 'semantic-ui-react'
import { RssWidgetChoose, GmailWidgetChoose, JokeWidgetChoose, AnimalWidgetChoose, FoodWidgetChoose, WorldDataWidgetChoose, ClockWidgetChoose} from './ChooseWidgetItems'

export function ChooseWidgetsGrid(props) {
    
    
    const handleSubmitWidget = useCallback((specs) => {
        props.handleSubmit(specs)
    }, [props])

    return(
        <div>
            <Grid columns='equal' centered relaxed>
                <Grid.Row>
                    <Grid.Column>
                        <JokeWidgetChoose handleSubmit = {handleSubmitWidget} />
                        <RssWidgetChoose handleSubmit = {handleSubmitWidget} />
                    </Grid.Column>
                    <Grid.Column>
                        <GmailWidgetChoose handleSubmit = {handleSubmitWidget} />
                        <AnimalWidgetChoose handleSubmit = {handleSubmitWidget} />
                        <FoodWidgetChoose handleSubmit = {handleSubmitWidget} />
                    </Grid.Column>
                    <Grid.Column>
                        <ClockWidgetChoose handleSubmit = {handleSubmitWidget} />
                        <WorldDataWidgetChoose handleSubmit = {handleSubmitWidget} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
