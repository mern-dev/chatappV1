import React, { Component } from 'react';


class SendMessage extends Component {
    formatAMPM =(date) => {
       
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
     
        return strTime;
        
      }

      status = (msg) =>
      {  
          if(msg.seen)
            return (<p className='seen'>&#x2714;&#x2714;</p>)
         else if(msg.delivered)
          return (<p className='delivered'>&#x2714;&#x2714;</p>)
         else if(msg.sent)
      return (<p className='sent'>&#x2714;</p>)
       
         else
           return (<img src="images/loading-sending.gif"alt="#" className="msg-status-sent"/>)
      }
    render() { 

        return (


        <div className="sendmsg" >
            <div className="sendmsgBody " id={this.props.msgid}>

            {this.props.msgBody}
            </div>
            <br/>
            <div className="msgSentTime">
                      {this.formatAMPM(new Date(this.props.sentTime))}
                      {this.status(this.props.status)}
                      
            </div>
         
            <div className="bubble-arrow-right"></div>
        
        </div>

          );
    }
}
 
export default SendMessage;
