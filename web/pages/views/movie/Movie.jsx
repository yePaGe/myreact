import React from 'react';
import movieCss from './movie.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

import Top from '../../top/Top';

class Movie extends React.Component {
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
                
            </div>
        )
    }
}

export default Movie;