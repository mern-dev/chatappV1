import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../src/components/login';
import Signup from '../src/components/signup';
import Home from './components/home';
import Error from './components/error';

function App() {

  const [toggle, setToggle] = useState(false);

  const onToggle=()=>{
    setToggle(!toggle);
  }

  return (
    <Router>
      <div className="container">

        <Route path="/home" component={Home} />
        <Route exact path="/" >
          {(toggle) ? <Signup tog={toggle} toggle={onToggle} /> : <Login  toggle={onToggle} tog={toggle}/>}
        </Route>


        <Route path='/error' component={Error} />
      </div>
    </Router>
  );
}

export default App;
