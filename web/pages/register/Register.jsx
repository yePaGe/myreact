import React from 'react';
import mainCss from '../../assets/css/main.scss';
import registerCss from './register.scss';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        };
    }
    
    setForm(type, e) {
        if(type == 1) {
            this.setState({
                username: e
            })
        }
        else if(type == 2) {
            this.setState({
                email: e
            })
        }
        else if(type == 3) {
            this.setState({
                password: e
            })
        }
    }

    toRegister() {
        const username = this.state.username
        const passwd = this.state.password
        const email = this.state.email
        const emailSize = /^[A-Za-z0-9]+@[a-z0-9]+.[a-z]{2,5}$/
        if(username.length === 0) {
            ui.Message.error('please enter your account!')
            return
        }
        if(email.length === 0) {
            ui.Message.error('please enter your email!')
            return
        }
        if(emailSize.test(email) == false) {
            ui.Message.error('please enter correct email!')
            return
        }
        if(passwd.length === 0) {
            ui.Message.error('please enter your password!')
            return
        }
        React.axios.post('/server/users/add',{
                username: username,
                password: passwd,
                email: email
        }).then((res) =>{
                ui.Message({
                    type: !res.data.code ? 'success' : 'error',
                    message: res.data.msg
                })
                if(res.data.code != 0) {
                    this.setState({
                        username: '',
                        password: '',
                        email: ''
                    })
                }
                else {
                    this.props.logMsg(res.data.code)
                }
            })
    }
    toChange() {
        this.props.toChange(1)
    }
    handleEnter(event) {
        if(event.keyCode == 13) {
            this.toRegister()
        }
    }
    
    render() {
        let text = `${mainCss.textCenter} ${mainCss.textFont}`;
        let timer = `${mainCss.textCenter} ${registerCss.timer}`;
        let linkText = `${mainCss.textCenter} ${mainCss.mt}`;

        return(
            <div className={mainCss.main}>
                <div className={registerCss.regiCon}>
                    <p className={text}>
                        welcome, let's register!
                    </p>
                    <div className={registerCss.formCon}>
                        <ui.Input placeholder='your name' onChange={this.setForm.bind(this, 1)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Input placeholder='your email account' onChange={this.setForm.bind(this, 2)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Input type='password' placeholder='your password' onChange={this.setForm.bind(this, 3)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Button type='warning' onClick={this.toRegister.bind(this)}>REGISTER</ui.Button>
                        <ui.Button type='text' onClick={this.toChange.bind(this)}>已有帐号，去登陆~~</ui.Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;