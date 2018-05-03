import React from 'react';
import topCss from './top.scss';
import mainCss from '../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';
import 'element-theme-default';
import Login from '../login/Login';
import Regi from '../register/Register';

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            loginOpen: false,
            isShowAccount: false,
            accountMsg: {
                img: '',
                name: ''
            },
            topLogo: require('../../assets/img/y-logo.png'),
            carouselStyle: '',
            showBtn: false
        }
    }
    componentWillMount() {
        // 未登录不显示用户信息
        if(!window.sessionStorage.token) {
            this.setState({
                isShowAccount: false,
            })
        }
        else {
            let userMsg = JSON.parse(window.sessionStorage.userMsg)
            if(userMsg.logo.length == 0) {
                this.setState({
                    isShowAccount: true,
                    accountMsg: {
                        img: require('../../assets/img/inlog.png'),
                        name: userMsg.name
                    }
                })
            }
            else {
                this.setState({
                    isShowAccount: true,
                    accountMsg: {
                        img: userMsg.logo,
                        name: userMsg.name
                    }
                })
            }
        }
    }
    logout() {
        const username = JSON.parse(window.sessionStorage.userMsg).name
        React.axios('/server/logout', {
            params: {
                user: username
            }
        }).then((res) => {
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('userMsg')
            this.setState({
                isShowAccount: false
            })
            window.location.reload()
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错~~~')
        })
    }
    toSign(type) {
        this.setState({
            dialogOpen: true,
            loginOpen: type == 1 ? false : true 
        })
    }
    getSignMsg(type, event) {
        if(!type) {
            this.setState({
                dialogOpen: false,
                isShowAccount: true,
                accountMsg: {
                    img: JSON.parse(window.sessionStorage.userMsg).logo,
                    name: JSON.parse(window.sessionStorage.userMsg).name
                }
            })
        }
        else if(type == 1) {
            if(event == 1) {
                this.setState({
                    dialogOpen: false
                })
            }
            else {
                this.setState({
                    loginOpen: true
                })
                ui.Message.success('注册成功，请登录新账号~~~')
            }
        }
    }
    changeSign(type) {
        this.setState({
            loginOpen: type == 1 ? true : false
        })
    }
    toEdit() {
        this.props.toEdit()
    }
    changeCarousel(type, router) {
        if(type == 1) {
            this.setState({
                carouselStyle: `${topCss.carousel} ${topCss['car-hide']}`
            })
            if(router == '/user') {
                this.setState({
                    showBtn: true
                })
            }
        }
        else if(type == 2) {
            this.setState({
                carouselStyle: `${topCss.carousel} ${topCss['car-show']}`
            })
        }
    }
    backHome() {
        this.props.back()
    }
    render() {
        const tips = `${mainCss.mr20} ${mainCss.gray}`
        return(
            <div className={this.state.carouselStyle}>
                {
                    this.state.showBtn
                    ?   <div className={topCss['back-btn']}>
                            <ui.Tooltip className="item" effect="dark" content="返回首页" placement="right">
                                <i className='el-icon-d-arrow-left' onClick={this.backHome.bind(this)}></i>
                            </ui.Tooltip>
                        </div>
                    :   <div></div>
                }
                <div className={topCss.topBanner}>
                    <div className={topCss.titleName}>
                        <img src={this.state.topLogo} width='50px' height='50px'/>
                        PERSONAL
                    </div>
                    {
                        this.state.isShowAccount
                        ?   <div>
                                <ui.Popover placement="left-start" width="200" trigger="hover" content={(
                                    <div>
                                        <span className={tips} style={{'padding':'0 0 20px', 'display': 'inline-block'}}>hello, {this.state.accountMsg.name}</span>
                                        <img className={topCss.logo} src={this.state.accountMsg.img}/>
                                        <ui.Button type='primary' size='mini' onClick={this.toEdit.bind(this)}>修改信息</ui.Button>
                                        <ui.Button type='danger' size='mini' onClick={this.logout.bind(this)}>退出</ui.Button>
                                    </div>
                                )}>
                                    <div className={topCss['login-logo']}></div>
                                </ui.Popover>
                                
                            </div>   
                        :   <div>
                                <div className={topCss['outlog-logo']} onClick={this.toSign.bind(this, 0)}></div>
                                <ui.Dialog
                                    className={topCss['dialog-bg']}
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
            </div>
        )
    }
}

export default Top;
