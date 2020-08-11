import React, { Component,createContext } from 'react'

import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
require("dotenv").config();

export const UserContext = createContext()

class UserContextProvider extends Component {
  
   constructor(props)
   {
     super(props);
     this.state={
      user: {},
      id:"",
      username:"",
      middleFlag:false,
      receiver:{},
      messages:[],
      cnt:0,
      msgBody:"",
      seenUpdateMessages:[],
      onlineBottom:false,
      Bottom:false,
      word:'',
      arrMsg:'',
      arrPos:'',
      arrId:'',
      tog:true,
      data:true,
      cntifup:0,

      withDate:false,
      start:'',
      end:'',
      mainLoading:true,

   }

 
}
handleDate=(nam,val)=>{
  this.setState({[nam]:val});
}



   updateDetail = (user) =>
   {
     
        this.setState({id:user._id,user:user,messages:[],
          middleFlag:false,
          receiver:{},
          cnt:0,
          msgBody:"",
          seenUpdateMessages:[],
          onlineBottom:false,
          Bottom:false,
          word:'',
          arrMsg:'',
          arrPos:'',
          arrId:'',
          tog:true,
          data:true,
          cntifup:0,
    
          withDate:false,
          start:'',
          end:'',
          mainLoading:true,
        })
     
   }   
   updatemainLoading = (value) =>
   {
          this.setState({mainLoading:value})
   }

  updatecntifup = () =>
  {
    this.setState({cntifup:0});
  }
updateData = (val)=>{
  this.setState({ data:val})
}
updateDate = ()=>{
  this.setState({ withDate:!this.state.withDate})
}
updateSearch=()=>{
  
  this.setState({ tog:true,arrId:[],arrMsg:[],arrPos:[],word:'',withDate:false})
}

updateTog = () =>{
  this.setState({ tog: !this.state.tog , arrId:[],arrMsg:[],arrPos:[],word:''})
}

