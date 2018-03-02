import React from 'react';
import homeCss from './home.scss';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
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
