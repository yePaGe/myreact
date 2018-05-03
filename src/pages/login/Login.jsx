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
            email: '',
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
        if(type == 1) {
            this.setState({
                email: e
            })
        }
        else if(type == 2) {
            this.setState({
                password: e
            })
        }
    }

    toLogin() {
        let email = this.state.email
        let passwd = this.state.password
        const emailStyle = /^[0-9a-zA-Z]+@[0-9a-z]+.[a-z]+$/
        if(email.length === 0) {
            ui.Message.error('please enter your account email!')
            return
        }
        if(emailStyle.test(email) != true) {
            ui.Message.error('please enter correct email~~~')
            return
        }
        if(passwd.length === 0) {
            ui.Message.error('please enter your password!')
            return
        }
        React.axios.post('/server/login', {
            email: email,
            password: passwd
        })
            .then((res) =>{
                const data = res.data
                ui.Message({
                    type: data.code == 0 ? 'success' : 'error',
                    message: data.msg
                })
                if(data.code == 0) {
                    let token =  data.token;
                    let userMsg = {
                        logo: data.logo,
                        name: data.username,
                        email: data.email
                    }
                    window.sessionStorage.setItem('token', token)
                    window.sessionStorage.setItem('userMsg', JSON.stringify(userMsg))
                    this.props.logMsg(token)
                }
            })
            .catch((err) =>{
                console.log(err)
                ui.Message.error('服务器出错~~~')
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
    render() {
        const text = `${mainCss.textCenter} ${mainCss.textFont}`;
        const timer = `${mainCss.textCenter} ${loginCss.timer}`;
        const linkText = `${mainCss.textCenter} ${mainCss.mt}`;
        const mainContent = `${mainCss.main} ${loginCss.loginBg}`;
 
        return(
            <div className={mainContent}>
                <div className={loginCss.loginCon}>
                    <p className={text}>
                        welcome, let's login!
                    </p>
                    <div className={loginCss.formCon}>
                        <ui.Input placeholder='your account email' onChange={this.setForm.bind(this, 1)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Input type='password' placeholder='your password' onChange={this.setForm.bind(this, 2)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Button type='warning' onClick={this.toLogin.bind(this)}>LOGIN IN</ui.Button>
                        <ui.Button type='text' onClick={this.toChange.bind(this)}>未有帐号，去注册~~~</ui.Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;