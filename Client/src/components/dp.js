import React, { Component } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Dp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileInfo: null,
            loaded: '',
            username: '',
            path: '',
            id: '',
            status: ''

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handlenameChange = this.handlenameChange.bind(this);
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token');
        console.log(token);
        if (token) {
            const decode = jwt_decode(token);
            this.id = decode._id;
            this.setState({ id: decode._id });
            this.setState({ username: decode.username });
            console.log(decode._id);
        }
        // else {

        //     window.location = '/';
        // }
    }


    handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];

            this.setState({ fileInfo: file });
        }
        else {
            const status = e.target.value;
            this.setState({ status: status });

        }



    }
    // handlenameChange = (e) => {
    //     const uname = e.target.value;
    //     this.setState({ name: uname });
    // }

    handleClick = (e) => {
        e.preventDefault();


        const formData = new FormData();

        formData.append('image', this.state.fileInfo);
        formData.append('name', this.state.username);
        formData.append('id', this.state.id);
        formData.append('status', this.state.status);


        axios.post('http://localhost:3000/dp', formData, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                })
            },
        })
            .then((res) => {
                this.setState({ path: res.data })
                window.location='/home'
            })
            .catch((err) => console.log(err));

    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleClick}>
                    <input
                        type="file" onChange={this.handleChange}
                    />
                    {/* <input type="text" placeholder="Name" value={this.state.name} onChange={this.handlenameChange} required /> */}

                    <button type="submit" onClick={this.handleClick}>Send</button>
                    <br />
                    <img src={this.state.path} alt="A" width="30%" />
                    <input type='text' name='status' value={this.state.status} onChange={this.handleChange} placeholder='Status' />
                    <button type="submit" onClick={() => window.location = '/home'}>Skip</button>
                </form>
            </div>
        )
    }
}

export default Dp;
