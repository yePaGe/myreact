import React from 'react';
import mainCss from '../../assets/css/main.scss';
import loginCss from './login.scss';
import { Button, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { History } from 'react-router';

import Msg from '../msg/Msg'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 10,
            username: '',
            password: '',
            msg: 'not login',
            // isShowMsg: {
            //     isShow: false,
            //     type: 'success',
            //     msg: ''
            // }
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
                    window.sessionStorage.setItem('tokenKey', JSON.stringify(token))
                    window.sessionStorage.setItem('username', data.user)              
                    // setTimeout(() => {
                    //     this.props.history.push('/home')
                    // }, 500)
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
                    <Icon name='remove' onClick={this.props.closeModel} style={{'float': 'right', 'cursor': 'pointer'}}/>
                    <p className={text}>
                        welcome, let's login!
                    </p>
                    <div className={loginCss.formCon}>
                        <Input icon='user' iconPosition='left' placeholder='your account' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <Input icon='privacy' type='password' iconPosition='left' placeholder='your password' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <Button color='brown' onClick={this.toLogin.bind(this)}>LOGIN IN</Button>
                    </div>
                    {/* <div className={linkText}>
                        <Link to='/register' className={mainCss.yellow}>to register ~</Link>  
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Login;