import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import  { UserContext } from '../contexts/userContext'
import jwt_decode from "jwt-decode";
require("dotenv").config();

export default class Signup extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = {
            username: "",
            password: "",
            confirmPassword: '',
            token: "",
            usererror: true,
            passerror: false,
            matcherror:false,
            newUser:false,

        }
        this.cancel = '';

    }
   


    validateForm() {

        
        return this.state.username.length >= 5 && this.state.username.length <= 10 && this.state.password.length >=6 && this.state.password === this.state.confirmPassword;
    //=======commented for testing purpose ===================//
    
     //return true;
    }

    handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;
         
        this.setState({
            ...this.state,
            [name]: value

        })



     
        if (name === "username" && value.length>4) {
            if (this.cancel) {
                this.cancel.cancel();
            }
            this.cancel = axios.CancelToken.source();

            axios.get(process.env.REACT_APP_BACKEND_URL+'api/checkusername/' + value, {
                cancelToken: this.cancel.token
            }).then(res => {

                if (res.data.status === 'error') {
                    this.setState({ ...this.state, usererror: true })
                    
                }
                else {
                    if (value.length > 3) {
                        this.setState({ ...this.state, usererror: false })
                    }
                   

                }
            }).catch((err) => console.log("error"))
        }
    };


    handleClick(e) {
        e.preventDefault();
        document.getElementById("submitButton").style.pointerEvents="none";
        document.getElementById("submitButton").style.opacity="0.35" 
        const user =
         {
            username: this.state.username,
            password: this.state.password
        }
        const { updatemainLoading,updateId } = this.context
          updatemainLoading(true);

        axios.post(process.env.REACT_APP_BACKEND_URL+'api/signup', user)
            .then(res => {
                updatemainLoading(false)
                document.getElementById("submitButton").style.opacity="1" 
                document.getElementById("submitButton").style.pointerEvents="auto" 
    
                if (res.data.status === 'error') 
                {

                   alert("error")
                }
                else
                 {

                    this.setState({ token: res.data.token,newUser:true })
                    window.localStorage.setItem('token', this.state.token);
                    const decode = jwt_decode(this.state.token);
                    updateId({id:decode._id,username:decode.username});
                    
                   
                }
            });

        this.setState({
            username: "",
            password: "",
            confirmPassword: '',
            token: ''
        });


    }
    render() {

        const {mainLoading} = this.context
        if(mainLoading)
        {
         return <div>
             <Form loading={mainLoading}/>
         </div>

        }
        else
        return (
            <div>
                < Form rootProps={this.props} tog={this.props.tog} loading={mainLoading} stateSignup={this.state} handleChange={this.handleChange} handleClick={this.handleClick} validateForm={this.validateForm} toggle={this.props.toggle} />
            </div>

        );
    }
}