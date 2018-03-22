import React from 'react';
import { Message } from 'semantic-ui-react';

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMsg: {
                isShow: false,
                type: 'success',
                msg: ''
            }
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
                        <p>{propsData.msg}</p>
                    </Message>
                )
            }
            else if(propsData.type == 'error') {
                return (
                    <Message negative>
                        <Message.Header>fail</Message.Header>
                        <p>{propsData.msg}</p>
                    </Message>
                )
            }
        }
    }
}

export default Msg;