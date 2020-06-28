
import React, { Component } from 'react'

class Home extends Component {

    componentDidMount() {
        console.log(window.localStorage.getItem('token'))

    }

    render() {
        return (
            <div>
                <button type="submit" onClick={(e) => {
                    window.localStorage.clear();
                    window.location = '/';
                }}>Clear</button>

            </div>
        )
    }
}

export default Home
