import React from 'react';
import userCss from './user.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

import Top from '../../top/Top';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                            return <span>
                                <ui.Button disabled>当前用户</ui.Button>
                            </span>
                        }
                        else {
                            return <span>
                                <ui.Button icon='delete' type='danger'></ui.Button>
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
                logo:'',
                email: '',
                username: '',
                createDate: '',
                lastLogin: ''
            },
            logo: '',
            username: ''
        }
    }
    componentWillMount() {
        if(!window.sessionStorage.tokenKey) {
            this.props.history.push('/home')
            return
        }
    }
    componentDidMount() {
        this.refs.carStyle.changeCarousel(1)
        this.getUserList()     
    }
    getUserList() {
        React.axios('/server/users/list').then((res) => {
            if(!res.data.code) {
                const curEmail = JSON.parse(window.sessionStorage.tokenKey).email
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
        }).catch((err) => {
            console.log(err)
        })
    }
    toDel(id, tokenId) {
        React.axios('/server/users/del', {
            params: {
                id: id
            }
        }).then((res) => {
            const data = res.data
            this.getUserList()
        }).catch((err) => {
            console.log(err)
        })
    }
    backHome() {
        this.props.history.push('/home')
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
                    email: JSON.parse(window.sessionStorage.tokenKey).email
                }
            }).then((res) => {
                this.setState({
                    account: res.data.list[0],
                    logo: res.data.list[0].logo,
                    username: res.data.list[0].username
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    openLogo() {
        let iptObj = document.getElementById('logo-ipt');
        // iptObj.setAttribute('type', 'file')
        // iptObj.setAttribute('id', 'logo-ipt')
        // // iptObj.setAttribute('style', 'visibility:hidden')
        // iptObj.setAttribute('onChange', 'console.log(window, document)')
        // document.getElementById('logo').appendChild(iptObj)
        iptObj.click();
        // iptObj.value;
    }
    uploadLogo() {
        let iptObj = document.getElementById('logo-ipt').files;
        let formD = new FormData();
        formD.append('imgfile', iptObj[0]);
        formD.append('name', 'shazizaina。。。')
        React.axios.post('/server/upload/img', formD)
            .then((res) => {
                console.log('okupload', res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    editAccount(e) {
        this.setState({
            username: e
        })
    }
    saveEdit() {
        console.log(this.state.logo, this.state.username)
    }
    render() {
        return(
            <div className={mainCss.main}>
                <Top ref='carStyle'/>
                <div className={userCss.container}>
                    <div className={userCss['back-btn']}>
                        <ui.Tooltip className="item" effect="dark" content="返回首页" placement="right">
                            <i className='el-icon-d-arrow-left' onClick={this.backHome.bind(this)}></i>
                        </ui.Tooltip>
                    </div>
                    <div className={userCss['top-banner']}>
                        <div className={this.state.tabOne} onClick={this.changeTab.bind(this, 1)}>用户列表</div>
                        <div className={this.state.tabTwo} onClick={this.changeTab.bind(this, 2)}>帐号信息</div>
                        <div className={this.state.tabThree} onClick={this.changeTab.bind(this, 3)}>密码修改</div>
                    </div>
                    <div className={userCss['table-container']}>
                    {
                        this.state.currentTab == 1
                        ?   <ui.Table
                                style={{width: '100%'}}
                                columns={this.state.columns}
                                maxHeight={200}
                                border={true}
                                data={this.state.userList}
                            />
                        :   this.state.currentTab == 2
                            ?   <div className={userCss.msg}>
                                    <div className={userCss.line}>
                                        <span className={userCss.title}>头像：</span>
                                        <div className={userCss['logo-line']}>
                                            {
                                                this.state.account.logo.length == 0
                                                ?   <div className={userCss.logo}>
                                                        <i className='el-icon-upload2' style={{'cursor': 'pointer'}} onClick={this.openLogo.bind(this)}></i>
                                                        <input type='file' style={{'visibility': 'hidden'}} id='logo-ipt' onChange={this.uploadLogo.bind(this)}/>
                                                    </div>
                                                :   <div>
                                                        <div className={userCss.logo}>
                                                            <img src={this.state.account.logo}/>
                                                        </div>
                                                        <ui.Button size='mini' type='success' className={userCss.btn}>修改头像</ui.Button>
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
                                        <ui.Input style={{'width': '230px'}} size='small' placeholder={'当前用户名为' + this.state.account.username} onChange={this.editAccount.bind(this)}></ui.Input>
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
                            :   <div className={userCss.line}>
                                <p>adfsasdfsdf</p>
                                <p>1111111</p>
                                </div>
                    }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default User;
