import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';

import jwt_decode from 'jwt-decode';

export default class Login extends Component {

    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            username: "",
            password: "",
            token: ""
        }

    }


    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 2;
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

        axios.post('/', userr)
            .then(res => {

                this.setState({ token: this.state.token })
                console.log(res.data.status);

                if (res.data.status === 'error') {
                    window.location = '/error'
                }
                else {
                    window.location = '/Home'
                }


            });


        this.setState({
            username: "",
            password: "",
            token: ""
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