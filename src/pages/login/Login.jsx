import React from 'react';
import mainCss from '../../assets/css/main.scss';
import loginCss from './login.scss';
import { Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 10,
            username: '',
            password: ''
        };
    }
    
    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds - 1
        }))
    }
    
    setForm(type, e) {
        if(e.icon === 'user') {
            this.setState(prev => ({
                username: e.value
            }))
        }
        else if(e.icon === 'privacy') {
            this.setState(prev => ({
                password: e.value
            }))
        }
    }

    toLogin() {
        let name = this.state.username
        let passwd = this.state.password

        if(name.length === 0) {
            alert('please enter your account!')
            return
        }
        else if(passwd.length === 0) {
            alert('please enter your password!')
            return
        }
        axios.post('/server/login',{
                username: name,
                password: passwd
        })
            .then((res) =>{
                console.log(res)
            })
            .catch((err) =>{
                console.log(err)
            })
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
    
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    
    render() {
        let text = `${mainCss.textCenter} ${mainCss.textFont}`;
        let timer = `${mainCss.textCenter} ${loginCss.timer}`;
        let linkText = `${mainCss.textCenter} ${mainCss.mt}`;
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
                        <Input icon='user' iconPosition='left' placeholder='your account' onChange={this.setForm.bind(this)}/>
                        <Input icon='privacy' type='password' iconPosition='left' placeholder='your password' onChange={this.setForm.bind(this)}/>
                        <Button color='brown' onClick={this.toLogin.bind(this)}>LOGIN IN</Button>
                    </div>
                    <div className={linkText}>
                        <Link to='/register'>to register ~</Link>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;