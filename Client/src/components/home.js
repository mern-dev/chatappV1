
import React, { Component } from 'react';
import io from "socket.io-client";
import jwt_decode from "jwt-decode";    



class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = { id: "",messages:[] }
          


    }

    componentDidMount() {
        let token=window.localStorage.getItem("token")
        
        if(token)
        {
            const decode = jwt_decode(token);
           this.id = decode._id;
            this.setState({id:this.id});
            console.log(this.state.id)
        }
        else{

            window.location = '/signup'
        }
        console.log(this.id);
        const point = `http://localhost:3000/`;
        this.socket = io(point);
        this.socket.on(`/recievingMessage/${this.id}`,newmsg => {
          console.log(newmsg.msgBody);
        });
          
    }
    render() { 
        return (
            <div>
                <div>
                 
                </div>
                <h1>U Have Logged In Successfully</h1>
                <button type="submit" onClick={(e)=>{
                    window.localStorage.clear();
                    window.location='/signup';
                }}>Clear</button>
            </div>
        );
    }
}
 
export default Home;