import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@material-ui/core/Avatar';

import { UserContext } from '../../contexts/userContext';
import axios from 'axios';


class ChatBrief extends Component {
    static contextType = UserContext;

  state = {  }
  formatAMPM = (lastSeen) =>
    { // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
       var temp_now = new Date();
     //  let month= months[lastSeen.getMonth()];
       let day = lastSeen.getDate();
       let weekDay = days[lastSeen.getDay()]
       let year = lastSeen.getFullYear().toString().slice(-2);
       

       if(temp_now.getFullYear()!==lastSeen.getFullYear()||temp_now.getMonth()!==lastSeen.getMonth())
        {
              
               return day+"/"+lastSeen.getMonth()+"/"+year
        }
        if(temp_now.getMonth()===lastSeen.getMonth())
        {
            if((temp_now.getDate() - day) === 0)
              {
                var hours = lastSeen.getHours();
                var minutes = lastSeen.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
              }
              else if((temp_now.getDate() - day) === 1)
              {
                return "Yesterday"
              }
              else if((temp_now.getDate() - day) > 7)
              {
                return weekDay;
              }
              else{
                return "Last seen "+day+"/"+lastSeen.getMonth()+"/"+year
              }
        }
     
    }
  unseenMsg = (newmsg) =>{
    var cnt = 0;
    newmsg.messages.map(m =>{
      if(!m.seen && m.senderId === newmsg.Id)
      {
        cnt=cnt+1;
      }
      return 0;
    })
    if(cnt)
    {
      return <div className='unseen-msg'><p className="center-cnt">{cnt}</p></div>
    }

  }
  openChat = (user) =>
 { const {currentUserUpdate,middleFlag} = this.context
 
 const mq_wt2 = window.matchMedia( "(min-width:  90em)" );
 const mq_wt = window.matchMedia( "(min-width:  60em)" );
 
 

 const WidthChange = (mq_wt)=>
  {
      if(!mq_wt.matches)
      { document.getElementById("left").style.display="none";
          document.getElementById("middle").style.display="flex";
         
       
         
          document.getElementById("back-button").style.display="block"
        
        
       
      }
    
    
    else{
      document.getElementById("left").style.display="block";
      document.getElementById("middle").style.display="flex";
          
    document.getElementById("back-button").style.display="none"
    
     
    }
   }
   const WidthChange2 = (mq_wt2)=>
   {  if(middleFlag)
    {
      if(!mq_wt2.matches)
      { 
             document.getElementById("middle").style.display="flex";  
           document.getElementById("right").style.display="none";
         

          document.getElementById("back-button-right").style.display="block"
         
      }
    
    
    else{
     
      document.getElementById("right").style.display="flex";
      document.getElementById("middle").style.display="flex";   
      document.getElementById("back-button-right").style.display="none"
      document.getElementById("back-button").style.display="none"
    
     
    }
    }
      
    }
   
  
   if(matchMedia)
   {
   mq_wt.addListener(WidthChange);
   WidthChange(mq_wt);

   mq_wt2.addListener(WidthChange2)
   WidthChange2(mq_wt2)
   }
  
   
   axios.get("/getDetail/"+user.id).then(res=>{
   
    currentUserUpdate(res.data.detail)
      })
  
     
  }
  lastMessage = (newmsg) =>
  {
    if(newmsg.Id===newmsg.messages[newmsg.messages.length-1].senderId)
     return newmsg.messages[newmsg.messages.length-1].msgBody.length<=9?newmsg.messages[newmsg.messages.length-1].msgBody:newmsg.messages[newmsg.messages.length-1].msgBody.substr(0,9)+"..."
    else
  return newmsg.messages[newmsg.messages.length-1].msgBody.length<=9?"You: "+newmsg.messages[newmsg.messages.length-1].msgBody :"You: "+newmsg.messages[newmsg.messages.length-1].msgBody.substr(0,9)+"..."
  }
  render() { 
    const {clickOpenSearchUpdate} = this.context
    return ( 
      <div className='left-c' >
      <ul className="img-ul">
    {this.props.messages.map( (newmsg) =>{ 
      
    return (<div >
    
    <li className='img-li row ' key={newmsg.Id} onClick={e => {clickOpenSearchUpdate(false);this.openChat({id:newmsg.Id})}}>
    <div>
      <Avatar alt="Cindy Baker" src={newmsg.path} className='img-avatar' />
    </div>
    <div className='img-div '>
      {newmsg.isOnline?<h6 className="img-h">{newmsg.username.length<6?newmsg.username:newmsg.username.substr(0,6)+".."}</h6>:<h5 className="img-h">{newmsg.username.length<6?newmsg.username:newmsg.username.substr(0,6)+".."}</h5>}
      
   <p className="img-p">  {this.lastMessage(newmsg)}</p>
    </div>
    <div>
<span className='time'>{this.formatAMPM(new Date(newmsg.messages[newmsg.messages.length-1].sentTime))}</span>
{this.unseenMsg(newmsg)}
     </div>
          
    </li>
 
     <hr className='hrr' /> </div> )})}
       </ul>  
  </div>);

 }
}
 
export default ChatBrief;