import React from 'react';
import mainCss from '../../assets/css/main.scss';
import loginCss from './login.scss';
import { Link } from 'react-router-dom';
import { History } from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 10,
            username: '',
            password: '',
            msg: 'not login',
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
        React.axios.post('/server/login',{
            username: name,
            password: passwd
        })
            .then((res) =>{
                const data = res.data
                if(data.code == 0) {
                    let token = {
                        name: data.user,
                        token: data.token
                    }
                    const adname = {
                        user: data.user,
                        name: data.name
                    }
                    window.sessionStorage.setItem('tokenKey', JSON.stringify(token))
                    window.sessionStorage.setItem('username', JSON.stringify(adname))            
                    token.code = data.code
                    token.msg = data.msg
                    this.props.logMsg(token)
                }
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    handleEnter(event) {
        if(event.keyCode == 13) {
            this.toLogin()
        }
    }
    toChange() {
        this.props.toChange(0)
    }

    componentDidMount() {
     
    }
    
    componentWillUnmount() {
    }
    
    render() {
        const text = `${mainCss.textCenter} ${mainCss.textFont}`;
        const timer = `${mainCss.textCenter} ${loginCss.timer}`;
        const linkText = `${mainCss.textCenter} ${mainCss.mt}`;
        const mainContent = `${mainCss.main} ${loginCss.loginBg}`;
 
        return(
            <div className={mainContent}>
                <div className={loginCss.loginCon}>
                    <ui.Icon name='remove' onClick={this.props.closeModel} style={{'float': 'right', 'cursor': 'pointer'}}/>
                    <p className={text}>
                        welcome, let's login!
                    </p>
                    <div className={loginCss.formCon}>
                        <ui.Input icon='user' placeholder='your account' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Input icon='privacy' type='password' placeholder='your password' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Button type='warning' onClick={this.toLogin.bind(this)}>LOGIN IN</ui.Button>
                        <ui.Button type='text' onClick={this.toChange.bind(this)}>未有帐号，去注册~~~</ui.Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;