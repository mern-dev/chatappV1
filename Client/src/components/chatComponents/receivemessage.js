import React, { Component } from 'react';


class ReceiveMessage extends Component {

    render() { 
        return (

        <div className="msg">
            <div className="msgBody">
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
 
export default ReceiveMessage;

  
