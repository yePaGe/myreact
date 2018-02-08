import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from '../pages/login/Login'; 
import Register from '../pages/register/Register';
import mainCss from '../assets/css/main.scss';

class App extends React.Component{
    render() {
        return (
            <div className={mainCss.container}>
                <Switch>
                    <Route exact path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Redirect from='' to='/login'></Redirect>
                </Switch>             
            </div>
        )
    }
}

const routes = (
    <Route path='/' component={App}></Route>
);

export default routes;