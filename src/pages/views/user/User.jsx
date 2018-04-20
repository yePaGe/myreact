import React from 'react';
import userCss from './user.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            columns: [
                {
                    prop: 'tokenId',
                    label: 'Token ID'
                },
                {
                    prop: 'username',
                    label: '用户名'
                },
                {
                    prop: 'createDate',
                    label: '创建时间'
                },
                {
                    prop: 'lastLogin',
                    label: '最后登录时间'
                },
                {
                    prop: 'edit',
                    label: '编辑',
                    render: () => {
                        return <span>
                            <ui.Button icon='delete' type='danger'></ui.Button>
                        </span>
                    }
                }
            ],
            userList: [
                {
                    tokenId: '12313asdsadfas',
                    username: 'aaa',
                    createDate: '2018-3-4',
                    lastLogin: '2018-4-5',
                    edit: 'del'
                }
            ]
        }
    }
    componentWillMount() {
        // if(!window.sessionStorage.tokenKey) {
        //     this.props.history.push('/home')
        //     return
        // }
    }
    componentDidMount() {
        this.getUserList()       
    }
    getUserList() {
        React.axios('/server/users/list').then((res) => {
            if(!res.data.code) {
                const curName = JSON.parse(window.sessionStorage.username).user
                let list = res.data.list.map((i) => {
                    if(i.username == curName) {
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
        })
    }
    searchUser(key) {
        React.axios('/server/users/search', {
            params: {
                key: key
            }
        }).then((res) => {
            const data = res.data;
            if(!data.code) {
                const curName = window.sessionStorage.getItem('username')
                let list = res.data.list.map((i) => {
                    if(i.username == curName) {
                        i.isCur = true
                    }
                    else {
                        i.isCur = false
                    }
                    return i
                })
                this.setState({
                    searchKey: '',
                    userList: list
                })
            }
            else {
            }
        })
    }
    iptValue(e) {
        console.log(e.target.value)
        this.setState({
            searchKey: e.target.value
        })
    }
    backHome() {
        this.props.history.push('/home')
    }

    render() {
        return(
            <div className={mainCss.main}>
                <ui.Button color='olive' onClick={this.backHome.bind(this)}>返回首页</ui.Button>
                <div>
                    <ui.Tabs type="card" value="1">
                        <ui.Tabs.Pane label="用户管理" name="1">用户管理</ui.Tabs.Pane>
                        <ui.Tabs.Pane label="配置管理" name="2">配置管理</ui.Tabs.Pane>
                        <ui.Tabs.Pane label="角色管理" name="3">角色管理</ui.Tabs.Pane>
                        <ui.Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</ui.Tabs.Pane>
                    </ui.Tabs>
                </div>
                <div>
                    <ui.Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        maxHeight={200}
                        data={this.state.userList}
                    />
                </div>
                hello 傻子~
            </div>
        )
    }
}

export default User;
