import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@material-ui/core/Avatar';



import  {UserContext}  from '../../contexts/userContext';


class SimpleChatBrief extends Component {
  static contextType = UserContext;

  
  openChat = (user) =>
  {
    const {currentUserUpdate} = this.context
         currentUserUpdate(user)
         let em = parseFloat( getComputedStyle( document.querySelector('body'))['font-size'])
         let width = window.innerWidth / em
         let height = window.innerHeight/ em
     
         if(width<60||height<41)
         { 
           document.querySelector(".middleHome").style.display="flex";
           document.querySelector(".leftHome").style.display="none";
         }
  }
  render() { 
   
   
    return ( 
      <div className='left-c' >
      <ul className="img-ul">
    {this.props.users.map( (user) =>{ 
      
    return (
    <li className='img-li' key={user._id} onClick={e => this.openChat(user)}>
 
    {user.isOnline?<div className="img-chat"> <Avatar alt="Cindy Baker" src={user.path} /><div className="online-color"></div></div>:<Avatar alt="Cindy Baker" src={user.path} />}
  
   
     <div className="username-simple-chat-brief">
     <h4 className="img-h-simple-brief">{user.username}</h4>
     </div>
   
  
    </li>
     
      )})}
       </ul>  
  </div>);

 }
}
 
export default SimpleChatBrief;