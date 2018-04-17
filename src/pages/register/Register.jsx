import React from 'react';
import mainCss from '../../assets/css/main.scss';
import registerCss from './register.scss';
import { Button, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
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

    toRegister() {
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
        React.axios.post('/server/users/add',{
                username: name,
                password: passwd
        })
            .then((res) =>{
                console.log(res)
                this.props.logMsg(res)
            })
            .catch((err) =>{
                console.log(err)
            })
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
                <div className={registerCss.loginCon}>
                    <Icon name='remove' onClick={this.props.closeModel} style={{'float': 'right', 'cursor': 'pointer'}}/>
                    <p className={text}>
                        welcome, let's register!
                    </p>
                    <div className={registerCss.formCon}>
                        <Input icon='user' iconPosition='left' placeholder='your account' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <Input icon='privacy' type='password' iconPosition='left' placeholder='your password' onChange={this.setForm.bind(this)} onKeyUp={this.handleEnter.bind(this)}/>
                        <Button color='brown' onClick={this.toRegister.bind(this)}>REGISTER</Button>
                    </div>
                    {/* <div className={linkText}>
                        <Link to='/login' className={mainCss.yellow}>Back to Login!</Link>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Register;