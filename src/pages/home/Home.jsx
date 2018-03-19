import React from 'react';
import homeCss from './home.scss';
import { Link, History } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log('aa')
        if(!window.sessionStorage.tokenKey) {
            this.props.history.push('/login')
        }
    }

    render() {
        return(
            <div>
                <Link to='/login'>back to login</Link>
                Home Here~
            </div>
        )
    }
}

export default Home;
