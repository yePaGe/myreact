import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from '../pages/login/Login'; 
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import mainCss from '../assets/css/main.scss';
import { History } from 'react-router';

class App extends React.Component{
    componentWillMount() {
        console.log('aaa')
        if(!window.sessionStorage.getItem('tokenKey')) {
            this.props.history.push('/')
        }
    }
    
    render() {
        return (
            <div className={mainCss.container}>
                <Switch>
                    <Route exact path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Redirect from='/' to='/login'></Redirect>
                </Switch>             
            </div>
        )
    }
}

const routes = (
    <Route path='/' component={App}></Route>
);

export default routes;