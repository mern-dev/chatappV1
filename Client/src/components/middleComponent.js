import React, { Component } from 'react';
import ReceiveMessage from "./chatComponents/receivemessage"
import SendMessage from './chatComponents/sendmessage';
import { UserContext } from '../contexts/userContext';


class MiddleComponent extends Component {
    state = { msgBody:"" }

    static contextType = UserContext;

    send = () =>
    {  const {postmessage} = this.context;
      postmessage();

    }
    render() { 
         const { receiver,middleFlag,messages,changeMsgBody,msgBody } = this.context;
     
        return( 
            middleFlag ? <div  className="middleHome" id="middle">
              <div className="middleHomeHeader">
   
                   <div className="receiverName" >To: {receiver.username} </div>
                   <div className="lastSeen">last seen at 3:45pm</div>
  
               </div>
               <div className="chatScroll">
               <ul className="list-none">
                   {messages.map(msg=>{
                      
                       if(msg.receiverId==receiver._id)
                        {   return(  <li key={msg.id}>
                           <SendMessage msgBody={msg.msgBody} />
                           </li>)
                        }
                            
                         
                          if(msg.senderId==receiver._id)
                         { return (<li key={msg.id}>
                           <ReceiveMessage msgBody={msg.msgBody} />
                           </li>)
                         }  
                        } 
                     )} 
               </ul>
      
                 </div>
              <div id="chatInputBox">
                 <input onChange={ e => changeMsgBody(e.target.value)} placeholder="Type Something..." className="messageInput" value = {msgBody} />
                  <button onClick={ this.send } class="messageButton">Send</button>
             </div>
    </div>:
            <div className="middleHome middleEmpty" id="middle" > 
            <h3> Chat Room </h3>
            <img className="middle-img" src="./images/chatmiddle.png"/>
          </div>
          );

     
       
    }
}
 
export default MiddleComponent;