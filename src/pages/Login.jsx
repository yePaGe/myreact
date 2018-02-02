import React from 'react';
import mainCss from '../assets/css/main.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 10
        };
    }
    
    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds - 1
        }))
    }
    
    componentDidMount() {
        this.interval = setInterval(() => {
            if(this.state.seconds <= 0) {
                clearInterval(this.interval);
                return
            }
            this.tick()
        }, 1000);
    }
    
    componentWillMount() {
        clearInterval(this.interval)
    }
    
    render() {
        return(
            <div className={mainCss.main}>
            sfsdagfsdgd
                {this.state.seconds === 0 ? 'finish' : this.state.seconds}
            </div>
        )
    }
}

export default Login;