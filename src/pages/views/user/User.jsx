import React from 'react';
import userCss from './user.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

import Top from '../../top/Top';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showTable: false,
            searchKey: '',
            columns: [
                {
                    prop: 'tokenId',
                    label: 'Token ID',
                    align: 'center'
                },
                {
                    prop: 'username',
                    label: '用户名',
                    align: 'center'
                },
                {
                    prop: 'email',
                    label: '邮箱地址',
                    align: 'center'
                },
                {
                    prop: 'createDate',
                    label: '创建时间',
                    align: 'center'
                },
                {
                    prop: 'lastLogin',
                    label: '最后登录时间',
                    align: 'center'
                },
                {
                    prop: 'edit',
                    label: '操作',
                    width: '150',
                    align: 'center',
                    render: (e) => {
                        if(e.isCur == true) {
                            return <span><ui.Button type="text" size="small" onClick={this.delUser.bind(this)}>移除</ui.Button></span>
                        }
                        else {
                            return <span>
                                <ui.Button size='mini' icon='delete' type='danger' onClick={this.delUser.bind(this, e.id)}></ui.Button>
                                <ui.Button type="text" size="small" onClick={this.delUser.bind(this)}>移除</ui.Button>
                            </span>
                        }
                    }
                }
            ],
            userList: [],
            tabOne: `${userCss['tab-contain']} ${userCss['tab-active']}`,
            tabTwo: `${userCss['tab-contain']}`,
            tabThree: `${userCss['tab-contain']}`,
            currentTab: 1,
            account: {
                _id: '',
                email: '',
                createDate: '',
                lastLogin: ''
            },
            logo: '',
            username: '',
            hasEdit: false,
            oldpwd: '',
            oldCheck: 0,
            newpwd: '',
            newCheck: 0,
            secpwd: '',
            secCheck: 0
        }
    }
    componentWillMount() {
        if(!window.sessionStorage.token) {
            this.props.history.push('/home')
            return
        }
    }
    componentDidMount() {
        this.refs.carStyle.changeCarousel(1, '/user')
        setTimeout(() => {
            this.setState({
                showTable: true
            })
        }, 500)
        this.getUserList()     
    }
    getUserList() {
        React.axios('/server/users/list').then((res) => {
            if(!res.data.code) {
                const curEmail = JSON.parse(window.sessionStorage.userMsg).email
                console.log(curEmail)
                let list = res.data.list.map((i) => {
                    if(i.email == curEmail) {
                        i.isCur = true
                    }
                    else {
                        i.isCur = false
                    }
                    return i
                })
                this.setState({
                    userList: list
                })
            }
            this.setState({
                loading: false
            })
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错~~~')
        })
    }
    delUser(id) {
        this.setState({
            loading: true
        })
        console.log('deluser')
        React.axios('/server/users/del', {
            params: {
                id: id
            }
        }).then((res) => {
            const data = res.data
            this.getUserList()
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错~~~')
        })
    }
    changeTab(type) {
        this.setState({
            tabOne: type == 1 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
            tabTwo: type == 2 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
            tabThree: type == 3 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
            currentTab: type
        })
        if(type == 2) {
            React.axios('/server/users/search', {
                params: {
                    email: JSON.parse(window.sessionStorage.userMsg).email
                }
            }).then((res) => {
                this.setState({
                    account: res.data.list[0],
                    logo: res.data.list[0].logo,
                    username: res.data.list[0].username
                })
            }).catch((err) => {
                console.log(err)
                ui.Message.error('服务器出错~~~')
            })
        }
    }
    openLogo() {
        console.log('adsaf')
        let iptObj = document.getElementById('logo-ipt');
        iptObj.click();
    }
    uploadLogo() {
        let iptObj = document.getElementById('logo-ipt').files;
        let formD = new FormData();
        formD.append('name', 'shazizaina。。。')
        formD.append('imgfile', iptObj[0]);
        React.axios.post('/server/upload/img', formD)
            .then((res) => {
                console.log('okupload', res)
                this.setState({
                    logo: res.data.url,
                    hasEdit: true
                })
            })
            .catch((err) => {
                console.log(err)
                ui.Message.error('服务器出错~~~')
            })
    }
    editIpt(type, e) {
        if(!type) {
            this.setState({
                username: e,
                hasEdit: true
            })
        }
        else if (type == 1) {
            this.setState({
                oldpwd: e
            })
        }
        else if (type == 2) {
            this.setState({
                newpwd: e
            })
            let level1 = /[0-9a-z]/g
            let level2 = /[A-Z]/g
            let level3 = /[,._]/g
            const l1 = level1.test(e)
            const l2 = level2.test(e)
            const l3 = level3.test(e)
            if(e.length >= 6 && e.length < 17) {
                if(l1 || l2 || l3) {
                    if(l1 && l2 && l3) {
                        this.setState({
                            newCheck: 3
                        })
                    }
                    else {
                        if((l1 && l2) || (l1 && l3) || (l2 && l3)) {
                            this.setState({
                                newCheck: 2
                            })
                        }
                        else {
                            this.setState({
                                newCheck: 1
                            })
                        }
                    }
                }
                else {
                    this.setState({
                        newCheck: 4
                    })
                    ui.Message.error('新密码请输入正确格式~~~')
                }
            }
        }
        else if (type == 3) {
            this.setState({
                secpwd: e
            })
        }
    }
    checkPwd(type) {
        if(type == 1) {
            React.axios.post('/server/pwd/check', {
                email: JSON.parse(window.sessionStorage.userMsg).email,
                pwd: this.state.oldpwd
            }).then((res) => {
                if(!res.data.code) {
                    this.setState({
                        oldCheck: 1
                    })
                }
                else {
                    ui.Message.error('原密码不正确~~~')
                    this.setState({
                        oldCheck: 2
                    })
                }
            }).catch((err) => {
                console.log(err)
                ui.Message.error('服务器出错~~~')
            })
        }
        else if(type == 2) {
            if(this.state.newpwd.length < 6 || this.state.newpwd.length >= 17) {
                this.setState({
                    newCheck: 4
                })
                ui.Message.error('新密码长度应为6-16个字符！')
            }
        }
        else if(type == 3) {
            if(this.state.newpwd != this.state.secpwd) {
                ui.Message.error('两次输入的密码不一致~~！')
                this.setState({
                    secCheck: 2
                })
            }
            else if(this.state.newpwd == this.state.secpwd) {
                this.setState({
                    secCheck: 1
                })
            }
        }
    }
    savePwd() {
        if(!this.state.oldpwd) {
            ui.Message.warning('请输入原密码~~~')
            return
        }
        if(!this.state.newpwd) {
            ui.Message.warning('请输入新密码~~~')
            return
        }
        if(!this.state.secpwd) {
            ui.Message.warning('请再次输入新密码~~~')
            return
        }
        React.axios.post('/server/pwd/edit', {
            email: JSON.parse(window.sessionStorage.userMsg).email,
            pwd: this.state.newpwd
        }).then((res) => {
            if(!res.data.code) {
                ui.Message.success('密码修改成功~~~')
            }
            else {
                ui.Message.error('密码修改失败~~~')
            }
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错~~~')
        })
    }
    saveEdit() {
        console.log(this.state.logo, this.state.username, this.state.hasEdit)
        
        if(this.state.hasEdit == false) {
            ui.Message.warning('并没作任何修改，无需保存~~')
        }
        React.axios.post('/server/users/edit', {
            id: this.state.account._id,
            logo: this.state.logo,
            username: this.state.username
        }).then((res) => {
                if(!res.data.code) {
                    const data = JSON.parse(res.data.msg)
                    ui.Message.success('修改成功')
                    const userMsg = {
                        logo: data.logo,
                        name: data.username,
                        email: data.email
                    }
                    window.sessionStorage.userMsg = JSON.stringify(userMsg)
                    window.location.reload()
                }
                else {
                    ui.Message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错~~~')
        })
    }
    backHome() {
        this.props.history.push('/home')
    }

    render() {
        let oldCheck = this.state.oldCheck == 0 ? '' : this.state.oldCheck == 1 ? `el-icon-circle-check ${userCss.suc}` : `el-icon-circle-close ${userCss.err}` 
        let newCheck = this.state.newCheck == 0 ? '' : this.state.newCheck == 1 ? userCss.level1 : this.state.newCheck == 2 ? userCss.level2 : this.state.newCheck == 3 ? userCss.level3 : `el-icon-circle-close ${userCss.err}`
        let secCheck = this.state.secCheck == 0 ? '' : this.state.secCheck == 1 ? `el-icon-circle-check ${userCss.suc}` : `el-icon-circle-close ${userCss.err}` 
        return(
            <div className={mainCss.main}>
                <Top back={this.backHome.bind(this)} ref='carStyle'/>
                <div className={userCss.container}>
                    <div className={userCss['top-banner']}>
                        <div className={this.state.tabOne} onClick={this.changeTab.bind(this, 1)}>用户列表</div>
                        <div className={this.state.tabTwo} onClick={this.changeTab.bind(this, 2)}>帐号信息</div>
                        <div className={this.state.tabThree} onClick={this.changeTab.bind(this, 3)}>密码修改</div>
                    </div>
                    <div className={userCss['table-container']}>
                    {
                        this.state.currentTab == 1
                        ?   !this.state.showTable 
                            ?   <div></div>
                            :   <ui.Loading loading={this.state.loading}>
                                    <ui.Table
                                        style={{width: '100%', 'zIndex': '0'}}
                                        columns={this.state.columns}
                                        maxHeight={200}
                                        border={true}
                                        data={this.state.userList}/>
                                </ui.Loading>
                        :   this.state.currentTab == 2
                            ?   <div className={userCss.msg}>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>头像：</span>
                                        <div className={userCss['logo-line']}>
                                            <input type='file' style={{'visibility': 'hidden'}} id='logo-ipt' onChange={this.uploadLogo.bind(this)}/>
                                            {
                                                this.state.logo.length == 0
                                                ?   <div className={userCss['logo-content']}>
                                                        <i className='el-icon-upload2' style={{'cursor': 'pointer'}} onClick={this.openLogo.bind(this)}></i>
                                                    </div>
                                                :   <div>
                                                        <div className={userCss['logo-content']}>
                                                            <img src={this.state.logo} className={userCss.logo}/>
                                                        </div>
                                                        <ui.Button size='mini' type='success' className={userCss.btn} onClick={this.openLogo.bind(this)}>修改头像</ui.Button>
                                                    </div>
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>帐号邮箱：</span>
                                        <div className={userCss.con}>{this.state.account.email}</div>
                                    </div>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>用户名：</span>
                                        <ui.Input style={{'width': '230px'}} size='small' placeholder={'当前用户名为' + this.state.username} onChange={this.editIpt.bind(this, 0)}></ui.Input>
                                    </div>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>创建日期：</span>
                                        <div className={userCss.con}>{this.state.account.createDate}</div>
                                    </div>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>最后登录：</span>
                                        <div className={userCss.con}>{this.state.account.lastLogin}</div>
                                    </div>
                                    <div className={userCss.line}>
                                        <ui.Button size="small" type='primary' style={{'marginLeft': '75px'}} onClick={this.saveEdit.bind(this)}>保存修改</ui.Button>
                                    </div>
                                </div>
                            :   <div className={userCss.msg}>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>原密码：</span>
                                        <ui.Input type='password' style={{'width': '250px', 'marginLeft': '15px'}} size="small" onChange={this.editIpt.bind(this, 1)} onBlur={this.checkPwd.bind(this, 1)}></ui.Input>
                                        <div style={{'width': '100px', 'margin': '5px 0 0 15px'}}>
                                            <i className={oldCheck}></i>                                      
                                        </div>
                                    </div>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>新密码：</span>
                                        <ui.Input type='password' style={{'width': '250px', 'marginLeft': '15px'}} placeholder='只能是6-16位字母、数字和,._字符' size="small" onChange={this.editIpt.bind(this, 2)} onBlur={this.checkPwd.bind(this, 2)}></ui.Input>
                                        <div style={{'width': '100px', 'margin': '5px 0 0 15px'}}>
                                            <div className={newCheck}></div>
                                        </div>
                                    </div>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>确认新密码：</span>
                                        <ui.Input type='password' style={{'width': '250px', 'marginLeft': '15px'}} placeholder='只能是6-16位字母、数字和,._字符' size="small" onChange={this.editIpt.bind(this, 3)} onBlur={this.checkPwd.bind(this, 3)}></ui.Input>
                                        <div style={{'width': '100px', 'margin': '5px 0 0 15px'}}>
                                            <i className={secCheck}></i>
                                        </div>
                                    </div>
                                    <div className={userCss.line}>
                                        <ui.Button size="small" type='primary' style={{'marginLeft': '75px'}} onClick={this.savePwd.bind(this)}>保存修改</ui.Button>
                                    </div>
                                </div>
                    }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
