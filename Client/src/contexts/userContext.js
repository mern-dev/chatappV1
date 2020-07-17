import React, { Component,createContext } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
export const UserContext = createContext()

class UserContextProvider extends Component {
  
  state = {
    user: {},
    id:"",
    middleFlag:false,
    receiver:{},
    messages:[],
    newMessages:[],
    msgBody:""
  }

  componentDidMount ()
  {
    let token = window.localStorage.getItem("token")
    
    if(token)
    {
        const decode = jwt_decode(token);
       this.id = decode._id;
        this.setState({id:this.id});
        
        axios.get('/getDetail/'+this.id).then(res =>{
          this.setState({user:res.data.detail})
        })
    }
    const point = "http://localhost:3000/";
    this.socket = io(point);
    
    this.socket.emit("join",{id:this.id})
    this.socket.on("recievingMessage",function(newmsg){

      this.setState({newMessages:[...this.state.newMessage,newmsg]});

    });
  }

 postmessage = () =>
 {   let msgid = uuidv4();
       var newMessage = {
         id: msgid,
         senderId : this.state.id,
         receiverId : this.state.receiver._id,
         msgBody:this.state.msgBody
       }
       console.log("postmessage")
   this.setState({messages:[...this.state.messages,newMessage],msgBody:""});
  this.socket.emit("postingMessage", newMessage);

 }
 changeMsgBody = (newmsgBody) =>
 {
   this.setState({msgBody:newmsgBody})
 }

 
 currentUserUpdate = (details) => {
   
   this.setState({...this.state,receiver:details,middleFlag:true,msgBody:""})
 }


  render() {
  

    return (
      <UserContext.Provider value={{...this.state,currentUserUpdate:this.currentUserUpdate,changeMsgBody:this.changeMsgBody,postmessage:this.postmessage}}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider;
