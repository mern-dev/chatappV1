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
          console.log(res.data.detail)
          this.setState({user:res.data.detail})
        })
    }
    const point = "http://localhost:3000/";
    this.socket = io(point);
   
    this.socket.emit("join",{id:this.id})
    this.socket.on("receivingMessage",function(newmsg){
     addmessage(newmsg);
      
    });
    this.socket.on("sentMessageSuccess",function(msg){
      
       sentUpdate(msg);
    })
    this.socket.on("deliverSuccess",function(msg){
      
      deliverUpdate(msg);
   })
   this.socket.on("seenSuccess",function(msg){
     seenUpdate(msg)
   })
   const seenUpdate = (msg) =>
   {
    var messages = [];
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === msg.receiverId)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path, messages:chat.messages.map(message=>{
             if(msg.id===message.id)
             {
               return {sentTime:message.sentTime,id:message.id,sent:message.sent,delivered:message.delivered,seen:true,msgBody:message.msgBody,receiverId:message.receiverId,senderId:message.senderId}
             }  
             else
             {
               return {...message}
             }
          }) 
         }
        }
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })

   }
   const deliverUpdate = (msg) =>
   {
    var messages = [];
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === msg.receiverId)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path, messages:chat.messages.map(message=>{
             if(msg.id===message.id)
             {
               return {sentTime:message.sentTime,id:message.id,sent:message.sent,delivered:true,seen:message.seen,msgBody:message.msgBody,receiverId:message.receiverId,senderId:message.senderId}
             }  
             else
             {
               return {...message}
             }
          }) 
         }
        }
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })

   }
   const sentUpdate = (msg) =>{
        var messages = [];
        this.setState(state =>{
          
          messages = state.messages.map(chat =>{
            if(chat.Id === msg.receiverId)
            {
              return  {Id:chat.Id,username:chat.username,path:chat.path, messages:chat.messages.map(message=>{
                 if(msg.id===message.id)
                 {
                   return {sentTime:message.sentTime,id:message.id,sent:true,delivered:message.delivered,seen:message.seen,msgBody:message.msgBody,receiverId:message.receiverId,senderId:message.senderId}
                 }  
                 else
                 {
                   return {...message}
                 }
              }) 
             }
            }
            else{
              return {...chat}
            }
          })
          
            return {messages,}
          
        })

   }
   const addmessage= (newmsg)=>{
      
      var messages=[];
    
      this.setState(state =>{
        if(state.messages.length==0)
        {
          newmsg.msg.delivered=true;
          messages = [...state.messages,{Id:newmsg.msg.senderId,username:newmsg.senderUsername,path:newmsg.senderPath,messages:[newmsg.msg]}]
           this.socket.emit("deliverUpdate", newmsg.msg);
          
        }
        else{
          let flag = true;
          messages = state.messages.map((item)=>{
            if(item.Id===newmsg.msg.senderId)
            {  flag = false;
              
              if(newmsg.msg.receiverId===state.id&&!newmsg.msg.delivered)
              { 
                 newmsg.msg.delivered=true;
                  this.socket.emit("deliverUpdate", newmsg.msg);
              }
               return {Id:item.Id,username:item.username,path:item.path,messages:[...item.messages,newmsg.msg]}
            }
            else{
              return {...item}
              
            }
          });
          if(flag)
          {
            newmsg.msg.delivered=true;
            messages = [...state.messages,{Id:newmsg.msg.senderId,username:newmsg.senderUsername,path:newmsg.senderPath,messages:[newmsg.msg]}]
            this.socket.emit("deliverUpdate", newmsg.msg);
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
 const sentTime =  new Date();
 
       var newMessage = {
         id: msgid,
         senderId : this.state.id,
         receiverId : this.state.receiver._id,
         msgBody:this.state.msgBody,   
         sentTime: sentTime,
         sent:false,
         delivered:false,
         seen:false
       }
       var newmsg = {
        id: msgid,
        senderId : this.state.id,
        receiverId : this.state.receiver._id,
        msgBody:this.state.msgBody,
        senderUsername:this.state.user.username,
        senderPath:this.state.user.path, 
        sentTime :sentTime,
        sent:false,
        delivered:false,
        seen:false
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
            return {Id:item.Id,username:item.username,path:item.path,messages:[...item.messages,newMessage]}
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

  this.socket.emit("postingMessage", newmsg);

 }
 changeMsgBody = (newmsgBody) =>
 {
   this.setState({msgBody:newmsgBody})
 }

 seenOnRoom = (msg) =>
 {
  var messages = [];
  this.setState(state =>{
    
    messages = state.messages.map(chat =>{
      if(chat.Id === msg.senderId)
      {
        return  {Id:chat.Id,username:chat.username,path:chat.path, messages:chat.messages.map(message=>{
           if(message.id===msg.id&&message.senderId===chat.Id)
           { this.socket.emit("seenUpdate",message)
             return {sentTime:message.sentTime,id:message.id,sent:message.sent,delivered:message.delivered,seen:true,msgBody:message.msgBody,receiverId:message.receiverId,senderId:message.senderId}
           }  
           else
           {
             return {...message}
           }
        }) 
       }
      }
      else{
        return {...chat}
      }
    })
    
      return {messages,}
    
  })
 }
 currentUserUpdate = (details) => {
   
   this.setState({...this.state,receiver:details,middleFlag:true,msgBody:""})
   var messages = [];
   this.setState(state =>{
     
     messages = state.messages.map(chat =>{
       if(chat.Id === details._id)
       {
         return  {Id:chat.Id,username:chat.username,path:chat.path, messages:chat.messages.map(message=>{
            if(!message.seen&&message.senderId===details._id)
            { this.socket.emit("seenUpdate",message)
              return {sentTime:message.sentTime,id:message.id,sent:message.sent,delivered:message.delivered,seen:true,msgBody:message.msgBody,receiverId:message.receiverId,senderId:message.senderId}
            }  
            else
            {
              return {...message}
            }
         }) 
        }
       }
       else{
         return {...chat}
       }
     })
     
       return {messages,}
     
   })
   
 }


  render() {
  
   
    return (
      <UserContext.Provider value={{...this.state,currentUserUpdate:this.currentUserUpdate,changeMsgBody:this.changeMsgBody,postmessage:this.postmessage,
        seenOnRoom:this.seenOnRoom}}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider;
