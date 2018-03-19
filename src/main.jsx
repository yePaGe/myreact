import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { HashRouter, Route } from 'react-router-dom';
import Routes from './router';

window.axios = axios;

ReactDOM.render((
    <HashRouter>
        {Routes}
    </HashRouter>
), document.getElementById('app'));
