import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from '../pages/login/Login'; 
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import mainCss from '../assets/css/main.scss';
import { History } from 'react-router';

class App extends React.Component{

    componentWillMount() {
        let tokenKey = !window.sessionStorage.getItem('tokenKey') ? '' : JSON.parse(window.sessionStorage.getItem('tokenKey'))
        React.axios.get('/server/islogin',{
            params:{
                key: tokenKey.token,
            }
        }).then((res) => {
            const data = res.data   
            let csrfToken = ''
            // csrfToken 的存储
            if(!window.sessionStorage.csrfToken) {
                let getCookie = document.cookie
                let cookie = getCookie.split(';')
                let cookieList = cookie.map((item) => {
                    let i = item.split('=')
                    let obj = {}
                    obj[i[0]] = i[1]
                    let name = Object.keys(obj)[0].trim()
                    if(name == 'csrfToken') {
                        csrfToken = Object.values(obj)[0]
                        window.sessionStorage.setItem('csrfToken', csrfToken)
                    }
                    return obj
                })           
            }
            else {
                csrfToken = window.sessionStorage.getItem('csrfToken')
            }
            // 给post请求带上csrfToken
            React.axios.defaults.headers.post['x-csrf-token'] = csrfToken;
            
            console.log('res',data)
            if(!data.code) { // 已登录就调转到当前路由的页面
                console.log(data.msg)
            }
            else { // 未登录就跳转回登录界面
                window.sessionStorage.removeItem('tokenKey')
                if(this.props.history.location.pathname == '/login') {
                    return
                }
                else {
                    this.props.history.push('/login')
                }
            }
        }).catch((err) => {
            // 任何错误都删除登录状态，调整会登录界面
            console.log(err)
            window.sessionStorage.removeItem('tokenKey')
            this.props.history.push('/login')
        })
    }

    render() {
        return (
            <div className={mainCss.container}>
                <Switch>
                    <Route exact path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Redirect from='/' to='/home'></Redirect>
                </Switch>             
            </div>
        )
    }
}

const routes = (
    <Route path='/' component={App}></Route>
);

export default routes;