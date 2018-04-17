import React from 'react';
import homeCss from './home.scss';
import mainCss from '../../../assets/css/main.scss';

import { Table, Icon, Button, Input, Card, Image, Modal } from 'semantic-ui-react';

import { Link, History } from 'react-router-dom';

import Login from '../../login/Login';
import Regi from '../../register/Register';
import Msg from '../../msg/Msg';
import BaiduMap from '../map/Baidumap';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginOpen: false,
            regiOpen: false,
            isShowMsg: {
                isShow: false,
                type: 'success',
                msg: ''
            },
            isShowAccount: false,
            userList: [],
            searchKey: '',
            accountMsg: {
                img: require('../../../assets/img/icon.png'),
                name: window.sessionStorage.getItem('username')
            },
            
        }
    }
    componentWillMount() {
        // 未登录不显示用户信息
        if(!window.sessionStorage.tokenKey) {
            // this.props.history.push('/login')
            this.setState({
                isShowAccount: false
            })
        }
        else {
            this.setState({
                isShowAccount: true
            })
        }
    }
    logout() {
        const username = window.sessionStorage.username
        React.axios('/server/logout', {
            params: {
                user: username
            }
        }).then((res) => {
            this.setState({
                isShowMsg:{
                    isShow: true,
                    msg: res.data.msg,
                    type: res.data.code == 0 ? 'success' : 'error'
                }
            })
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
            setTimeout(() => {
                this.setState({
                    isShowMsg:{
                        isShow: false
                    } 
                })
            }, 1500)
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
        console.log(type)
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
        console.log(event)
        if(event.token) {
            this.setState({
                isShowMsg:{
                    isShow: true,
                    msg: event.msg,
                    type: event.code == 0 ? 'success' : 'error'
                },
                isShowAccount: true
            })
            setTimeout(() => {
                this.setState({
                    isShowMsg:{
                        isShow: false
                    }
                })
            }, 1500)
        }
    }
    getRegiMsg(event) {
        console.log(event)
        this.setState({
            isShowMsg:{
                isShow: true,
                msg: event.data.msg,
                type: event.data.code == 0 ? 'success' : 'error'
            },
            regiOpen: false
        })
        setTimeout(() => {
            this.setState({
                isShowMsg:{
                    isShow: false
                }
            })
        }, 1500)
    }
    iptValue(e) {
        console.log(e.target.value)
        this.setState({
            searchKey: e.target.value
        })
    }

    render() {
        return(
            <div className={mainCss.main}>
                <div >
                    <Msg msg={this.state.isShowMsg}/>
                </div>
                <div className={homeCss.topBanner}>
                    <div className={homeCss.titleName}>PERSONAL DESIGN</div>
                    {/* <Input icon='search' placeholder='search ... ' size='mini' style={{'height': '40px'}}/> */}
                    {
                        this.state.isShowAccount
                        ?   <Card>
                                <Card.Content>
                                    <Image floated='right' size='mini' src={this.state.accountMsg.img} />
                                    <Card.Header>
                                        {this.state.accountMsg.name}
                                    </Card.Header>
                                    <Card.Description>
                                        登录有效期：<strong>best friends</strong>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                    <Button basic color='green'>修改密码</Button>
                                    <Button basic color='red' onClick={this.logout.bind(this)}>退出</Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        :   <div>
                                <Button color='olive' onClick={this.toSign.bind(this, 0)}>登录</Button>
                                <Modal
                                    open={this.state.loginOpen}
                                    basic
                                    size='small'>
                                    <Login logMsg={this.getLoginMsg.bind(this)} closeModel={this.closeModel.bind(this, 0)}/>
                                </Modal>
                                <Button basic color='yellow' onClick={this.toSign.bind(this,1)}>注册</Button>
                                <Modal
                                    open={this.state.regiOpen}
                                    basic
                                    size='small'>
                                    <Regi logMsg={this.getRegiMsg.bind(this)} closeModel={this.closeModel.bind(this, 1)}/>
                                </Modal>
                            </div>
                    }
                </div>
                <div className={homeCss.listContent}>
                    <BaiduMap/>
                </div>
            </div>
        )
    }
}

export default Home;
