

import React, { Component } from 'react';



import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

import  { UserContext } from '../contexts/userContext'
import LeftComponent from './leftComponent';
import MiddleComponent from './middleComponent';



class Home extends Component {
     static contextType = UserContext
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        
       

    }
    backtomiddle = ()=>
    { const {clickOpenSearchUpdate} = this.context
         clickOpenSearchUpdate(false)
        document.getElementById("right").style.display="none";
      document.getElementById("middle").style.display="flex";
    }
   
    
    componentDidMount() {
       
       
     
        let token = window.localStorage.getItem("token")
        const decode = jwt_decode(token);
        this.id = decode._id;
         
        
        
        if(token)
        {
            const decode = jwt_decode(token);
           this.id = decode._id;
         

          
        }
        else{

            window.location = '/'
        }
       

    }
    handleChange(e) {
        var value = e.target.value;



        this.setState({

            msgbody: value

        })
    }
    handleClick(e) {
        e.preventDefault();
        const newMessage = {
            msgBody: this.state.msgbody,
            receiverId: this.receiverId,
            senderId: this.id
        }

        this.socket.emit("postingMessage", newMessage);
    }

    render() {
        const {messages,middleFlag} = this.context 
               return (
              
            
            <div className="home">
                  
          
                <div className="chatBox">

                
                    <div className="leftHome" id="left">
                        
                          <LeftComponent messages={messages}/>
                
                    </div>
                    
                       <MiddleComponent />
                       

                

                    {middleFlag?<div className="rightHome" id="right">
                         <div className="back-button-right">
                         <img alt="#" src="images/back-button.png"  id="back-button-right"  onClick={this.backtomiddle} className="back-button"/>
                         </div>
                    

                    </div>:<span></span>}


                </div>

                

            </div>
            );

    }
}

export default Home;

