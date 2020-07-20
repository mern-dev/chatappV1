

import React, { Component } from 'react';


import io from "socket.io-client";

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
   
    
    componentDidMount() {
       
       
       const homeOffline= () =>
        {  
   
           const {offline} = this.context
           offline();
           return undefined
           
        }
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
        //     console.log(this.id);
            // const point = "http://localhost:3000/";
            // this.socket = io(point);
        
            // this.socket.emit("join",{id:this.id});


            // this.socket.on("recievingMessage",function(newmsg){
            //   console.log(newmsg.msgBody);
            // });

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
        const messages = this.context 
               return (

            
            <div className="home">

          
                <div className="chatBox">

                
                    <div className="leftHome">
                          <LeftComponent messages={messages}/>
                
                    </div>
                    
                       <MiddleComponent/>
                       

                

                    <div className="rightHome" id="right">



                    </div>


                </div>

                {/* <div>

             
                </div>
                <h1>U Have Logged In Successfully</h1>
                <button type="submit" onClick={(e)=>{
                    window.localStorage.clear();
                    window.location='/';
                }}>Clear</button>

      <div className="form-group">
                       
                        <input id="p" type="text" className="form-control" name="msgbody" value={this.state.msgBody} onChange={this.handleChange} />
                    </div>


                    <button type="submit" className="btn btn-primary" onClick={this.handleClick} >Send</button>

            </div>
  

        );
         <button type="submit" className="btn btn-primary" onClick={this.handleClick} >Send</button> */}


            </div>
            );

    }
}

export default Home;

