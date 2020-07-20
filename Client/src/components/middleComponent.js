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
    formatSeen = (lastSeen) =>
    {  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       var temp_now = new Date;
       let month= months[lastSeen.getMonth()];
       let day = lastSeen.getDate();
       let year = lastSeen.getFullYear();
       
       if(temp_now.getFullYear()!=lastSeen.getFullYear()||temp_now.getMonth()!==lastSeen.getMonth())
        {
              
               return "Last seen "+day+"/"+month+"/"+year
        }
        if(temp_now.getMonth()==lastSeen.getMonth())
        {
            if((temp_now.getDate() - day) == 0)
              {
                var hours = lastSeen.getHours();
                var minutes = lastSeen.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return "Last seen at "+strTime;
              }
              else if((temp_now.getDate() - day) == 1)
              {var hours = lastSeen.getHours();
                var minutes = lastSeen.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return "Last seen Yesterday,at "+strTime
              }
              else{
                return "Last seen "+day+"/"+lastSeen.getMonth()+"/"+year
              }
        }
      var hours = lastSeen.getHours();
      var minutes = lastSeen.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    render() { 
         const { receiver,middleFlag,messages,changeMsgBody,msgBody,seenOnRoom } = this.context;
     
        return( 
            middleFlag ? <div  className="middleHome" id="middle">
              <div className="middleHomeHeader">
              <Avatar alt="Cindy Baker" src={receiver.path}  />
                <div className="header-username-section">
                <div className="receiverName" >{receiver.username} </div>
        <div className="lastSeen">{receiver.isOnline? "Online" : this.formatSeen(new Date(receiver.lastSeen))  }</div>
  
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