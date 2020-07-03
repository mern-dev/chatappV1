import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

class SearchName extends Component {
    state = { searchResults:[],isPressed:false}


  toggle = () =>{
           this.setState({
            isPressed:!this.state.isPressed
        })
    }
    render() { 
       if(!this.state.isPressed)
       {
            return(

                <div className="searchBar">
                     <button className="plusButton" onClick={this.toggle} >  <FontAwesome
          name="plus" className="plusIcon"/></button>  
             <h2 >Chats</h2>
            </div>

              
            );

       }
       else
       {

       
        return ( 
             
            <div className="searchBar">
                <button className="plusButton" onClick={this.toggle}>  <FontAwesome
          name="close" className="plusIcon"/></button>  
            <input  maxlength="30" name="searchInput" className="searchInputBar" placeholder="Search here.."/>

            <button className="searchButton" >  <FontAwesome
          name="search" className="searchIcon"/></button>  
         
            </div>
         );
      }
   }
}
 
export default SearchName;

