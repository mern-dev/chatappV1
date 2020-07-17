import React, { Component } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core/';
import ChatIcon from '@material-ui/icons/Chat';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { UserContext } from '../../contexts/userContext';


class ChatBrief extends Component {
    static contextType = UserContext;

  state = {  }
  render() { 
    return ( 
      <div className='left-c' >
      <ul className="img-ul">
    {this.props.messages.map( (newmsg) =>{ 
  
    return (<div>
    <li className='img-li row ' key={newmsg.Id}>
    <div>
      <Avatar alt="Cindy Baker" src={"/"+newmsg.path} className='img-avatar' />
    </div>
    <div className='img-div '>
      <h6 className="img-h">{newmsg.username}</h6>
    <p className='img-p'>{newmsg.messages[newmsg.messages.length-1].msgBody}</p>
    </div>
    <div>
<span className='time'>2.33 pm</span>
     </div>
          
    </li>
     
     <hr className='hrr' /> </div> )})}
       </ul>  
  </div>);

 }
}
 
export default ChatBrief;