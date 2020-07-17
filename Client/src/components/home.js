

import React, { Component } from 'react';


import io from "socket.io-client";

import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContextProvider, { UserContext } from '../contexts/userContext'
import LeftComponent from './leftComponent';
import MiddleComponent from './middleComponent';



class Home extends Component {
  
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = { messages:[{_id:"1",username:"kishore",dp:"",isOnline:true,recentmsg:{msgBody:"hii da",sentTime:"3.33 pm"}},{id:"2",username:"kokoko",dp:"",isOnline:true,recentmsg:{msgBody:"hii da",sentTime:"3.33 pm"}}] }


    }
    componentDidMount() {
        let token = window.localStorage.getItem("token")
        const decode = jwt_decode(token);
        this.id = decode._id;
         this.setState({id:this.id});
        
        if(token)
        {
            const decode = jwt_decode(token);
           this.id = decode._id;
            this.setState({id:this.id});

            console.log(this.state.id)
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
      
        return (

        
            <div className="home">

          <UserContextProvider>
                <div className="chatBox">

                
                    <div className="leftHome">
                          <LeftComponent messages={this.state.messages}/>
                
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


</UserContextProvider>
            </div>
            );

    }
}

export default Home;

