import React, { Component } from 'react';
import axios from 'axios';
import Form from './form';



export default class Login extends Component {

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

        axios.post('/login', userr)
            .then(res => {



                if (res.data.status === 'error') {
                    this.setState({ passerror: true });

                }
                else {

                    this.setState({ token: this.state.token })
                    window.localStorage.setItem("token",res.data.token)
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
                < Form tog={this.props.tog} state={this.state} handleChange={this.handleChange} handleClick={this.handleClick} validateForm={this.validateForm} toggle={this.props.toggle} />
            </div>
        );
    }
}