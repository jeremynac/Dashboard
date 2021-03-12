import React, { useCallback, useState } from 'react'
import {connect, signup} from './Api.jsx'
import {Form, Message, Button, Header, Segment} from 'semantic-ui-react'

function Login(props) {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [status, setstatus] = useState(0)

    function LoginMessage(props) {
        switch(status) {
            case -1:
                return <Message compact negative>Wrong password</Message>
            case 0:
                return (null)
            case 1:
                return <Message compact positive width={4}>Hello {username} you are connected</Message>
            case 2:
                return <Message compact warning width={4}> User {username} does not exist, please sign up</Message>
            case 3:
                return <Message compact negative width={4}>We have encountered an error, please try again</Message>
            case 4:
                return <Message compact warning width={4}>Couldn't sign you up: {username} already exists, please log in</Message>
            case 5:
                return <Message compact positive width={4}>Welcome {username}, you are signed up ! Please log in</Message>
            default:
                return (null)
        }
    }

    const setConnected = useCallback(() => {
        props.setConnected()
    }, [props])

    const tryConnect = useCallback((e) => {
        e.preventDefault();
        connect(username, password)
            .then(
                res => {
                    if (res.data.connected === true) {
                        console.log('connected')
                        setstatus(1)
                        setConnected()
                    }
                    else if (res.data.exists === false){
                        console.log('please signup')
                        setstatus(2)
                    }
                    else if (res.data.error === false){
                        console.log('wrong password')
                        setstatus(-1)
                    }
                    else{
                        console.log("server error")
                        setstatus(3)
                    }
                }
            )
            .catch(error=> {
                console.log("error reaching server", error)
                setstatus(3)
            })
    }, [setConnected, username, password])
    const trySignup = (e) => {
        e.preventDefault();
        signup(username, password)
            .then(
                res => {
                    if (res.data.signedup) {
                        console.log('signed up')
                        setstatus(5)
                    }
                    else if (res.data.exists){
                        setstatus(4)
                        console.log('already exist')
                    }
                    else {
                        setstatus(3)
                        console.log('error')
                    }
                }
            )
            .catch(error=>{
                setstatus(3)
                console.log("error reaching server", error)
            })
    }
    return (
            <Segment clearing>
                <Header color='grey'>
                    Welcome ! Login or register
                </Header>
                <Form onSubmit={tryConnect}>
                    <Form.Field>
                        <input placeholder='username' type = "text" name = "username" value = {username} onChange = {(e)=>setusername(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='password' type = "text" name = "password" value = {password} onChange = {(e)=>setpassword(e.target.value)} />
                    </Form.Field>
                    <Button primary type = "submit">
                        login
                    </Button>
                    <Button secondary onClick={(e)=>{trySignup(e)}}>
                        register
                    </Button>
                </Form>
                <LoginMessage />
            </Segment>
    )
}
export default Login