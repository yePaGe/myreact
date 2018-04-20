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
            name: ''
        };
    }
    
    setForm(type, e) {
        if(e.icon === 'user') {
            this.setState({
                username: e.value
            })
        }
        else if(e.icon === 'privacy') {
            this.setState({
                password: e.value
            })
        }
        else if(e.icon === 'address book outline') {
            this.setState({
                name: e.value
            })
        }
    }

    toRegister() {
        const username = this.state.username
        const passwd = this.state.password
        const name = this.state.name

        if(name.length === 0) {
            alert('please enter your account!')
            return
        }
        else if(passwd.length === 0) {
            alert('please enter your password!')
            return
        }
        else if(name.length === 0) {
            alert('please enter your name!')
            return
        }
        React.axios.post('/server/users/add',{
                username: username,
                password: passwd,
                name: name
        })
            .then((res) =>{
                console.log(res)
                this.props.logMsg(res)
            })
            .catch((err) =>{
                console.log(err)
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
                    <ui.Icon name='remove' onClick={this.props.closeModel} style={{'float': 'right', 'cursor': 'pointer'}}/>
                    <p className={text}>
                        welcome, let's register!
                    </p>
                    <div className={registerCss.formCon}>
                        <ui.Input icon='address book outline' placeholder='your name' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Input icon='user' placeholder='your account' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Input icon='privacy' type='password' placeholder='your password' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <ui.Button type='warning' onClick={this.toRegister.bind(this)}>REGISTER</ui.Button>
                        <ui.Button type='text' onClick={this.toChange.bind(this)}>已有帐号，去登陆~~</ui.Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;