   updateRight = e=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ ...this.state, [name]: value, data: false });
   }
   updateRes = (val)=>{
    this.setState({  arrId: val.arrId, arrPos: val.arrPos, arrMsg: val.arrMsg })
   }

   updateId = (user) =>
   {
     this.setState({id:user.id,username:user.username});
   }

   updateBottom = value =>
   { 
           this.setState({Bottom:value})
   }
 onlineBottomUpdate = (value) =>
 { 
   
   this.setState({onlineBottom:value})
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
          return {Id:chat.Id,username:chat.username,path:chat.path, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:chat.status,isTyping:chat.isTyping,messages:[...messagesw,...chat.messages]}
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
  updateUserDetail = (detail) =>
  {
    
    
    this.setState({user:detail});
   
    this.socketDp.emit("detailUpdate",this.state.user);
  
   
  }

 
  socketOn = () =>{
  const point = process.env.REACT_APP_BACKEND_URL;

  
  const pointOnline = point+'socketOnline'

  this.socketOnline = io(pointOnline) 

  const pointDelivered = point+'socketDelivered' 

  this.socketDelivered = io(pointDelivered) 

  const pointTyping = point+'socketTyping' 

  this.socketTyping = io(pointTyping) 

  const pointSeen = point+'socketSeen' 

  this.socketSeen = io(pointSeen)

  const pointDp = point+'socketDp' 

  this.socketDp =   io(pointDp)

  const pointPost = point+'socketPost'

  this.socketPost = io(pointPost) 

  this.socketPost.emit("join",{id:this.state.id});

  this.socketDp.emit("join",{id:this.state.id});

  this.socketSeen.emit("join",{id:this.state.id});

  this.socketTyping.emit("join",{id:this.state.id});

  this.socketDelivered.emit("join",{id:this.state.id});

   this.socketOnline.emit("join",{id:this.state.id});
   

    this.socketOnline.on("chat",function(chat,loading){

      if(chat!==null)
      {
        addChats(chat);
         

      }
       if(!loading)
      {
        loadingDone()
        

      }
    }) 


     const loadingDone = () =>
     {
      this.setState({mainLoading:false})
     }

    const addChats =(chat) =>{
      
            chat.messages.map(msg=>{
              if(!msg.delivered&&msg.senderId!==this.state.user._id)

              {
                msg.delivered=true;
                this.socketDelivered.emit("deliverUpdate", msg);
              }
              return 0;
            })

        
    
      this.setState({messages:[...this.state.messages,{...chat,isTyping:false}]})
    }





   
  this.socketTyping.on("isTypingUpdate",function(data){
    isTypingUpdate(data,true);
  })
  this.socketTyping.on("isTypingEndUpdate",function(data){
    isTypingUpdate(data,false);
  })
  const isTypingUpdate = (data,value) =>
  {
           
    var messages = [];
    if(this.state.receiver._id===data.id)
    { 
     
      this.setState({receiver:{_id:this.state.receiver._id,isTyping:value,username:this.state.receiver.username,path:this.state.receiver.path,isOnline:this.state.receiver.isOnline,status:this.state.receiver.status,lastSeen:this.state.receiver.lastSeen}})
    }
  
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === data.id)
        {
          return  {Id:chat.Id,username:chat.username,isTyping:value,path:chat.path, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:chat.status,messages:chat.messages}  
         }
        
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })
  }
    
  

 
    this.socketDp.on("addDetailUpdate",function(data)
    {
      
        addDetailUpdate(data);
      
    })
  const addDetailUpdate = (data) =>
  {
    var messages = [];
    if(this.state.user._id===data._id)
    {
      this.setState({user:{...this.state.user,path:data.path,status:data.status}})
    }
    if(this.state.receiver._id===data._id)
    { 
      
      this.setState({receiver:{_id:this.state.receiver._id,isTyping:this.state.receiver.isTyping,username:this.state.receiver.username,path:data.path,isOnline:this.state.receiver.isOnline,status:data.status,lastSeen:this.state.receiver.lastSeen}})
    }
   
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === data._id)
        {
          return  {Id:chat.Id,username:chat.username,isTyping:chat.isTyping,path:data.path, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:data.status,messages:chat.messages}  
         }
        
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })
  }
    
    this.socketOnline.on("isOnline",function(data){
       onlineUpdate(data)
    })
  const onlineUpdate  = (data) =>
  {  
    var messages = [];
    if(this.state.receiver._id===data.id)
    {
      this.setState({receiver:{_id:this.state.receiver._id,isTyping:this.state.receiver.isTyping,username:this.state.receiver.username,path:this.state.receiver.path,isOnline:true,status:this.state.receiver.status,lastSeen:this.state.receiver.lastSeen}})
    }
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === data.id)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path, isOnline:true,lastSeen:chat.lastSeen,status:chat.status,messages:chat.messages,isTyping:chat.isTyping}  
         }
        
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })

    
  } 
  this.socketOnline.on("lastSeen",function(data){
      
    lastSeenUpdate(data)
    


  })
  const lastSeenUpdate = (data) =>
  {  var messages = [];
    if(this.state.receiver._id===data.id)
    {
      this.setState({receiver:{_id:this.state.receiver._id,username:this.state.receiver.username,isTyping:this.state.receiver.isTyping,path:this.state.receiver.path,isOnline:false,status:this.state.receiver.status,lastSeen:data.lastSeen}})
    }
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{

        if(chat.Id === data.id)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping, isOnline:false,lastSeen:chat.lastSeen,status:chat.status,messages:chat.messages}  
         }
        
        else{
          return {...chat}
        }
      })
      
        return {messages,}
      
    })
  }
    
    this.socketPost.on("receivingMessage",function(newmsg){
     addmessage(newmsg);
      
    });
    this.socketPost.on("sentMessageSuccess",function(msg){
      
       sentUpdate(msg);
    })
    this.socketDelivered.on("deliverSuccess",function(msg){
      
      deliverUpdate(msg);
   })
   this.socketSeen.on("seenSuccess",function(msg){
     seenUpdate(msg)
   })
   this.socketPost.on("postingMessgaeDevices",function(msg){
    MessagePostedFromOtherDevices(msg)
  })
  const MessagePostedFromOtherDevices = (msg) =>
  {
    var flag = false
    var t = {}
    var messages = [];
 this.state.messages.map((chat)=>{
        if(chat.Id===msg.receiverId)
        {  
          
           
          if(chat.messages[chat.messages.length-1].id!==msg.id)
          {
             flag = true;
             t = {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:chat.status, messages:[...chat.messages,msg]}
          }
    
        }
        else{
          messages.push(chat);
        }
    return 0;
  })
  if(flag)
  { 
    messages = [t,...messages]
    
   this.setState({messages:messages});
  }
 
}
   const seenUpdate = (msg) =>
   {
    var messages = [];
    this.setState(state =>{
      
      messages = state.messages.map(chat =>{
        if(chat.Id === msg.receiverId)
        {
          return  {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:chat.status,messages:chat.messages.map(message=>{
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
          return  {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:chat.status,messages:chat.messages.map(message=>{
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
              return  {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping, isOnline:chat.isOnline,lastSeen:chat.lastSeen,status:chat.status,messages:chat.messages.map(message=>{
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
    let bflag=false;
      this.setState(state =>{
      
        if(state.messages.length===0)
        {
          newmsg.msg.delivered=true;
          messages = [{Id:newmsg.msg.senderId,username:newmsg.username,isTyping:false,path:newmsg.path,isOnline:newmsg.isOnline,status:newmsg.status,lastSeen:newmsg.lastSeen,messages:[newmsg.msg]},...state.messages]
           this.socketDelivered.emit("deliverUpdate", newmsg.msg);
          
        }
        else{
          let flag = true;
        
          state.messages.map((item)=>{
            if(item.Id===newmsg.msg.senderId)
            {  flag = false;
              
              if(newmsg.msg.receiverId===state.id&&!newmsg.msg.delivered)
              { 
                 newmsg.msg.delivered=true;
                 this.socketDelivered.emit("deliverUpdate", newmsg.msg);
                     if(state.receiver._id===newmsg.msg.senderId)
                      {
                        
                            this.setState({cnt:state.cnt+1});
                            const container = document.getElementById("chatScroll");
                            if(container.scrollHeight-container.scrollTop===container.offsetHeight)
                            bflag=true;
                            else{
                              this.setState({cntifup:state.cntifup+1});
                            } 
                        
                      }
                  
              }

               temp = {Id:item.Id,username:item.username,path:item.path,isOnline:newmsg.isOnline,lastSeen:item.lastSeen,isTyping:item.isTyping,status:item.status,messages:[...item.messages,newmsg.msg]}
              

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
            messages = [{Id:newmsg.msg.senderId,username:newmsg.username,path:newmsg.path,isTyping:false,isOnline:newmsg.isOnline,lastSeen:newmsg.lastSeen,status:newmsg.status,messages:[newmsg.msg]},...state.messages]
            this.socketDelivered.emit("deliverUpdate", newmsg.msg);
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
      if(bflag)
      this.setState({Bottom:true})
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
        senderLastSeen:this.state.user.lastSeen,
        senderStatus:this.state.user.status,
        senderisOnline:true,
        sentTime :sentTime,
        sent:false,
        delivered:false,
        seen:false
      }
      this.socketPost.emit("postingMessage", newmsg);
      
      
   this.setState(state =>{
    var messages=[];
    var temp={}
     if(state.messages.length===0)
     {
       messages = [{Id:newMessage.receiverId,username:state.receiver.username,path:state.receiver.path,isTyping:this.state.receiver.isTyping,isOnline:state.receiver.isOnline,status:state.receiver.status,lastSeen:state.receiver.lastSeen,messages:[newMessage],}]
     }
     else
     {
      let flag = true;
      state.messages.map((item)=>{
       
        if(item.Id===newMessage.receiverId)
         { 
            flag = false;
            temp = {Id:item.Id,username:item.username,path:item.path,isTyping:item.isTyping,isOnline:item.isOnline,status:item.status,lastSeen:item.lastSeen,messages:[...item.messages,newMessage]}
         }
         else{
           
           messages.push(item)
          
         }
         return 0;
       });
       if(flag)
       {
        messages = [{Id:newMessage.receiverId,username:state.receiver.username,isTyping:false,isOnline:state.receiver.isOnline,path:state.receiver.path,status:state.receiver.status,lastSeen:state.receiver.lastSeen,messages:[newMessage]},...state.messages]
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
   this.socketTyping.emit("isTyping",{rid:this.state.receiver._id,uid:this.state.user._id});
 }
seenInContext = (id) =>
{
  var messages = [];
  this.setState(state =>{
    
    messages = state.messages.map(chat =>{
      if(chat.Id === id)
      {
        return  {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping, isOnline:chat.isOnline,status:chat.status,lastSeen:chat.lastSeen, messages:chat.messages.map(message=>{
           if(!message.seen&&message.senderId===id)
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
 seenOnRoom = (msg) =>
 { this.socketSeen.emit("seenUpdate",msg);
   
 }
 currentUserUpdate = (details) => {
   
  
      var messages = [];
      if(this.state.receiver!=={}&&details._id!==this.state.receiver._id)
      {
        this.setState(state =>{
    
          messages = state.messages.map(chat =>{
            if(chat.Id === state.receiver._id)
            {
              return  {Id:chat.Id,username:chat.username,path:chat.path,isTyping:chat.isTyping,isOnline:chat.isOnline,status:chat.status,lastSeen:chat.lastSeen,messages:chat.messages.map(message=>{
                 if(!message.seen&&message.senderId===state.receiver._id)
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
     

        
    
      
      this.setState({receiver:details,middleFlag:true,msgBody:""})
    
   
 }
typingEnd = () =>
{
  this.socketTyping.emit("isTypingEnd",{rid:this.state.receiver._id,uid:this.state.user._id})
}


  render() {
  
    
    return (

      
      <UserContext.Provider value={{...this.state,updateDate:this.updateDate,handleDate:this.handleDate, updateDetail:this.updateDetail,updatemainLoading:this.updatemainLoading,typingEnd:this.typingEnd,updatecntifup:this.updatecntifup, updateUserDetail:this.updateUserDetail,updateId:this.updateId,updateSearch:this.updateSearch,currentUserUpdate:this.currentUserUpdate,changeMsgBody:this.changeMsgBody,postmessage:this.postmessage,
        seenOnRoom:this.seenOnRoom,offline:this.offline,scrollUpdate:this.scrollUpdate,socketOn:this.socketOn,updateData:this.updateData,updatecnt:this.updatecnt,seenInContext:this.seenInContext,updateBottom:this.updateBottom ,onlineBottomUpdate:this.onlineBottomUpdate,updateRight:this.updateRight,updateRes:this.updateRes,updateTog:this.updateTog}}>


  
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider;
