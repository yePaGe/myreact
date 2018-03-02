import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { HashRouter, Route } from 'react-router-dom';
import Routes from './router';

window.axios = axios;

let token = !window.sessionStorage.getItem('tokenKey') ? '' : window.sessionStorage.getItem('tokenKey')

axios.get('/server/islogin',{
    params:{
        key: token,
    }
}).then((res) => {
    const data = res.data
    
    let csrfToken
    if(!window.sessionStorage.csrfToken) {
        let getCookie = document.cookie
        let cookie = getCookie.split(';')
        let cookieList = cookie.map((item) => {
            let i = item.split('=')
            let obj = {}
            obj[i[0]] = i[1]
            return obj
        })
    
        csrfToken = cookieList.filter((item) => {
            return Object.keys(item)[0] === 'csrfToken'
        })[0].csrfToken
        window.sessionStorage.setItem('csrfToken', csrfToken)
    }
    else {
        csrfToken = window.sessionStorage.getItem('csrfToken')
    }
    axios.defaults.headers.common['x-csrf-token'] = csrfToken;
    
    if(!data.code) {
        alert(data.msg)
    }
    else {
        alert(data.msg)
    }
}).catch((err) => {
    console.log(err)
})
    


ReactDOM.render((
    <HashRouter>
        {Routes}
    </HashRouter>
), document.getElementById('app'));
