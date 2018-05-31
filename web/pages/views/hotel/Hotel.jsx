import React from 'react';
import hotelCss from './hotel.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

import Top from '../../top/Top';

class Hotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount() {
       
    }
    componentDidMount() {
        this.refs.carStyle.changeCarousel(1)
    }
    changeRoute(e) {
        this.props.history.push(e)
    }
    render() {
        return(
            <div className={mainCss.main}>
                <Top changeRoute={this.changeRoute.bind(this)} ref='carStyle'/>
                <h1 style={{'marginTop': '150px'}}>hotel</h1>
            </div>
        )
    }
}

export default Hotel;