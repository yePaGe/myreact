import React from 'react';
import mainCss from '../../assets/css/main.scss';
import loginCss from './login.scss';
import { Button, Input } from 'semantic-ui-react';
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
        let text = `${mainCss.textCenter} ${mainCss.textFont}`;
        let timer = `${mainCss.textCenter} ${loginCss.timer}`;
        return(
            <div className={mainCss.main}>
                <div className={timer}>
                    {this.state.seconds}
                </div>
                <div className={loginCss.loginCon}>
                    <p className={text}>
                        welcome, let's login!
                    </p>
                    <div className={loginCss.formCon}>
                        <Input icon='user' iconPosition='left' placeholder='your account'/>
                        <Input icon='privacy' iconPosition='left' placeholder='your password'/>
                        <Button color='brown'>Brown</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;