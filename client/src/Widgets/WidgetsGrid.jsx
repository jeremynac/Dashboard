import React from 'react'
import { getWidgets, updateWidget, addWidget, deleteWidget } from '../Api'
import Widget from './Widget'
import { ChooseWidgetsGrid } from '../ChooseWidgets/ChooseWidgetsGrid'
import { Modal, Button, Segment} from 'semantic-ui-react'
import {SquareLayout} from "@egjs/react-infinitegrid";

class WidgetsGrid extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            widgets: {},
            open: false
        }
        this.getWidgetsServer = this.getWidgetsServer.bind(this);
        this.processWidgetServer = this.processWidgetServer.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }

    componentDidMount() {
        console.log("hello")
        this.getWidgetsServer();
        console.log(this.state.widgets)
    }

    processWidgetServer(widgetslist) {
        if (widgetslist.data) {
            this.setState({ widgets: widgetslist.data.widgets })
            console.log("state", this.state.widgets)
        }
    }

    processUpdate(res, id) {
        console.log("update id " + id, res)
        if (res.data) {
            console.log(res.data)
            console.log("test")
            var widgetscopy = this.state.widgets
            console.log("test")

            widgetscopy[id] = res.data
            console.log("test")
            this.setState({
                widgets: widgetscopy
            })
        }
    }

    updateWidgetServer(id) {
        // console.log("trying to update ", id)
        // if (!(id in this.state.widgets)) {
        //     console.log(id, "error updating id")
        //     return
        // }
        if (id !== undefined) {
            console.log(" updating the widget", id)
            updateWidget(id)
                .then(
                    res => {
                        console.log(res.error)
                        if (res.error) {
                            console.log("no update")
                        } else {
                            this.processUpdate(res, id)
                        }
                    }
                )
                .catch(error => {
                    console.log("error update")
                })
        }
    }

    getWidgetsServer() {
        getWidgets()
            .then(
                widgetslist => {
                    if (widgetslist) {
                        console.log("loading widgets", widgetslist)
                        this.processWidgetServer(widgetslist)
                    } else {
                        console.log("no widget")
                    }
                })
            .catch(error => {
                console.log("error getting server widgets")
            })
    }

    setOpen(e) {
        this.setState({ open: e })
    }

    addWidgetServer(specs) {
        console.log(specs)
        addWidget(specs)
            .then(
                res => {
                    if (res.data) {
                        this.updateWidgetServer(res.data.id)
                        console.log("added widget")
                    } else {
                        console.log("failed to add widget")
                    }
                }
            )
            .catch(
                error => {
                    console.log("error adding widget")
                }
            )
    }

    deleteWidgetServer(id) {
        deleteWidget(id)
            .then(
                res => {
                    console.log(res.error)
                    if (res.error) {
                        console.log("not deleted")
                    }
                }
            )
            .catch(error => {
                console.log("error update")
            })
        console.log(this.state.widgets)
        let temp = this.state.widgets;
        delete temp[id]
        this.setState({widgets: temp})
        console.log(this.state.widgets)
    }

    render() {
            return ( 
                <div>
                    <div>
                        <Segment basic fluid clearing>
                            <Button.Group floated='left'>
                                <Button color='black' onClick = {() => { this.props.logout() } } >
                                    Logout 
                                </Button>
                            </Button.Group>
                            <Modal onClose = {() => this.setOpen(false) }onOpen = {() => this.setOpen(true) }trigger = { <Button.Group floated='right'><Button circular icon='plus' color='black' size='big'></Button></Button.Group>} open={this.state.open}> 
                                <ChooseWidgetsGrid handleSubmit = {(specs) => { this.addWidgetServer(specs) } }/> 
                            </Modal>
                        </Segment>
                    </div>
                    <div>
                        <SquareLayout options={{isOverflowScroll: false,useFit: true,useRecycle: true, horizontal: false}}
                                        layoutOptions={{
                                            margin: 5,
                                            itemSize: 0,
                                            column: 4,
                                        }}>
                                {Object.keys(this.state.widgets).map((key, index) => <Widget update={(id)=> {this.updateWidgetServer(id)}} key={ index } id = { key } data = { this.state.widgets[key]} del={(id)=> {this.deleteWidgetServer(id)}} />)}
                        </SquareLayout>
                    </div>
                </div>
            )
    }
}
export default WidgetsGrid