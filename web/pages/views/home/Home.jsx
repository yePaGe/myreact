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
    componentDidMount() {
        console.log(this.props)
        this.refs.carStyle.changeCarousel(2)
    }
    toEdit() {
        this.props.history.push('/user')
    }
    navDetail(url, e) {
        this.props.history.push(url)
    }
    render() {

        return(
            <div className={mainCss.main}>
                <Top ref='carStyle' toEdit={this.toEdit.bind(this)} navDetail={this.navDetail.bind(this)}/>
                <div className={mainCss.container}></div>
            </div>
        )
    }
}

export default Home;
