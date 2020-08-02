import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import  { UserContext } from '../contexts/userContext'
import jwt_decode from "jwt-decode";

export default class Login extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props);

       
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            username: "",
            password: "",
            token: "",
            passerror: false
        }

        
    }
componentDidMount ( )
{
    let token = window.localStorage.getItem("token")
    if(token)
    {
        window.location="/home"

    }
  
}
   stopAnime = () =>
    {  
    //    document.getElementById("unlock").style.animationPlayState="paused"   
    //    document.getElementById("scroll").style.animationPlayState="paused"   
    //    document.getElementById("all-devices").style.animationPlayState="paused"   
    //    document.getElementById("chat").style.animationPlayState="paused"   
    //    document.getElementById("cloud").style.animationPlayState="paused"  
        
    }

    validateForm() {
        return true;
      //  return this.state.username.length > 4 && this.state.password.length > 5;
     //=======commented for testing purpose ===================//
    }

    handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [name]: value
        })

    }

    handleClick(e) {
        e.preventDefault();

        const userr = {
            username: this.state.username,
            password: this.state.password
        }
       const {updateId} = this.context
        axios.post('/login', userr)
            .then(res => {



                if (res.data.status === 'error') {
                    this.setState({ passerror: true });

                }
                else {

                    this.setState({ token: this.state.token })
                    window.localStorage.setItem("token",res.data.token)
                    const decode = jwt_decode(res.data.token);
                    updateId({id:decode._id,username:decode.username});
                    window.location = '/Home'

               

                    this.setState({
                        username: "",
                        password: "",
                        token: ""
                    });

                }


            });
         



    }
    render() {
        return (

            <div>
                < Form tog={this.props.tog} stateSignup={this.state} stopAnime={this.stopAnime} handleChange={this.handleChange} handleClick={this.handleClick} validateForm={this.validateForm} toggle={this.props.toggle} />
            </div>
        );
    }
}