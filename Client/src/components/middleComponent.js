import React, { Component } from 'react';
import ReceiveMessage from "./chatComponents/receivemessage"
import SendMessage from './chatComponents/sendmessage';
import { UserContext } from '../contexts/userContext';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

class MiddleComponent extends Component {
  static contextType = UserContext;
  
    state = {
  
    
      lastmsg:null
    }
 
  componentDidMount()
  { this.autoScroll();
    
    
   
    
  }
  formatDisplay = (msg) =>
  { 
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var msg_sent = new Date(msg.sentTime)
     
      var t_now = new Date()
      let month = months[msg_sent.getMonth()].slice(0,3)
      let day  = days[msg_sent.getDay()].slice(0,3)
      let date = msg_sent.getDate()
  
    if(msg_sent.getFullYear()===t_now.getFullYear())
    {
      if(msg_sent.getMonth()===t_now.getMonth())
      {
        if(msg_sent.getDate()===t_now.getDate())
        {
          return "Today"
        }
        if(t_now.getDate()-msg_sent.getDate()===1)
         return "Yesterday"
        if(t_now.getDate()-msg_sent.getDate()<=7)
         return  days[msg_sent.getDay()]
        else
         {
          

           return day +","+date+" "+month
         } 
      }
      else
      {
        return day +","+date+" "+month
      }
    }
    else{
      return day +","+date+" "+month+","+msg_sent.getFullYear().toString().slice(-2);
    }
  }

