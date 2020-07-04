import React, { Component } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core/';
import ChatIcon from '@material-ui/icons/Chat';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


class ChatBrief extends Component {


  state = {  }
  render() { 
    return ( 
      <div className='left-c' >
      <ul className="img-ul">
    {this.props.messages.map( (user) =>{ 
   
    return (<div>
    <li className='img-li row ' key={user._id}>
    <div>
      <Avatar alt="Cindy Baker" src={user.dp} className='img-avatar' />
    </div>
    <div className='img-div '>
      <h6 className="img-h">{user.username}</h6>
 <p className='img-p'>{user.recentmsg.msgBody}</p>
    </div>
    <div>
<span className='time'>{user.recentmsg.sentTime}</span>
     </div>
          
    </li>
     
     <hr className='hrr' /> </div> )})}
       </ul>  
  </div>);

 }
}

 
export default ChatBrief;