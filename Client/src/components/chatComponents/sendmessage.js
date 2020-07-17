import React, { Component } from 'react';


class SendMessage extends Component {

    render() { 
        return (

        <div className="sendmsg">
            <div className="sendmsgBody">
            {this.props.msgBody}
            </div>
            <br/>
            <div className="msgSentTime">
           
                      24th july 5.36pm
            </div>
        
        </div>

          );
    }
}
 
export default SendMessage;
