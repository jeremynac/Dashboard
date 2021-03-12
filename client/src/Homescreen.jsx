import React, {useState, useEffect, useCallback} from 'react'
import {Modal, Button, Menu, Header, Segment, Container} from 'semantic-ui-react'
import Login from './Login'
import WidgetsGrid from './Widgets/WidgetsGrid'
import {checkConnected, logout} from './Api'
import ErrorBoundary from './ErrorBoundary'


function HomeScreen(props){
    const [connected, setconnected] = useState(false)
    const [open, setopen] = useState(false)
    useEffect(() => {
        checkConnected()
            .then(res => {
                if (res.data.connected) {
                    console.log("connected")
                    setconnected(true)
                } else {
                    console.log("not connected")
                }
            })
            .catch(error => {
                console.log("error reaching server")
            })
    }, [])
    const logoutServer = useCallback(
      () => {
        logout()
            .then(res => {
                console.log(res)
                if (!res.data.loggedout) {
                    console.log("not logged out")
                } else {
                    console.log("logged out")
                    setconnected(false)
                }
            })
            .catch(error => {
                console.log("error logging out")
            })
      },
      [],
    )
    return (
            <div>
            <Segment inverted>
                <Menu inverted secondary borderless widths={1}>
                    <Menu.Item>
                        <Container textAlign='center'>
                            Dashboard
                        </Container>
                    </Menu.Item>
                </Menu>
            </Segment>
                {!connected?
                    <Segment textAlign='center'>
                        <Header>This is Dashboard by Anthony and Jeremy</Header>
                        <Header>This Epitech project was made with React and Koa</Header>
                        <Header>We have made some really nice widgets for you to use</Header>
                        <Header>We hope you like it</Header>
                        <Header>Just login or sign up to start</Header>
                        <Modal onClose={() => setopen(false)} onOpen={() => setopen(true)} trigger={<Button content={"Login to start"} color={'grey'} size={'massive'}/>} size='mini' open={open}>
                            <Login setConnected={()=>{setconnected(true)}} />
                        </Modal>
                    </Segment>:
                <ErrorBoundary>
                    <WidgetsGrid logout={() => {logoutServer()}}/>
                </ErrorBoundary>}
            </div>
    )
}

export default HomeScreen