import React, { Component } from 'react';
import ReceiveMessage from "./chatComponents/receivemessage"
import SendMessage from './chatComponents/sendmessage';
import { UserContext } from '../contexts/userContext';
import Avatar from '@material-ui/core/Avatar';

class MiddleComponent extends Component {
     
  

 
    componentDidMount()
    {
      this.autoScroll();
    }
    componentDidUpdate()
    {
      this.autoScroll()
    }
   
    static contextType = UserContext;
   
     autoScroll = () => {
      const container = document.getElementById("chatScroll");
      if (container) container.scrollTo(0, container.scrollHeight);
    };
    send = () =>
    { const {postmessage,msgBody} = this.context;
      if(msgBody=="")
    {
      return null;
    } 
      
      postmessage();

    }
    render() { 
         const { receiver,middleFlag,messages,changeMsgBody,msgBody,seenOnRoom } = this.context;
     
        return( 
            middleFlag ? <div  className="middleHome" id="middle">
              <div className="middleHomeHeader">
              <Avatar alt="Cindy Baker" src={receiver.path}  />
                <div className="header-username-section">
                <div className="receiverName" >{receiver.username} </div>
                   <div className="lastSeen">last seen at 3:45pm</div>
  
                </div>
  
                  
               </div>
               <div className="chatScroll" id="chatScroll">
               <ul className="list-none">
                   {messages.map(msg=>{
                      if(msg.Id===receiver._id)
                     {  
                        return( msg.messages.map(m =>{
                             
                        if(m.receiverId==receiver._id)
                        { 
                            return(  <li key={m.id}>
                           <SendMessage msgBody={m.msgBody} sentTime={m.sentTime} status={{sent:m.sent,delivered:m.delivered,seen:m.seen}}/>
                           </li>)
                        }
                            
                         
                          if(m.senderId==receiver._id)
                         { 
                           if(!m.seen)
                           {
                               
                                     seenOnRoom(m);
                           }
                           return (<li key={m.id}>
                           <ReceiveMessage msgBody={m.msgBody} sentTime={m.sentTime} />
                           </li>)
                         }  


                       }))
                    } 
                      }
                      
                     )} 
               </ul>
             
                 </div>
              <div id="chatInputBox">
                 <input onChange={ e => changeMsgBody(e.target.value)} placeholder="Type Something..." className="messageInput" value = {msgBody} />
                  <button onClick={this.send}  class="messageButton">Send</button>
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