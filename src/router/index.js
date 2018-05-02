import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import Home from '../pages/views/home/Home';
import User from '../pages/views/user/User';
import { History } from 'react-router';

class App extends React.Component{

    componentWillMount() {
        let token = !window.sessionStorage.getItem('token') ? '' : JSON.parse(window.sessionStorage.getItem('token'))
        React.axios.get('/server/islogin',{
            params:{
                key: token
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
                // 未登录不显示用户信息
                window.sessionStorage.removeItem('token')
                window.sessionStorage.removeItem('userMsg')
                // if(this.props.history.location.pathname == '/login') {
                //     return
                // }
                // else {
                //     this.props.history.push('/login')
                // }
            }
        }).catch((err) => {
            // 任何错误都删除登录状态，调整会登录界面
            // 未登录不显示用户信息
            console.log(err)
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('userMsg')
            // this.props.history.push('/login')
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/user' component={User}></Route>
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