import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { HashRouter, Route } from 'react-router-dom';
import Routes from './router';

window.axios = axios;

let token = !window.sessionStorage.getItem('token') ? '' : window.sessionStorage.getItem('token')
axios.get('/server/islogin',{
    params:{
        token: token
    }
}).then((res) => {
    console.log(res)
    let getCookie = document.cookie
    let cookie = getCookie.split(';')
    console.log(cookie)
    let cookieList = cookie.map((item) => {
        let i = item.split('=')
        let obj = {}
        obj[i[0]] = i[1]
        return obj
    })

    let csrfToken = cookieList.filter((item) => {
        return Object.keys(item)[0] === 'csrfToken'
    })[0].csrfToken
    axios.defaults.headers.post['x-csrf-token'] = csrfToken;

}).catch((err) => {
    console.log(err)
})


    


ReactDOM.render((
    <HashRouter>
        {Routes}
    </HashRouter>
), document.getElementById('app'));
