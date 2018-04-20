import React from 'react';
import homeCss from './home.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';
import 'element-theme-default';
import Login from '../../login/Login';
import Regi from '../../register/Register';
import BaiduMap from '../map/Baidumap';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            loginOpen: false,
            isShowAccount: false,
            userList: [],
            searchKey: '',
            accountMsg: {
                img: '',
                name: ''
            }        
        }
    }
    componentWillMount() {
        // 未登录不显示用户信息
        if(!window.sessionStorage.tokenKey) {
            // this.props.history.push('/login')
            this.setState({
                isShowAccount: false,
            })
        }
        else {
            this.setState({
                isShowAccount: true,
                accountMsg: {
                    img: require('../../../assets/img/icon.png'),
                    name: JSON.parse(window.sessionStorage.username).name
                }
            })
        }
    }
    logout() {
        const username = JSON.parse(window.sessionStorage.username).user
        React.axios('/server/logout', {
            params: {
                user: username
            }
        }).then((res) => {
            window.sessionStorage.removeItem('tokenKey')
            window.sessionStorage.removeItem('username')
            this.setState({
                isShowAccount: false
            })
            // setTimeout(() => {
                // 未登录不显示用户信息
                // this.props.history.push('/login')
            //     })
            // }, 1000)
        })
    }
    toSign(type) {
        this.setState({
            dialogOpen: true,
            loginOpen: type == 1 ? false : true 
        })
    }
    getSignMsg(event, type) {
        this.setState({
            dialogOpen: false
        })
        if(!type) {
            if(event.token) {
                this.setState({
                    isShowAccount: true,
                    accountMsg: {
                        img: require('../../../assets/img/icon.png'),
                        name: JSON.parse(window.sessionStorage.username).name
                    }
                })
            }
        }
        else {

        }
    }
    changeSign(type) {
        this.setState({
            loginOpen: type == 1 ? true : false
        })
        console.log('aaaaaaaaa',type, this.state.loginOpen)
    }
    iptValue(e) {
        this.setState({
            searchKey: e.target.value
        })
    }
    toEdit() {
        this.props.history.push('/user')
    }

    render() {
        return(
            <div className={mainCss.main}>
                <div className={homeCss.topBanner}>
                    <div className={homeCss.titleName}>PERSONAL DESIGN</div>
                    {/* <Input icon='search' placeholder='search ... ' size='mini' style={{'height': '40px'}}/> */}
                    {
                        this.state.isShowAccount
                        ?   <div className={mainCss.flexPlay} style={{'width': '320px'}}>
                                <p style={{'marginTop': '10px'}}>hello, {this.state.accountMsg.name}</p>
                                <img src={this.state.accountMsg.img} width='45px' height='45px'/>
                                <ui.Button basic color='green' onClick={this.toEdit.bind(this)}>修改信息</ui.Button>
                                <ui.Button basic color='red' onClick={this.logout.bind(this)}>退出</ui.Button>
                            </div>   
                        :   <div>
                                <ui.Button type='primary' onClick={this.toSign.bind(this, 0)}>登录</ui.Button>
                                <ui.Button type='warning' onClick={this.toSign.bind(this, 1)}>注册</ui.Button>
                                <ui.Dialog
                                    className={homeCss['dialog-bg']}
                                    size="tiny"
                                    visible={ this.state.dialogOpen }
                                    onCancel={ () => this.setState({ dialogOpen: false }) }
                                    lockScroll={ false }>
                                    <ui.Dialog.Body>
                                        {
                                            this.state.loginOpen 
                                            ?   <Login logMsg={this.getSignMsg.bind(this, 0)} toChange={this.changeSign.bind(this)}/>
                                            :   <Regi logMsg={this.getSignMsg.bind(this, 1)} toChange={this.changeSign.bind(this)}/>
                                        }
                                    </ui.Dialog.Body>
                                </ui.Dialog>
                            </div>
                    }
                </div>
                <div className={homeCss.listContent}>
                    {/* <BaiduMap/> */}
                </div>
            </div>
        )
    }
}

export default Home;
