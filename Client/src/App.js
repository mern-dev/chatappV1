import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../src/components/login';
import Signup from '../src/components/signup';
import Home from './components/home';
import Error from './components/error';

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path='/' component={Login} />
        <Route path="/home" component={Home} />
       
        <Route path="/signup" component={Signup} />
        <Route path='/error' component={Error} />
      </div>
    </Router>
  );
}

export default App;
