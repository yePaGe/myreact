import React from 'react';
import homeCss from './home.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';
import 'element-theme-default';
import Top from '../../top/Top';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                  
        }
    }
    componentWillMount() {

    }

    render() {

        return(
            <div className={mainCss.main}>
                <div className={homeCss.carousel}>
                    <Top/>
                    <div className={mainCss.container}></div>
                </div>
            </div>
        )
    }
}

export default Home;
