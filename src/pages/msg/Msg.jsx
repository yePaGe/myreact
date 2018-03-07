import React from 'react';
import { Message } from 'semantic-ui-react';

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSec: 0,
            newMsg: {
                isShow: false,
                type: 'success',
                msg: ''
            }
        }
    }

    componentDidUpdate() {
        if(this.props.msg.isShow == true) {
            this.interval = setInterval(() => {
                this.setState(prev => ({
                    showSec: prev.showSec + 1
                }))
                console.log('start counting', this.state.showSec)       
            },1000)
        }
    }

    componentWillReceiveProp() {
        if(this.state.showSec > 4) {
            console.log(this.state.newMsg)
            this.props.hideMsg(this.state.newMsg)
            clearInterval(this.interval)                  
            return
        }
    }

    render() {
        let propsData = this.props.msg
        if(!propsData.isShow) {
            return (
                <div>nothing!</div>
            )
        }
        else {
            if(propsData.type == 'success') {
                return (
                    <Message positive>
                        <Message.Header>ok</Message.Header>
                        <p>{propsData.msg} {this.state.showSec}</p>
                    </Message>
                )
            }
            else if(propsData.type) {
                return (
                    <Message negative>
                        <Message.Header>ok</Message.Header>
                        <p>{propsData.msg}</p>
                    </Message>
                )
            }
        }
    }
}

export default Msg;