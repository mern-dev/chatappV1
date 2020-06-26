import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';
import UserContext from '../context/userContext';

export default class Login extends Component {

    static contextType = UserContext;

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
      //  const { user, setUser } = this.context
        const userr = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/login', userr)
            .then(res => {

               

                // const newUser = { user: this.state.token}

                // setUser(newUser)
                if (res.data.status === 'error') {
                    window.location = '/error'
                }
                else {
                    this.setState({ token: this.state.token })
                    window.location = '/Home'
                }

                // const myStorage = window.localStorage;
                // myStorage.setItem(id,decode.username);
                // const vari = myStorage.getItem(id);
                // console.log(vari);

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
                <form onSubmit={this.handleClick}>
                    <div className="form-group">
                        <label htmlFor="u" >Username:</label>
                        <input id="u" className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="p" >Password:</label>
                        <input id="p" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleClick} disabled={!(this.validateForm())}>Log in</button>

                    {/* <a href="/register" className="badge badge-primary linkk" >Create new account</a> */}
                </form>
            </div>

        );
    }
}