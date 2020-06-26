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
            confirmPassword:'',
            token: ""


        }
        this.cancel = '';

    }
    componentDidMount() {
        if (window.localStorage.getItem('token')) {
            window.location = '/home'
        }

    }


    validateForm() {
        return this.state.username.length > 3 && this.state.password.length > 4;
    }

    handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;

        this.setState({
            ...this.state,
            [name]: value

        })

        if (this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        
        axios.get('/checkusername/' + value, {
            cancelToken: this.cancel.token
        }).then(res => {
            
            if (res.data.status === 'error') {
                console.log("Already existing user");
            }
            else {
                console.log("valid username");
            }
        })
    };


    handleClick(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/signup', user)
            .then(res => {

                this.setState({ token: res.data.token })
                window.localStorage.setItem('token', this.state.token);
                if (res.data.status === 'error') {

                    window.location = '/error'
                }
                else {
                    window.location = '/home'
                }
            });

        this.setState({
            username: "",
            password: "",
            confirmPassword:'',
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