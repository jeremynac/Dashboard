import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';


function connect(uname, pword) {
    return axios.post(process.env.REACT_APP_SERVER_LOGIN, {
        username: uname,
        password: pword
    }, { crossDomain: true });
}

async function signup(uname, pword) {
    return axios.post(process.env.REACT_APP_SERVER_SIGNUP, {
        username: uname,
        password: pword
    }, { crossDomain: true })
}

async function addWidgets(widgets) {
    return axios.post(process.env.REACT_APP_SERVER_WIDGETS, { data: widgets })
}

async function addWidget(widget) {
    return axios.post(process.env.REACT_APP_SERVER_ADD_WIDGET, { data: widget })
}

async function getWidgets() {
    return axios.get(process.env.REACT_APP_SERVER_GET_WIDGETS)
}

async function updateWidget(widget_id) {
    return axios.get(process.env.REACT_APP_SERVER_UPDATE_WIDGET + '/?id=' + widget_id)
}

async function logout() {
    return axios.get(process.env.REACT_APP_SERVER_LOGOUT)
}

async function checkConnected() {
    return axios.get(process.env.REACT_APP_SERVER_CHECK_CONNECTED)
}

async function addGmailToken(token) {
    return axios.post(process.env.REACT_APP_SERVER_GMAIL_TOKEN, { token: token })
}

async function deleteWidget(id) {
    console.log("delete", id)
    return axios.post(process.env.REACT_APP_SERVER_REMOVE_WIDGET, { data: {id: id }})
}
export {
    connect,
    signup,
    updateWidget,
    addWidgets,
    addWidget,
    getWidgets,
    deleteWidget,
    checkConnected,
    logout,
    addGmailToken
}