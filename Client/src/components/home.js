
import React, { Component } from 'react'

class Home extends Component {
    
    componentDidMount() {
        console.log(window.localStorage.getItem('token'))
        
    }

    render() {
        return (
            <div>
           
        </div>
        )
    }
}

export default Home
