import React, { Component } from 'react';
import ChatBrief from './chatComponents/chatBrief';
import SimpleChatBrief from './chatComponents/SimplechatBrief';

import axios from 'axios';

import  { UserContext } from '../contexts/userContext'
var FontAwesome = require('react-fontawesome');


class LeftComponent extends Component {
    static contextType = UserContext;
   constructor(props)
   {  super(props);
     this.state = { searchResults:[],isPressed:false,id:"",searchQuery:"",profileToggle:false,  fileInfo: null,statusUpdateButton:false,
     loaded: '',
     path: '/images/nodp.png',
     status: '',};

      this.cancel="";
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
  
 

  toggle = () =>{
           this.setState({
            isPressed:!this.state.isPressed,
            searchResults:[],
            searchQuery:""
        })
    }

   profileToggle = () =>
   {
      this.setState({profileToggle:!this.state.profileToggle})
      this.setState({statusUpdateButton:false})
   }
   search = (e) =>
   {     const {id} = this.context
      var value = e.target.value
      this.setState({...this.state,searchQuery:value})
      if (this.cancel) {
         this.cancel.cancel();
     }
     this.cancel = axios.CancelToken.source();

     axios.get(`/${id}/search/` + value, {
         cancelToken: this.cancel.token
     }).then(res => {
       if(res.data.status==="success")
        {
         this.setState({...this.state,searchResults:res.data.users})
         
        }
        else{
           this.setState({...this.state,searchResults:[]})
        }
      
   })
  
   }
   logout = () =>
   {
    window.localStorage.clear();this.props.history.push("/");
   }
   handleChange = (e) => {
      const {id,user, updateUserDetail} = this.context
      if (e.target.type === 'file') {
          if(e.target.files.length===0)
          { 
              return null
          }

         
          const file = e.target.files[0];
          let ls = file.name.split('.');
          let extension = ls[ls.length-1]
         
          if(extension==='png' || extension==='jpg' || extension==='jpeg' || extension==='jpe' || extension==='jif' || extension==='jfif' || extension==='jfi' || extension==='.webp'){ 

              const formData = new FormData();

              formData.append('image', file);
              formData.append('name', user.username);
              formData.append('id', id);

              
             
              axios.post('/dp', formData, {
                  onUploadProgress: ProgressEvent => {
                      this.setState({
                          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                      })
                  },
              })
                  .then((res) => {
                     
                  
                    updateUserDetail({...user,path:res.data})
                   
                  })
                  .catch((err) => console.log(err));

          }
          else{
              alert("choose an image file")
          }
          
      }
      
      else
     {
          const status = e.target.value;
          
          updateUserDetail({...user,status:status})
      }



  }
handlestatus = (e) =>
{
   this.setState({statusUpdateButton:true})
   
}

  handleClick = (e) => {
      e.preventDefault();
  
      this.setState({statusUpdateButton:false})        
         const {user,updateUserDetail} = this.context
         axios.post("/status",{status:user.status,username:user.username}).then(res =>{
             if(res.data.status==="success")
             {       
                updateUserDetail({...user,status:user.status})
             }
             
             else
             {
                 alert("unknown  error");
             }
         })
      
     

      

  }

     render() { 
      const { messages,user} = this.context;     
       if(!this.state.isPressed)

     {   if(this.state.profileToggle)
      {
              return (<div className="leftHome" id="left" >
                
                  <button className="ProfileCloseButton" onClick={this.profileToggle}>  <FontAwesome
          name="close" className="plusIcon"/></button>  
           
                       <div className="profile-page">
                
                       <h4 className="profile-name">{user.username}</h4>
                          
               <div className="inputFrom">
                
                
              <form  onSubmit={this.handleClick}>
                  <div className="dp-setting">
                    <img className="dp"  src={user.path||this.state.path} alt="#" /> 
                    <label for="file-upload"   className="dp-input">
                    change profile
                 </label>
                    <input
                      id="file-upload"
                      type="file" onChange={this.handleChange}
                      placeholder=""
                      />
                  </div>
                 

                  
            
                  
                  
                  
                  {!this.state.statusUpdateButton? <div><div className="contact-status">{user.status?user.status:"no status"}</div><br/><div  class="button-signup skip-button" name='statuschange' onClick={this.handlestatus}>change</div></div>:
                  
                  <div><input type='text' className="status-input" maxlength="30" name="status" value={user.status} onChange={this.handleChange} placeholder='Status' /><br/><button type="submit" class="btn btn-light" name='status' onClick={this.handleClick}>Update</button></div>
      
               }
                  
              </form>
              </div>
          </div>
          <div className="logout" onClick={this.logout}>logout</div>
              </div>)
      }
      else
      {
         return(
            <div className="leftHome" id="left">
          <div className="searchBar">
               <button className="plusButton" title="Add new Friends" onClick={this.toggle} >  <FontAwesome
    name="plus" className="plusIcon"/></button>  
       <h2 >Chats</h2>
       <button className="ProfileButton" onClick={this.profileToggle} title="Your Profile" ><FontAwesome name="user" className="plusIcon" ></FontAwesome> </button>  
      </div>
      
     {messages.length?<ChatBrief messages={messages}/>:<div className="left-c"><h4 className="text-color-left-empty">Click the plus to add friends</h4></div>}  
 
       
      </div>
      );
      }
           

            
      }
         
         
       else
       {

       
        return ( 
             <div className="leftHome" id="left">
            <div className="searchBar">
                <button className="plusButton" onClick={this.toggle}>  <FontAwesome
          name="close" className="plusIcon"/></button>  
            <input  autoComplete="off" name="searchInput" className="searchInputBar" placeholder="Search here.." value={this.state.searchQuery} onChange={this.search}/>

            <button className="searchButton" >  <FontAwesome
          name="search" className="searchIcon"/></button>  
         </div>

            { this.state.searchResults.length===0? <div className="search-img">
        <h3> {this.state.searchQuery?`"${this.state.searchQuery}" not found`:"Search results"}</h3>
                <img className="img-search" alt="#" src="./images/search--v2.png"/>
              </div>:
             

              <SimpleChatBrief users={this.state.searchResults}/>

            
            
            }
            </div>
         );
      }
   }
}
 
export default LeftComponent;

