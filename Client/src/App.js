import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../src/components/login';
import Signup from '../src/components/signup';
import Home from './components/home';

import UserContextProvider from './contexts/userContext.js';


function App() {

  
  const [toggle, setToggle] = useState(false);

  const onToggle=()=>{
    setToggle(!toggle);
  }

  return (



    <Router>
  


        


<UserContextProvider>
<Route exact path="/" >
  {(toggle) ? <Signup tog={toggle} toggle={onToggle} /> : <Login  toggle={onToggle} tog={toggle}/>}
</Route>
<Route path="/home" component={Home} />
</UserContextProvider>
      
    

       
     

    </Router>
  
  );
}

export default App;
