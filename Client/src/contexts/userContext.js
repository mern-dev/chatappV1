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
      cnt:0,
      msgBody:"",
    
      
   }
   

   }
 
  updatecnt = (cnt) =>
  {
    this.setState({cnt:cnt})
  }
      
scrollUpdate =(messagesw)=>
   {  
     this.setState(state=>{
     var  messages = state.messages.map(chat=>{
        if(chat.Id===state.receiver._id)
        {  
          return {Id:chat.Id,username:chat.username,path:chat.path, isOnline:chat.isOnline,messages:[...messagesw,...chat.messages]}
        }
        else{
          return chat
        }
      })
      return{
        messages,
      }
    })
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
         res.data.detail.isOnline=true
          this.setState({user:res.data.detail})
        })
    }
    const point = "http://localhost:3000/";
    this.socket = io(point);
    window.addEventListener("beforeunload", (event)=> {
          
      this.socket.emit("offline",{id:this.state.id,lastSeen:new Date()});
        return undefined;
    })
    
    this.socket.on("isOnline",function(data){
       onlineUpdate(data)
    })
  const onlineUpdate  = (data) =>
  {  
    var messages = [];
    if(this.state.receiver._id===data.id)
    {
      this.setState({receiver:{_id:this.state.receiver._id,username:this.state.receiver.username,path:this.state.receiver.path,isOnline:true,status:this.state.receiver.status,lastSeen:this.state.receiver.lastSeen}})
    }
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === data.id)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:true,messages:chat.messages}  
         }
        
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })

    
  } 
  this.socket.on("lastSeen",function(data){
      
    lastSeenUpdate(data)
    


  })
  const lastSeenUpdate = (data) =>
  {  var messages = [];
    if(this.state.receiver._id===data.id)
    {
      this.setState({receiver:{_id:this.state.receiver._id,username:this.state.receiver.username,path:this.state.receiver.path,isOnline:false,status:this.state.receiver.status,lastSeen:data.lastSeen}})
    }
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{

        if(chat.Id === data.id)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:false,messages:chat.messages}  
         }
        
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })
  }
    this.socket.emit("join",{id:this.id})
    this.socket.on("chat",function(chat){
     
      addChats(chat)
      
     
     });

    const addChats =(chat) =>{
      chat.messages.map(msg=>{
        if(!msg.delivered&&msg.senderId!==this.state.user._id)
        {
          msg.delivered=true;
          this.socket.emit("deliverUpdate", msg);
        }
        return 0;
      })
      this.setState({messages:[...this.state.messages,chat]})
    }
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
          return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:chat.isOnline, messages:chat.messages.map(message=>{
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
          return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:chat.isOnline,messages:chat.messages.map(message=>{
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
              return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:chat.isOnline,messages:chat.messages.map(message=>{
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
    var temp = {};
    
      this.setState(state =>{
      
        if(state.messages.length===0)
        {
          newmsg.msg.delivered=true;
          messages = [{Id:newmsg.msg.senderId,username:newmsg.username,path:newmsg.path,isOnline:newmsg.isOnline,messages:[newmsg.msg]},...state.messages]
           this.socket.emit("deliverUpdate", newmsg.msg);
          
        }
        else{
          let flag = true;
        
          state.messages.map((item)=>{
            if(item.Id===newmsg.msg.senderId)
            {  flag = false;
              
              if(newmsg.msg.receiverId===state.id&&!newmsg.msg.delivered)
              { 
                 newmsg.msg.delivered=true;
                 this.socket.emit("deliverUpdate", newmsg.msg);
                     if(state.receiver._id===newmsg.msg.senderId)
                      {
                        
                            this.setState({cnt:state.cnt+1});
                        
                      }
                  
              }

               temp = {Id:item.Id,username:item.username,path:item.path,isOnline:newmsg.isOnline,messages:[...item.messages,newmsg.msg]}
              

            }
            else
            {
              messages.push(item)
            }
           return 0;
          });
          if(flag)
          {
            newmsg.msg.delivered=true;
            messages = [{Id:newmsg.msg.senderId,username:newmsg.username,path:newmsg.path,isOnline:newmsg.isOnline,messages:[newmsg.msg]},...state.messages]
            this.socket.emit("deliverUpdate", newmsg.msg);
          }
          else
          {
            messages=[temp,...messages]
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
        senderisOnline:true,
        sentTime :sentTime,
        sent:false,
        delivered:false,
        seen:false
      }
      this.socket.emit("postingMessage", newmsg);
      
      
   this.setState(state =>{
    var messages=[];
    var temp={}
     if(state.messages.length===0)
     {
       messages = [{Id:newMessage.receiverId,username:state.receiver.username,path:state.receiver.path,isOnline:state.receiver.isOnline,messages:[newMessage]}]
     }
     else
     {
      let flag = true;
      state.messages.map((item)=>{
       
        if(item.Id===newMessage.receiverId)
         { 
            flag = false;
            temp = {Id:item.Id,username:item.username,path:item.path,isOnline:item.isOnline,messages:[...item.messages,newMessage]}
         }
         else{
           
           messages.push(item)
          
         }
         return 0;
       });
       if(flag)
       {
        messages = [{Id:newMessage.receiverId,username:state.receiver.username,isOnline:state.receiver.isOnline,path:state.receiver.path,messages:[newMessage]},...state.messages]
       }
       else{
         messages.unshift(temp)
       }

     }
     
     return {
       messages,msgBody:""
     }
   });

  

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
        return  {Id:chat.Id,username:chat.username,path:chat.path,  isOnline:chat.isOnline,messages:chat.messages.map(message=>{
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
         return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:chat.isOnline, messages:chat.messages.map(message=>{
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
        seenOnRoom:this.seenOnRoom,offline:this.offline,scrollUpdate:this.scrollUpdate,updatecnt:this.updatecnt}}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider;
