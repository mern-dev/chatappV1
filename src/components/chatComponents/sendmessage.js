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
            return (<div><div className="check"></div>
            <div className="check"></div></div>)
         else if(msg.delivered)
          return (<div><div className="check-sent"></div>
          <div className="check-sent"></div></div>)
          else if(msg.sent)
          return(<div className="check-sent"></div>)
         else
           return (<div id="panel">
           <span id="loading5">
               <span id="outerCircle"></span>
           </span>
       </div>)
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
