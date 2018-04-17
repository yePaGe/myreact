import React from 'react';
import homeCss from './user.scss';
import mainCss from '../../../assets/css/main.scss';
import { Table, Icon, Button, Input } from 'semantic-ui-react';

import { Link, History } from 'react-router-dom';

import Msg from '../../msg/Msg';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMsg: {
                isShow: false,
                type: 'success',
                msg: ''
            },
            userList: [],
            searchKey: ''
        }
    }
    componentWillMount() {
        if(!window.sessionStorage.tokenKey) {
            this.props.history.push('/login')
        }
        this.getUserList()
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
            setTimeout(() => {
                this.props.history.push('/login')
            }, 1000)
        })
    }
    getUserList() {
        React.axios('/server/users/list').then((res) => {
            if(!res.data.code) {
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
            this.setState({
                isShowMsg:{
                    isShow: true,
                    msg: res.data.msg,
                    type: res.data.code == 0 ? 'success' : 'error'
                }
            })
            setTimeout(() => {
                this.setState({
                    isShowMsg:{
                        isShow: false,
                        msg: '',
                        type: 'success'
                    }
                })
            }, 1000)
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
                this.setState({
                    isShowMsg:{
                        isShow: true,
                        msg: res.data.msg,
                        type: res.data.code == 0 ? 'success' : 'error'
                    }
                })
                setTimeout(() => {
                    this.setState({
                        isShowMsg:{
                            isShow: false,
                            msg: '',
                            type: 'success'
                        }
                    })
                }, 1000)
            }
        })
    }
    iptValue(e) {
        console.log(e.target.value)
        this.setState({
            searchKey: e.target.value
        })
    }

    render() {
        const userList = []
        this.state.userList.forEach((item) => {
            userList.push(
                <Table.Row key={item._id}>
                    <Table.Cell>{item.username}</Table.Cell>
                    <Table.Cell>{item.createDate}</Table.Cell>
                    <Table.Cell>{item.lastLogin}</Table.Cell>
                    <Table.Cell>{item.tokenId}</Table.Cell>
                    <Table.Cell>
                        { item.isCur 
                            ? <Button disabled>当前用户</Button>
                            : <Button onClick={this.toDel.bind(this, item._id)}>删除</Button>
                        }
                        
                    </Table.Cell>
                </Table.Row>
            )
        })
        return(
            <div className={mainCss.main}>
                <div >
                    <Msg msg={this.state.isShowMsg}/>
                </div>
                <div className={homeCss.topBanner}>
                    <Icon name='sign out' onClick={this.logout.bind(this)}/>
                    <Input 
                        icon={<Icon name='search' inverted circular link onClick={this.searchUser.bind(this, this.state.searchKey)}/>}
                        placeholder='Search...' 
                        value={this.state.searchKey}
                        onChange={this.iptValue.bind(this)}/>
                </div>
                <div className={homeCss.listContent}>
                    <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>username</Table.HeaderCell>
                                <Table.HeaderCell>createDate</Table.HeaderCell>
                                <Table.HeaderCell>lastLogin</Table.HeaderCell>
                                <Table.HeaderCell>tokenId</Table.HeaderCell>
                                <Table.HeaderCell>edit</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {userList}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Home;
