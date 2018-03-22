import React from 'react';
import homeCss from './home.scss';
import mainCss from '../../assets/css/main.scss';
import { Table, Icon, Button } from 'semantic-ui-react';

import { Link, History } from 'react-router-dom';

import Msg from '../msg/Msg';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMsg: {
                isShow: false,
                type: 'success',
                msg: ''
            },
            userList: []
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
        React.axios('/server/users').then((res) => {
            if(!res.data.code) {
                this.setState({
                    userList: res.data.list
                })
            }
        })
    }
    toDel(id) {
        React.axios('/server/delete', {
            params: {
                id: id
            }
        }).then((res) => {
            const data = res.data
            if(!data.code) {
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

    render() {
        const userList = []
        this.state.userList.forEach((item) => {
            userList.push(
                <Table.Row>
                    <Table.Cell>{item.username}</Table.Cell>
                    <Table.Cell>{item.createDate}</Table.Cell>
                    <Table.Cell>{item.lastLogin}</Table.Cell>
                    <Table.Cell>{item.tokenId}</Table.Cell>
                    <Table.Cell>
                        <Button onClick={this.toDel.bind(this, item.id)}>删除</Button>
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
