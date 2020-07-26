import React, { Component } from 'react';
import ChatBrief from './chatComponents/chatBrief';
import SimpleChatBrief from './chatComponents/SimplechatBrief';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import {UserContext} from '../contexts/userContext';
var FontAwesome = require('react-fontawesome');


class LeftComponent extends Component {
    static contextType = UserContext;
   constructor(props)
   {  super(props);
     this.state = { searchResults:[],isPressed:false,id:"",searchQuery:""};

      this.cancel="";
   }
   
  componentDidMount()
  { 
   let token = window.localStorage.getItem("token")
   const decode = jwt_decode(token);
   this.id = decode._id;
    this.setState({...this.state,id:this.id});

  }
  toggle = () =>{
           this.setState({
            isPressed:!this.state.isPressed,
            searchResults:[],
            searchQuery:""
        })
    }

   search = (e) =>
   {     
      var value = e.target.value
      this.setState({...this.state,searchQuery:value})
      if (this.cancel) {
         this.cancel.cancel();
     }
     this.cancel = axios.CancelToken.source();

     axios.get(`/${this.state.id}/search/` + value, {
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
     render() { 
      const { messages } = this.context;     
       if(!this.state.isPressed)
     { 
            return(
               <div className="leftHome" id="left">
             <div className="searchBar">
                  <button className="plusButton" onClick={this.toggle} >  <FontAwesome
       name="plus" className="plusIcon"/></button>  
          <h2 >Chats</h2>
         
         </div>
         
        <ChatBrief messages={messages}/>  
    
          
         </div>
         );

            
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

