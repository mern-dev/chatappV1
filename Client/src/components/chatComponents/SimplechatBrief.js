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

  }
  render() { 
   
   
    return ( 
      <div className='left-c' >
      <ul className="img-ul">
    {this.props.users.map( (user) =>{ 
      
    return (<div >
    <li className='img-li row ' key={user._id} onClick={e => this.openChat(user)}>
    <div>
      <Avatar alt="Cindy Baker" src={user.path} className='img-avatar' />
    </div>
    <div className='img-div '>
    <h4 className="img-h">{user.username}</h4>
    </div>
    </li>
     
     <hr className='hrr' /> </div> )})}
       </ul>  
  </div>);

 }
}
 
export default SimpleChatBrief;