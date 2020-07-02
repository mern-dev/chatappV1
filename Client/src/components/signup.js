import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';
import jwt_decode from 'jwt-decode';


export default class Signup extends Component {
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
            matcherror:false

        }
        this.cancel = '';

    }
    componentDidMount() {
        if (window.localStorage.getItem('token')) {
            window.location = '/dp'
        }
    }


    validateForm() {
        
      //  return this.state.username.length > 5 && this.state.password.length > 4 && this.state.password === this.state.confirmPassword;
    //=======commented for testing purpose ===================//
    
     return true;
    }

    handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;

        this.setState({
            ...this.state,
            [name]: value

        })



        //console.log("signup")
        if (name === "username" && value.length>4) {
            if (this.cancel) {
                this.cancel.cancel();
            }
            this.cancel = axios.CancelToken.source();

            axios.get('http://localhost:3000/checkusername/' + value, {
                cancelToken: this.cancel.token
            }).then(res => {

                if (res.data.status === 'error') {
                    this.setState({ ...this.state, usererror: true })
                    console.log("Already existing user");
                }
                else {
                    if (value.length > 3) {
                        this.setState({ ...this.state, usererror: false })
                    }
                    console.log("valid username");

                }
            }).catch((err) => console.log("error"))
        }
    };


    handleClick(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log("clicked")

        axios.post('http://localhost:3000/signup', user)
            .then(res => {
                console.log(res.data.token);

                if (res.data.status === 'error') {

                    window.location = '/error'
                }
                else {

                    this.setState({ token: res.data.token })
                    window.localStorage.setItem('token', this.state.token);
                    window.location = '/dp'
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
        return (
            <div>
                < Form tog={this.props.tog} state={this.state} handleChange={this.handleChange} handleClick={this.handleClick} validateForm={this.validateForm} toggle={this.props.toggle} />
            </div>

        );
    }
}