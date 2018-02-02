import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login';

ReactDOM.render((
    <BrowserRouter>
        <Route path='/' component={Login}/>
    </BrowserRouter>
    ), document.getElementById('app'));