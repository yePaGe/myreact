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
                            return <span><ui.Button type="text" size="small" disabled>当前用户</ui.Button></span>
                        }
                        else {
                            return <span>
                                <ui.Button size='mini' icon='delete' type='danger' onClick={this.delUser.bind(this, e.id)}></ui.Button>
                            </span>
                        }
                    }
                }
            ],
            userList: [],
            tabOne: `${userCss['tab-contain']} ${userCss['tab-active']}`,
            tabTwo: `${userCss['tab-contain']}`,
            tabThree: `${userCss['tab-contain']}`,
            tabFour: `${userCss['tab-contain']}`,
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
            secCheck: 0,
            stockName: '',
            stockNameList: [{_id: 2313, name: 'aaaaa'}],
            showCreate: false,
            imgContent: '',
            imgConCheck: 0,
            imgDire: 1,
            imgCol: 'info',
            imgRow: '',
            imgNum: 0,
            img1: '',
            imgName1: '',
            imgDate1: 0,
            imgDes1: '',
            img1Check: 0,
            img2: '',
            imgName2: '',
            imgDate2: 0,
            imgDes2: '',
            img2Check: 0,
            img3: '',
            imgName3: '',
            imgDate3: 0,
            imgDes3: '',
            img3Check: 0,
            searchKey: '',
            itemList: [],
            iptVal: ''
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
        })
    }
    changeTab(type) {
        this.setState({
            tabOne: type == 1 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
            tabTwo: type == 2 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
            tabThree: type == 3 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
            tabFour: type == 4 ? `${userCss['tab-contain']} ${userCss['tab-active']}` : `${userCss['tab-contain']}`,
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
            })
        }
        else if(type == 4) {
            React.axios('/server/imgs/nameList').then((res) => {
                if(!res.data.code) {
                    this.setState({
                        stockNameList: res.data.list
                    })
                }
                else {
                    ui.Message.error('获取图库名字列表失败~~~')
                }
            })
        }
    }
    openLogo() {
        let iptObj = document.getElementById('logo-ipt');
        iptObj.click();
    }
    openImg(type) {
        this.openLogo()
        this.setState({
            imgNum: type
        })
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
                    iptVal: ''
                })
                if(this.state.currentTab == 2) {
                    this.setState({
                        logo: res.data.url,
                        hasEdit: true
                    })
                }
                else if(this.state.currentTab == 4) {
                    switch(this.state.imgNum) {
                        case 1: 
                            this.setState({
                                img1: res.data.url
                            });
                            break;
                        case 2:
                            this.setState({
                                img2: res.data.url
                            });
                            break;
                        case 3:
                            this.setState({
                                img3: res.data.url
                            });
                            break;
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                ui.Message.error('服务器出错~~~')
            })
    }
    uploadImgs() {
        let imgList = []
        let obj = {}
        if(this.state.img1) {
            if(!this.state.imgName1) {
                ui.Message.error('请填写图片一名称 ~~~')
            }
            obj = {
                name: this.state.imgName1,
                date: this.state.imgDate1,
                url: this.state.img1,
                direc: this.state.imgDire,
                des:  this.state.imgDes1
            }
            imgList.push(obj)
        }
        if(this.state.img2) {
            if(!this.state.imgName2) {
                ui.Message.error('请填写图片二名称 ~~~')
            }
            obj = {
                name: this.state.imgName2,
                date: this.state.imgDate2,
                url: this.state.img2,
                direc: this.state.imgDire,
                des:  this.state.imgDes2
            }
            imgList.push(obj)
        }
        if(this.state.img3) {
            if(!this.state.imgName3) {
                ui.Message.error('请填写图片三名称 ~~~')
            }
            obj = {
                name: this.state.imgName3,
                date: this.state.imgDate3,
                url: this.state.img3,
                direc: this.state.imgDire,
                des:  this.state.imgDes3
            }
            imgList.push(obj)
        }
        imgList = JSON.stringify(imgList)
        React.axios.post('/server/imgs/add', {
            id: this.state.stockName,
            list: imgList
        }).then((res) => {
            if(!res.data.code) {
                this.setState({
                    img1: '',
                    imgName1: '',
                    imgDes1: '',
                    img1Check: 0,
                    img2: '',
                    imgName2: '',
                    imgDes2: '',
                    img2Check: 0,
                    img3: '',
                    imgName3: '',
                    imgDes3: '',
                    img3Check: 0
                })
                ui.Message.success('图片添加成功~~~')
                if(this.state.stockName == this.state.searchKey) {
                    this.searchStock(this.state.searchKey)
                }
            }
        })
    }
    editIpt(type, e) {
        switch(type) {
            case 0:
                this.setState({
                    username: e,
                    hasEdit: true
                });
                break;
            case 1:
                this.setState({
                    oldpwd: e
                });
                break;
            case 2:
                this.setState({
                    newpwd: e,
                });
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
                break;
            case 3:
                this.setState({
                    secpwd: e
                });
                break;
            case 4:
                this.setState({
                    imgContent: e
                });
                break;
            case 5:
                this.setState({
                    imgName1: e,
                    imgDate1: new Date().getTime()
                });
                break;
            case 6:
                this.setState({
                    imgName2: e,
                    imgDate2: new Date().getTime()
                });
                break;
            case 7:
                this.setState({
                    imgName3: e,
                    imgDate3: new Date().getTime()
                });
                break;
            case 8:
                this.setState({
                    imgDes1: e
                });
                break;
            case 9:
                this.setState({
                    imgDes2: e
                });
                break;
            case 10:
                this.setState({
                    imgDes3: e
                });
                break;
            case 11:
                this.setState({
                    stockName: e
                });
                break;
            case 12:
                this.setState({
                    searchKey: e
                })
                this.searchStock(e)                
                break;
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
    changeImgDire(type) {
        if(this.state.imgDire == type) {
            return
        }
        switch(type) {
            case 1:
                this.setState({
                    imgDire: 1,
                    imgCol: 'info',
                    imgRow: ''
                });
                break;
            case 2:
                this.setState({
                    imgDire: 2,
                    imgCol: '',
                    imgRow: 'info'
                });
                break;
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
    createName() {
        if(this.state.imgContent.length == 0) {
            console.log('aaa')
            ui.Message.error('请填写图库名称~~~')
            return
        }
        React.axios('/server/imgs/create', {
            params: {
                name: this.state.imgContent
            }
        }).then((res) => {
            if(!res.data.code) {
                this.setState({
                    stockName: res.data.msg,
                    imgConCheck: 1
                })
            }
            else {
                this.setState({
                    imgConCheck: 2
                })
            }
            ui.Message({
                type: !res.data.code ? 'success' : 'error',
                message: !res.data.code ? '创建成功~~~' : res.data.msg
            })
        }).catch((err) => {
            consle.log(err)
            ui.Message.error()
        })
    }
    toCteateName(type) {
        if(type == 1) {
            this.setState({
                showCreate: true,
                imgContent: ''
            })
        }
        else if(type == 2) {
            this.setState({
                showCreate: false,
                imgContent: ''
            })
        }
    }
    searchStock(id) {
        React.axios('/server/imgs/itemList', {
            params: {
                id: id
            }
        }).then((res) => {
            if(!res.data.code) {
                this.setState({
                    itemList: res.data.list
                })
            }
            else {
                this.setState({
                    itemList: []
                })
                ui.Message.error(res.data.msg)
            }
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错 ~~~')
        })
    }
    clearImg(num) {
        switch(num) {
            case 1:
                this.setState({
                    img1: ''
                });
                break;
            case 2:
                this.setState({
                    img2: ''
                });
                break;
            case 3:
                this.setState({
                    img3: ''
                });
                break;
        }
    }
    delItem(id) {
        React.axios('/server/imgs/delete', {
            params: {
                sid: this.state.searchKey,
                iid: id
            }
        }).then((res) => {
            if(!res.data.code) {
                this.searchStock(this.state.searchKey)
                ui.Message.success('删除成功~~~')
            }
            else {
                ui.Message.error('删除失败 ~~~~')
            }
        }).catch((err) => {
            console.log(err)
            ui.Message.error('服务器出错 ~~~')
        })
    }
    changeRoute(e) {
        this.props.history.push(e)
    }
    switchIcon(num) {
        switch(num) {
            case 0:
                return '';
            case 1:
                return `el-icon-circle-check ${userCss.suc}`;
            case 2:
                return `el-icon-circle-close ${userCss.err}`;
        }
    }
    render() {
        let oldCheck = this.switchIcon(this.state.oldCheck);
        let newCheck = this.state.newCheck == 0 ? '' : this.state.newCheck == 1 ? userCss.level1 : this.state.newCheck == 2 ? userCss.level2 : this.state.newCheck == 3 ? userCss.level3 : `el-icon-circle-close ${userCss.err}`
        let secCheck = this.switchIcon(this.state.secCheck);
        let imgConCheck = this.switchIcon(this.state.imgConCheck); 
        let imgDire = this.state.imgDire == 1 ? userCss['img-col'] : userCss['img-row']
        let img1Check = this.switchIcon(this.state.img1Check);
        let img2Check = this.switchIcon(this.state.img2Check);
        let img3Check = this.switchIcon(this.state.img3Check);
        return(
            <div className={mainCss.main}>
                <Top changeRoute={this.changeRoute.bind(this)} ref='carStyle'/>
                <div className={userCss.container}>
                    <div className={userCss['top-banner']}>
                        <div className={this.state.tabOne} onClick={this.changeTab.bind(this, 1)}>用户列表</div>
                        <div className={this.state.tabTwo} onClick={this.changeTab.bind(this, 2)}>帐号信息</div>
                        <div className={this.state.tabThree} onClick={this.changeTab.bind(this, 3)}>密码修改</div>
                        <div className={this.state.tabFour} onClick={this.changeTab.bind(this, 4)}>图片上传</div>
                    </div>
                    <input type='file' style={{'visibility': 'hidden'}} id='logo-ipt' value={this.state.iptVal} onChange={this.uploadLogo.bind(this)}/>
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
                            :   this.state.currentTab == 3
                                ?   <div className={userCss.msg}>
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
                                :   <div className={userCss['img-content']}>
                                        <div className={userCss['img-upload']}>
                                            <div className={mainCss['flex-row']} style={{'marginBottom': '15px'}}>
                                                <ui.Button size='small' type='success' onClick={this.uploadImgs.bind(this)}>确定上传</ui.Button>
                                            </div>
                                            <div className={mainCss['flex-row']} style={{'marginBottom': '15px'}}>
                                                <span style={{'marginTop': '8px', 'marginRight': '15px'}}>图库名称：</span>
                                                {
                                                    this.state.showCreate 
                                                    ?   <div>
                                                            <ui.Input style={{'width': '250px'}} onChange={this.editIpt.bind(this, 4)}></ui.Input>
                                                            <i className={imgConCheck}></i>
                                                            <ui.Button onClick={this.createName.bind(this)} style={{'marginLeft': '15px'}} type='success'>创建</ui.Button>
                                                            <ui.Button onClick={this.toCteateName.bind(this, 2)}>取消</ui.Button>
                                                        </div>
                                                    :   <div>
                                                            <ui.Select value={this.state.stockName} onChange={this.editIpt.bind(this, 11)} placeholder='请选择图库名称'>
                                                                {
                                                                    this.state.stockNameList.map((i) => {
                                                                        return <ui.Select.Option key={i._id} value={i._id} label={i.name}/>
                                                                    })
                                                                }
                                                            </ui.Select>
                                                            <ui.Button onClick={this.toCteateName.bind(this, 1)} style={{'marginLeft': '15px'}} type='success'>创建一个</ui.Button>
                                                        </div>
                                                }
                                                
                                            </div>
                                            <div className={mainCss['flex-row']} style={{'margin': '0 15px 20px 0'}}>
                                                <span style={{'marginTop': '8px', 'marginRight': '15px'}}>图片尺寸：</span>
                                                <ui.Button.Group>
                                                    <ui.Button type={this.state.imgCol} onClick={this.changeImgDire.bind(this, 1)}>纵向</ui.Button>
                                                    <ui.Button type={this.state.imgRow} onClick={this.changeImgDire.bind(this, 2)}>横向</ui.Button>
                                                </ui.Button.Group>
                                            </div>
                                            <div className={mainCss['flex-between']}>
                                                <div className={userCss.img}>
                                                    <div>
                                                        {
                                                            this.state.img1.length == 0 
                                                            ?   <div className={imgDire} onClick={this.openImg.bind(this, 1)}>
                                                                    <i className='el-icon-upload' style={{'margin': '110px 95px','cursor': 'pointer', 'fontSize': '60px', 'color': '#747474','textAlign': 'center'}}></i>
                                                                </div>
                                                            :   <div className={imgDire}>
                                                                    <i className='el-icon-close' style={{'position': 'absolute', 'top': '3px', 'right': '3px', 'cursor': 'pointer', 'fontSize': '10px', 'color': '#747474'}} onClick={this.clearImg.bind(this, 1)}></i>
                                                                    <img width='100%' height='100%' src={this.state.img1}/>
                                                                </div>
                                                        }
                                                    </div>
                                                    <div>
                                                        <span>名称:</span>
                                                        <ui.Input value={this.state.imgName1} style={{'marginLeft':'20px','width': '150px'}} onChange={this.editIpt.bind(this, 5)}></ui.Input>
                                                        <i className={img1Check}></i>
                                                    </div>
                                                    <div>
                                                        <span style={{'display': 'inline-block','margin': '0 20px 50px 0'}}>描述:</span>
                                                        <ui.Input
                                                            value={this.state.imgDes1}
                                                            style={{'marginTop': '20px','width': '180px'}}
                                                            type="textarea"
                                                            onChange={this.editIpt.bind(this, 8)}
                                                            autosize={{ minRows: 4}}
                                                            placeholder="请输入内容"
                                                            />
                                                        </div>
                                                </div>
                                                <div className={userCss.img}>
                                                    <div>
                                                        {
                                                            this.state.img2.length == 0 
                                                            ?   <div className={imgDire} onClick={this.openImg.bind(this, 2)}>
                                                                    <i className='el-icon-upload' style={{'margin': '110px 95px','cursor': 'pointer', 'fontSize': '60px', 'color': '#747474','textAlign': 'center'}}></i>
                                                                </div>
                                                            :   <div className={imgDire}>
                                                                    <i className='el-icon-close' style={{'position': 'absolute', 'top': '3px', 'right': '3px', 'cursor': 'pointer', 'fontSize': '10px', 'color': '#747474'}} onClick={this.clearImg.bind(this, 2)}></i>
                                                                    <img width='100%' height='100%' src={this.state.img2}/>
                                                                </div>
                                                        }
                                                    </div>
                                                    <div>
                                                        <span>名称:</span>
                                                        <ui.Input value={this.state.imgName2} style={{'marginLeft':'20px','width': '150px'}} onChange={this.editIpt.bind(this, 6)}></ui.Input>
                                                        <i className={img2Check}></i>
                                                    </div>
                                                    <div>
                                                        <span style={{'display': 'inline-block','margin': '0 20px 50px 0'}}>描述:</span>
                                                        <ui.Input
                                                            value={this.state.imgDes2}
                                                            style={{'marginTop': '20px','width': '180px'}}
                                                            type="textarea"
                                                            onChange={this.editIpt.bind(this, 9)}
                                                            autosize={{ minRows: 4}}
                                                            placeholder="请输入内容"
                                                            />
                                                        </div>
                                                </div>
                                                <div className={userCss.img}>
                                                    <div>
                                                        {
                                                            this.state.img3.length == 0 
                                                            ?   <div className={imgDire} onClick={this.openImg.bind(this, 3)}>
                                                                    <i className='el-icon-upload' style={{'margin': '110px 95px','cursor': 'pointer', 'fontSize': '60px', 'color': '#747474','textAlign': 'center'}}></i>
                                                                </div>
                                                            :   <div className={imgDire}>
                                                                    <i className='el-icon-close' style={{'position': 'absolute', 'top': '3px', 'right': '3px', 'cursor': 'pointer', 'fontSize': '10px', 'color': '#747474'}} onClick={this.clearImg.bind(this, 3)}></i>
                                                                    <img width='100%' height='100%' src={this.state.img3}/>
                                                                </div>
                                                        }
                                                    </div>
                                                    <div>
                                                        <span>名称:</span>
                                                        <ui.Input value={this.state.imgName3} style={{'marginLeft':'20px','width': '150px'}} onChange={this.editIpt.bind(this, 7)}></ui.Input>
                                                        <i className={img3Check}></i>
                                                    </div>
                                                    <div>
                                                        <span style={{'display': 'inline-block','margin': '0 20px 50px 0'}}>描述:</span>
                                                        <ui.Input
                                                            value={this.state.imgDes3}
                                                            style={{'marginTop': '20px','width': '180px'}}
                                                            type="textarea"
                                                            onChange={this.editIpt.bind(this, 10)}
                                                            autosize={{ minRows: 4}}
                                                            placeholder="请输入内容"
                                                            />
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={userCss['img-list']}>
                                            <ui.Select style={{'marginLeft': '22px'}} onChange={this.editIpt.bind(this, 12)} placeholder='请选择图库名称进行检索...'>
                                                {
                                                    this.state.stockNameList.map((i) => {
                                                        return <ui.Select.Option key={i._id} value={i._id} label={i.name}/>
                                                    })
                                                }
                                            </ui.Select>
                                            <div className={userCss['list-content']}>
                                                {
                                                    this.state.itemList.map((i, index) => {
                                                        if(i.direc == 1) {
                                                            return <div className={userCss.item} key={index}>
                                                                <i className='el-icon-close' style={{'position': 'absolute', 'top': '3px', 'right': '3px', 'cursor': 'pointer', 'fontSize': '10px', 'color': '#747474'}} onClick={this.delItem.bind(this, i.id)}></i>
                                                                <img src={i.url} className={userCss.col} width='150px' height='200px'/>
                                                                <div className={userCss.title}>{i.name}</div>
                                                                <div className={userCss.des}>{i.des}</div>
                                                            </div>
                                                        }
                                                        else if(i.direc == 2) {
                                                            return <div className={userCss.item} key={index}>
                                                                <i className='el-icon-close' style={{'position': 'absolute', 'top': '3px', 'right': '3px', 'cursor': 'pointer', 'fontSize': '10px', 'color': '#747474'}} onClick={this.delItem.bind(this, i.id)}></i>
                                                                <img src={i.url} className={userCss.row} width='220px' height='180px'/>
                                                                <div className={userCss.title}>{i.name}</div>
                                                                <div className={userCss.des}>{i.des}</div>
                                                            </div>
                                                        }
                                                        else {
                                                            return <div key={index}>
                                                                暂无数据
                                                            </div>
                                                        }
                                                    })
                                                }
                                            </div>
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
