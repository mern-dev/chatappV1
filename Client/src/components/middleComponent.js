import React, { Component } from 'react';
import ReceiveMessage from "./chatComponents/receivemessage"
import SendMessage from './chatComponents/sendmessage';
import { UserContext } from '../contexts/userContext';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
var FontAwesome = require('react-fontawesome');
class MiddleComponent extends Component {
  static contextType = UserContext;
  
    state = {
     
       scrollUpdate:false,
         date:"pops",
       lastmsg:null

    }
 
    newmsgFormat =(cnt) =>
    {
      if(cnt===1)
        return cnt +" new message"
      else{
        return cnt +" new messages"
      }  
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
  
  
  const {middleFlag,cnt, onlineBottom,Bottom,updateBottom} = this.context;
 
  const container = document.getElementById("chatScroll");
  if(cnt&&container&&middleFlag)
  {
    let t = container.querySelectorAll(".unread-msg-in-room");
    if(t.length)
    {
      
        t[0].parentNode.style.marginBottom ="4px"
      for(let i=1;i<t.length;i++)
        {
          t[i].style.display="none"
        }

    }
  }

  if(cnt&&onlineBottom&&container)
  {
    let t = container.querySelector(".unread-msg-in-room");
   
    if(t)
    { 
      container.style.scrollBehavior="auto";
      
     container.scrollTop=t.offsetTop-container.offsetTop-container.clientHeight/2;
        container.style.scrollBehavior="smooth"
    

    }
  

  }
 else if(middleFlag&&onlineBottom&&container)
  {
 
  
     
     container.style.scrollBehavior="auto";
     container.scrollTop=container.scrollHeight;
     container.style.scrollBehavior="smooth";
   
    
  }
 else if(Bottom&&container)
  { 
     container.style.scrollBehavior="auto";
     container.scrollTop=container.scrollHeight;
     container.style.scrollBehavior="smooth";
     updateBottom(false);
  }
  
  
  
 
 
 
}
 

          
         
       
       


backtoleft = () =>
{ 
this.setState({scrollUpdate:false}) 

const {updatecnt,seenInContext,receiver, onlineBottomUpdate} = this.context
  onlineBottomUpdate(false);
  seenInContext(receiver._id);
  updatecnt(0);
  
  document.querySelector(".middleHome").style.animation="close-chat-anime 0.25s linear 1"
  document.querySelector(".leftHome").style.display="flex";
 
  setTimeout(function(){
    
    document.querySelector(".middleHome").style.display="none"
    
  },100)
 

  
}
  
  

openSearch = () =>{
  let em = parseFloat( getComputedStyle( document.querySelector('body'))['font-size'])
    let width = window.innerWidth / em;
    let height = window.innerHeight/ em;
    const container = document.getElementById("chatScroll");
    if(width<90||height<41)
    {
      if(container.scrollHeight-container.scrollTop!==container.offsetHeight)
                document.getElementById("myBtn").style.display="grid";
             
                document.querySelector(".rightHome").style.animation="open-chat-anime 0.25s linear 1"
                document.querySelector(".rightHome").style.display="flex";
                setTimeout(function(){
                  document.querySelector(".middleHome").style.display="none";
                },100)
   

      
      
    }

  

}

handleScroll = e =>{
  const {onlineBottomUpdate} = this.context;
  onlineBottomUpdate(false);
 const scrollButton = document.getElementById("myBtn")
  
  
  const container = document.getElementById("chatScroll");
  
          
     let t = container.querySelectorAll(".date-main")
   
     for(let i=0;i<t.length;i++)
     {
         
       if(t[i].offsetTop<container.scrollTop+120)
       { 
        this.setState({date:t[i].textContent});
        
       
       }
     
       
     }
     document.querySelector(".date").style.display="table"
     
       if(container.scrollHeight-container.scrollTop===container.offsetHeight)
       {
       
        
        document.querySelector(".date").style.display="none"
        
        
       }
    

       if(container.scrollHeight-container.scrollTop>=container.offsetHeight+container.offsetHeight/2)
       {
         
         scrollButton.style.display="grid";
       }
       if(container.scrollHeight-container.scrollTop<container.offsetHeight+container.offsetHeight/2)
       {
       
        scrollButton.style.display="none"

       }
   const {receiver,messages,id} = this.context
   var msg;
   messages.map(chat=>{
     if(chat.Id===receiver._id)
     {
        msg = chat.messages[0]
     }
     return 0;
   })
    if(0===container.scrollTop&&msg)
    { this.setState({scrollUpdate:true})
     document.querySelector(".date").style.display="none";

      axios.get("/"+id+"/getmsg/"+receiver._id+"/"+msg.id).then(res=>
         { this.setState({scrollUpdate:false}) 
          const {scrollUpdate} = this.context
          if(res.data.messages.length)
          {
            scrollUpdate(res.data.messages)
          }
          else
          { 
             document.querySelector(".top-msg-end").style.display="grid";
             setTimeout(function() {
              document.querySelector(".top-msg-end").style.display="none"
               }, 1000);
            
          }
        })
    } 
}
  
   
 
   
     autoScroll = () => {
      const container = document.getElementById("chatScroll");
      if (container) container.scrollTo(0,container.scrollHeight);
      
    };
    send = () =>
    { const {postmessage,msgBody,updatecnt,seenInContext,receiver,onlineBottomUpdate} = this.context;
    
      if(msgBody==="")
    {
      return null;
    } 
    const container = document.getElementById("chatScroll");
    let t = container.querySelectorAll(".unread-msg-in-room");
    if(t.length)
    {
        
        t[0].parentNode.style.marginBottom ="-2px"
    }
    onlineBottomUpdate(true)
    updatecnt(0)
    seenInContext(receiver._id)
    postmessage();
     

    }
    formatSeen = (lastSeen) => 
    { 
       var temp_now = new Date();
       
       let day = lastSeen.getDate();
       let year = lastSeen.getFullYear();
       let month =lastSeen.getMonth()+1;
       
       if(temp_now.getFullYear()!==lastSeen.getFullYear()||temp_now.getMonth()!==lastSeen.getMonth())
        {
              
               return "Last seen "+day+"/"+month+"/"+year
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
                return "Last seen "+day+"/"+month+"/"+year
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
    softKeyboardView = () =>
    {
      let em = parseFloat( getComputedStyle( document.querySelector('body'))['font-size'])
      let width = window.innerWidth / em
      let height = window.innerHeight/ em
      if(width<60||height<41)
      {
       
        document.querySelector(".home").style.height ="50vh";
        document.body.style.overflow = "hidden";
       
      }
     
    }
    hideSoftKeyboardView = () =>
    { const {typingEnd} = this.context;
       typingEnd();
      let em = parseFloat( getComputedStyle( document.querySelector('body'))['font-size'])
      let width = window.innerWidth / em
      let height = window.innerHeight/ em
      if(width<60||height<41)
      {
       
        document.querySelector(".home").style.height ="100%"
        
       
      }
    }

   scrollButtonPress = () =>
    {    
          const {cntifup,updatecntifup} = this.context;
          const container = document.getElementById("chatScroll");
          if(cntifup)
          {
            let t = container.querySelectorAll(".unread-msg-in-room");
            
            if(t)
            { 
              container.scrollTop=t[0].offsetTop-container.offsetTop-container.clientHeight/2;

               updatecntifup();
               
            }
          }
          else{
            this.autoScroll();
          }
          
       

    }
  

   
    render() { 
         const { receiver,middleFlag,messages,changeMsgBody,msgBody,seenOnRoom,cnt,cntifup} = this.context;
       
        
        return( 
            middleFlag? <div className="middleHome"  id="middle" >
              <div className="middleHomeHeader" >
               
           
             
              <button className="back-button" id="back-button" onClick={this.backtoleft}  ><FontAwesome name="backward" className="BackwardIcon" ></FontAwesome> </button>  
              <Avatar alt="Cindy Baker" src={receiver.path}  />
       
            
                <div className="header-username-section" onClick={this.openSearch}>
                <div className="receiverName" >{receiver.username} </div>
          
              
        <div className="lastSeen">{receiver.isOnline?receiver.isTyping? "Typing....": "Online" : this.formatSeen(new Date(receiver.lastSeen))  }</div>
  
                </div>
  
                  
               </div>
               <div className="top-msg-end">That's it</div>
               <div className="chatScroll"  onScroll={this.handleScroll}  id="chatScroll">
               {this.state.scrollUpdate?<div className="date-main loading-msg"><img src="images/loading-msg.gif"alt="#" className="loading-symbol-inside-chat"/></div>:<span></span>}
              
            <div className="outer-div">   <p className="date">{this.state.date}</p> </div>
               <ul className="list-none">
              
                   {messages.map(msg=>{
                  
                    
                      if(msg.Id===receiver._id)
                     {   var lastmsg =null
                        return( msg.messages.map(m =>{
                         
                        if(m.receiverId===receiver._id)
                        {   if(this.formatMaindate(m,lastmsg))
                             {  lastmsg=m;
                              return( 
                                
                                <li key={m.id} id="sendTop" className="middle-message">
                               
                                <p className="date-main">{this.formatDisplay(m)}</p>
                               
                             <SendMessage msgBody={m.msgBody} sentTime={m.sentTime} status={{sent:m.sent,delivered:m.delivered,seen:m.seen}}/>
                             </li>
                            )
                             }
                             else
                             {  lastmsg=m;
                              return( 
                            
                                <li key={m.id} id="send" className="middle-message">
                              
                             <SendMessage msgBody={m.msgBody}  sentTime={m.sentTime} status={{sent:m.sent,delivered:m.delivered,seen:m.seen}}/>
                             </li>)
                             }
                            
                        }
                       
                       
                          if(m.senderId===receiver._id)
                         { 
                           if(!m.seen&&document.querySelector(".middleHome").style.display!=="none")
                           {
                                   seenOnRoom(m); 
                                     
                                   
                                   
                                  
                                    
                                   
                           }
                           if(this.formatMaindate(m,lastmsg))
                           {
                            lastmsg=m;
                            
                            return (
                              
                             
                             
                                
                                  <li key={m.id}  id="receiveTop" className="middle-message">
                                   {!m.seen?<p className="unread-msg-in-room">{this.newmsgFormat(cnt)}</p>:<span></span>}
                                  <p className="date-main">{this.formatDisplay(m)}</p> 
                                 
                          
                              <ReceiveMessage msgBody={m.msgBody}  sentTime={m.sentTime} />
                              </li>
                              )
                             
                           }
                           else{
                           
                            lastmsg=m;
                            return (<li key={m.id}   id="receive" className="middle-message">
                               {!m.seen?<p className="unread-msg-in-room">{this.newmsgFormat(cnt)}</p>:<span></span>}
                              <ReceiveMessage msgBody={m.msgBody}  sentTime={m.sentTime} />
                              </li>)

                           }

                          
                         }  
                       
                        return null;
                       })
                       )
                    } 
                    return null;
                      }
                      
                     )} 
               </ul>
               
                    <div onClick={this.scrollButtonPress} id="myBtn" title="press to go down"><img src="images/down-arrow.png"alt="#" className="down-arrow"/>{cntifup?<div className='unseen-msg'><p className="center-cnt">{cntifup}</p></div>:<span></span>}</div>
                   
                 </div >
                 <div onBlur={this.hideSoftKeyboardView} id="chatInputBox" >
                 <input onClick={this.softKeyboardView}  onChange={ e => {changeMsgBody(e.target.value);}} placeholder="Type Something..." className="messageInput" value = {msgBody} />
                
            
              
                  <button onClick={e=>{this.send()}}  className="messageButton">Send</button>
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