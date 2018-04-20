import React from 'react';
import homeCss from './home.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

import Login from '../../login/Login';
import Regi from '../../register/Register';
import BaiduMap from '../map/Baidumap';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginOpen: false,
            regiOpen: false,
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
        if(!type) {
            this.setState({
                loginOpen: true
            })
        }
        else {
            this.setState({
                regiOpen: true
            })
        }
    }
    closeModel(type) {
        if(!type) {
            this.setState({
                loginOpen: false
            })
        }
        else {
            this.setState({
                regiOpen: false
            })
        }
    }
    getLoginMsg(event) {
        this.setState({
            loginOpen: false
        })
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
    getRegiMsg(event) {
        this.setState({
            regiOpen: false
        })
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
                                {/* <ui.Dialog
                                    title="提示"
                                    size="tiny"
                                    visible={ this.state.loginOpen }
                                    onCancel={ () => this.setState({ loginOpen: false }) }
                                    lockScroll={ false }
                                > */}
                                    {/* <ui.Dialog.Body>
                                    <span>这是一段信息</span>
                                    </ui.Dialog.Body>
                                    <ui.Dialog.Footer className="dialog-footer">
                                    <ui.Button onClick={ () => this.setState({ loginOpen: false }) }>取消</ui.Button>
                                    <ui.Button type="primary" onClick={ () => this.setState({ loginOpen: false }) }>确定</ui.Button>
                                    </ui.Dialog.Footer> */}
                                {/* </ui.Dialog> */}
                                {/* <ui.Modal
                                    open={this.state.loginOpen}
                                    basic
                                    size='small'>
                                    <Login logMsg={this.getLoginMsg.bind(this)} closeModel={this.closeModel.bind(this, 0)}/>
                                </ui.Modal> */}
                                <ui.Button type='warning' onClick={this.toSign.bind(this,1)}>注册</ui.Button>
                                {/* <ui.Modal
                                    open={this.state.regiOpen}
                                    basic
                                    size='small'>
                                    <Regi logMsg={this.getRegiMsg.bind(this)} closeModel={this.closeModel.bind(this, 1)}/>
                                </ui.Modal> */}
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