  formatMaindate = (msg,lastMsg) =>
  {  
    var msg_sent = new Date(msg.sentTime)
    
   
    if(lastMsg==null)
    {
     
       return true
    }
    else{
      let lastmsg = new Date(lastMsg.sentTime)
      
      if(lastmsg.getFullYear()===msg_sent.getFullYear()&&lastmsg.getMonth()===msg_sent.getMonth()&&lastmsg.getDate()===msg_sent.getDate())
      {
        return false
      }
      else{
       return true
      }
  
    }
  }
  
componentDidUpdate()
{
  
      
       
          this.autoScroll()
        
       
      
}

backtoleft = () =>
{ const {clickOpenSearchUpdate} = this.context
clickOpenSearchUpdate(false)
  document.querySelector(".leftHome").style.display="block";
  document.querySelector(".middleHome").style.display="none";
 
}
  
  

openSearch = () =>{
  let em = parseFloat( getComputedStyle( document.querySelector('body'))['font-size'])
    let width = window.innerWidth / em;
    let height = window.innerHeight/ em;
   
    if(width<90||height<41)
    {
      document.querySelector(".middleHome").style.display="none";
      document.querySelector(".rightHome").style.display="flex";
    }

  

}
handleScroll = e =>{

  
  const container = document.getElementById("chatScroll");

   const {receiver,messages,id} = this.context
   var msg;
   messages.map(chat=>{
     if(chat.Id===receiver._id)
     {
        msg = chat.messages[0]
     }
     return 0;
   })
    if(0===container.scrollTop)
    { 
      axios.get("/"+id+"/getmsg/"+receiver._id+"/"+msg.id).then(res=>
        
        {  
          const {scrollUpdate} = this.context
          if(res.data.messages.length)
          {
            scrollUpdate(res.data.messages)
          }
        })
    } 
}
  
   
 
   
     autoScroll = () => {
      const container = document.getElementById("chatScroll");
      if (container) container.scrollTo(0, container.scrollHeight);
    };
    send = () =>
    { const {postmessage,msgBody} = this.context;
      if(msgBody==="")
    {
      return null;
    } 
      
      postmessage();

    }
    formatSeen = (lastSeen) =>
    { 
       var temp_now = new Date();
       
       let day = lastSeen.getDate();
       let year = lastSeen.getFullYear();
       
       if(temp_now.getFullYear()!==lastSeen.getFullYear()||temp_now.getMonth()!==lastSeen.getMonth())
        {
              
               return "Last seen "+day+"/"+lastSeen.getMonth()+"/"+year
        }
        if(temp_now.getMonth()===lastSeen.getMonth())
        {
            if((temp_now.getDate() - day) === 0)
              {
                let hours = lastSeen.getHours();
                let minutes = lastSeen.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                let strTime = hours + ':' + minutes + ' ' + ampm;
                return "Last seen Today,at "+strTime;
              }
              else if((temp_now.getDate() - day) === 1)
              {let hours = lastSeen.getHours();
                 let minutes = lastSeen.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                let strTime = hours + ':' + minutes + ' ' + ampm;
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
            middleFlag? <div className="middleHome" id="middle" >
              <div className="middleHomeHeader" >
               
           
              <img src="images/back-button.png" alt="#"  id="back-button"  onClick={this.backtoleft} className="back-button"/>
              <Avatar alt="Cindy Baker" src={receiver.path}  />
       
            
                <div className="header-username-section" onClick={this.openSearch}>
                <div className="receiverName" >{receiver.username} </div>
          
              
        <div className="lastSeen">{receiver.isOnline? "Online" : this.formatSeen(new Date(receiver.lastSeen))  }</div>
  
                </div>
  
                  
               </div>
               <div className="chatScroll" onScroll={this.handleScroll}  id="chatScroll">
               <ul className="list-none">
                   {messages.map(msg=>{
                  
                    
                      if(msg.Id===receiver._id)
                     {   var lastmsg =null
                        return( msg.messages.map(m =>{
                         
                        if(m.receiverId===receiver._id)
                        {   if(this.formatMaindate(m,lastmsg))
                             {  lastmsg=m;
                              return( 
                                
                                <li key={m.id}id="send" >
                               <br/>
                                <p className="date-main">{this.formatDisplay(m)}</p>
                                <br/>
                             <SendMessage msgBody={m.msgBody} sentTime={m.sentTime} status={{sent:m.sent,delivered:m.delivered,seen:m.seen}}/>
                             </li>
                            )
                             }
                             else
                             {  lastmsg=m;
                              return( 
                            
                                <li key={m.id} id="send">
                             
                             <SendMessage msgBody={m.msgBody}  sentTime={m.sentTime} status={{sent:m.sent,delivered:m.delivered,seen:m.seen}}/>
                             </li>)
                             }
                            
                        }
                            
                         
                          if(m.senderId===receiver._id)
                         { 
                           if((!m.seen&&document.querySelector(".middleHome").style.display!=="none")||(!m.seen&&document.querySelector(".rightHome").style.display!=="none"))
                           {
                               
                                     seenOnRoom(m);
                           }
                           if(this.formatMaindate(m,lastmsg))
                           {
                            lastmsg=m;
                            return (
                              
                             
                             
                                
                                  <li key={m.id} id="receive">
                            
                                  <p className="date-main">{this.formatDisplay(m)}</p> 
                                  <br/>
                          
                              <ReceiveMessage msgBody={m.msgBody}  sentTime={m.sentTime} />
                              </li>
                              )
                           }
                           else{
                            lastmsg=m;
                            return (<li key={m.id}id="receive" >
                          
                              <ReceiveMessage msgBody={m.msgBody}  sentTime={m.sentTime} />
                              </li>)

                           }

                          
                         }  
                       
                        return null;
                       }))
                    } 
                    return null;
                      }
                      
                     )} 
               </ul>
             
                 </div>
              <div id="chatInputBox">
                 <input onChange={ e => changeMsgBody(e.target.value)} placeholder="Type Something..." className="messageInput" value = {msgBody} />
                  <button onClick={this.send}  className="messageButton">Send</button>
             </div>
    </div>:
            <div className="middleHome middleEmpty"  id="middle"> 
           
               <span  id="back-button" /> 
             
            <h3> Chat Room </h3>
            <img className="middle-img" alt="#"src="./images/chatmiddle.png"/>
          </div>
          );

     
       
    }
}
 
export default MiddleComponent;