import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../src/components/login';
import Signup from '../src/components/signup';
import Home from './components/home';
import Error from './components/error';
import Dp from './components/dp';


function App() {

  const [toggle, setToggle] = useState(false);

  const onToggle=()=>{
    setToggle(!toggle);
  }

  return (



    <Router>
        
      <div>
      



        <Route path  = '/dp' component={Dp} />
        <Route path='/error' component={Error} />
      </div>


        
<Route exact path="/" >
  {(toggle) ? <Signup tog={toggle} toggle={onToggle} /> : <Login  toggle={onToggle} tog={toggle}/>}
</Route>
<Route path='/error' component={Error} />

<Route path="/home" component={Home} />

      
    

       
     

    </Router>
  
  );
}

export default App;
