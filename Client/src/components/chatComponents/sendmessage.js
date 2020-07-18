import React, { Component } from 'react';


class SendMessage extends Component {
    formatAMPM =(date) => {
        
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
     
        return strTime;
        
      }
    render() { 
        return (

        <div className="sendmsg">
            <div className="sendmsgBody">
            {this.props.msgBody}
            </div>
            <br/>
            <div className="msgSentTime">
                      {this.formatAMPM(this.props.sentTime)}
            </div>
        
        </div>

          );
    }
}
 
export default SendMessage;
