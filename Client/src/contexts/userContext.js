import React, { Component,createContext } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
export const UserContext = createContext()

class UserContextProvider extends Component {
  
   constructor(props)
   {
     super(props);
     this.state={
      user: {},
      id:"",
      middleFlag:false,
      receiver:{},
      messages:[],
    
      msgBody:"",
      
   }
  
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
    this.socket.on("receivingMessage",function(newmsg){
      addmessage(newmsg);
    });
  
   const addmessage= (newmsg)=>{
      console.log(newmsg)
      var messages=[];
     
      this.setState(state =>{
        if(state.messages.length==0)
        {
          messages = [...state.messages,{Id:newmsg.msg.senderId,username:newmsg.senderUsername,path:newmsg.senderPath,messages:[newmsg.msg]}]
        }
        else{
          let flag = true;
          messages = state.messages.map((item)=>{
            if(item.Id===newmsg.msg.senderId)
            {  flag = false;
               return {Id:item.Id,username:item.username,path:item.path,messages:[...item.messages,newmsg.msg]}
            }
            else{
              return {...item}
              
            }
          });
          if(flag)
          {
            messages = [...state.messages,{Id:newmsg.msg.senderId,username:newmsg.senderUsername,path:newmsg.senderPath,messages:[newmsg.msg]}]
          }

        }
       
        return {
          messages,
        }
      });
   
  }
}


 postmessage = () =>
 {   let msgid = uuidv4();
    
       var newMessage = {
         id: msgid,
         senderId : this.state.id,
         receiverId : this.state.receiver._id,
         msgBody:this.state.msgBody
       }
       
   this.setState(state =>{
    var messages=[];
     if(state.messages.length==0)
     {
       messages = [{Id:newMessage.receiverId,username:state.receiver.username,path:state.receiver.path,messages:[newMessage]}]
     }
     else
     {
      let flag = true;
      messages = state.messages.map((item)=>{
       
        if(item.Id===newMessage.receiverId)
         { 
            flag = false;
            return {Id:item.Id,username:item.username,path:item.username,messages:[...item.messages,newMessage]}
         }
         else{
           
           return {...item}
          
         }
       });
       if(flag)
       {
        messages = [...state.messages,{Id:newMessage.receiverId,username:state.receiver.username,path:state.receiver.path,messages:[newMessage],len:1}]
       }

     }
     
     return {
       messages,msgBody:""
     }
   });
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
