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
      
    return (<div>
    <li className='img-li row ' key={user._id} onClick={e => this.openChat(user)}>
    <div>
      <Avatar alt="Cindy Baker" src={user.path} className='img-avatar' />
      
    </div>
     <div className="username-simple-chat-brief">
     <h4 className="img-h">{user.username}</h4>
     </div>
   
  
    </li>
     
     <hr className='hrr' /> </div> )})}
       </ul>  
  </div>);

 }
}
 
export default SimpleChatBrief;