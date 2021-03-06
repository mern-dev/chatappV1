import React, { Component } from 'react';


class ReceiveMessage extends Component {

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
     
    render() { 
        return (


        <div className="msg">
            <div className="msgBody"  id={this.props.msgid}>

         {this.props.msgBody}

            </div>
          
            <div className="msgSentTime-receive">
           
                {this.formatAMPM(new Date(this.props.sentTime))}
              
            </div>
         
            <div className="bubble-arrow-left"></div>
        </div>

          );
    }
}
 
export default ReceiveMessage;

  
