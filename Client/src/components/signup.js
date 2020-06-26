import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        return this.state.username.length > 0 && this.state.password.length > 2;
    }

    handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;

        this.setState({
            ...this.state,
            [name]: value

        })
        if(name=="username")
        {
            if (this.cancel) {
                this.cancel.cancel();
            }
            this.cancel = axios.CancelToken.source();
            console.log(value);
            axios.get('/checkusername/'+value, {
                cancelToken: this.cancel.token
            }).then(res => {
                console.log(res.data.status);
                if (res.data.status === 'error') {
                    console.log("Already existing user");
                }
                else{
                    console.log("valid username");
                }
            })
        }

       
    }
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    // axios.post('/signup', {
    //     username: this.state.username,
    //     password:this.state.password
    //   }, {
    //     cancelToken: source.token
    //   })


    //   source.cancel('Operation canceled by the user.');

    // const CancelToken = axios.CancelToken;
    // let cancel;

    // axios.post('/signup',{
    //     username: this.state.username,
    //     password: this.state.password
    // }, {
    //     cancelToken: new CancelToken(function executor(c) {
    //         // An executor function receives a cancel function as a parameter
    //         cancel = c;
    //     })
    // });

    // // cancel the request
    // cancel();




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
            token: ''
        });

        // window.location = '/'

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleClick}>
                    <div className="form-group">
                        <label htmlFor="u" >Username:</label>
                        <input id="u" className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="p" >Password:</label>
                        <input id="p" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.handleClick} disabled={!(this.validateForm())}>Sign Up</button>
                    {/* <a href="/" classNameName="linkk"></a> */}
                </form>
            </div>

        );
    }
}