import React, { Component } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core/';
import ChatIcon from '@material-ui/icons/Chat';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';


class ChatBrief extends Component {
    static contextType = UserContext;

  state = {  }
  formatAMPM =(date) => {

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  openChat = (user) =>
 { const {currentUserUpdate} = this.context
   axios.get("/getDetail/"+user.id).then(res=>{
   
    currentUserUpdate(res.data.detail)
      })
  

  }
  render() { 
    return ( 
      <div className='left-c' >
      <ul className="img-ul">
    {this.props.messages.map( (newmsg) =>{ 
  
    return (<div>
    <li className='img-li row ' key={newmsg.Id} onClick={e => this.openChat({id:newmsg.Id})}>
    <div>
      <Avatar alt="Cindy Baker" src={newmsg.path} className='img-avatar' />
    </div>
    <div className='img-div '>
      <h6 className="img-h">{newmsg.username.length<7?newmsg.username:newmsg.username.substr(0,7)+".."}</h6>
    <p className='img-p'>{newmsg.messages[newmsg.messages.length-1].msgBody.length<=9?newmsg.messages[newmsg.messages.length-1].msgBody:newmsg.messages[newmsg.messages.length-1].msgBody.substr(0,9)+"..."}</p>
    </div>
    <div>
<span className='time'>{this.formatAMPM(new Date(newmsg.messages[newmsg.messages.length-1].sentTime))}</span>
     </div>
          
    </li>
     
     <hr className='hrr' /> </div> )})}
       </ul>  
  </div>);

 }
}
 
export default ChatBrief;