import React from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';






const Form = (props) => {
    
   
    const { state, handleChange, handleClick, validateForm, toggle, tog } = props;
    return (
        <div className="FirstPage" id="formApp">

           <div className="FirstPageHeader">
            <div className="Header-text">
             Chat App
            </div>
          </div>
          

                <div className="FrontPage">


                   <div className="app-feature-content">
                  <div className="circular-section" >
                <div className="features"  id="unlock"><img src="images/unlock.gif" alt="#" className="feature-unlock"/></div> 
                   <div className="features"id="all-devices" ><img src="images/all-devices.gif" alt="#" className="feature-rest"/></div> 
                   <div className="features" id="cloud"><img src="images/cloud.gif" alt="#"  className="feature-cloud"/></div> 
                 <div className="features" id="scroll"><img src="images/scroll.gif" alt="#"  className="feature-scroll"/></div> 
                  <div className="features" id="chat"><img src="images/chat.gif" alt="#"  className="feature-rest"/></div> 
                  </div> 
                  <div className="feature-text" >
                      
                </div>   
                  
                  
                   </div>
                       
                   <form autoComplete="off" onSubmit={handleClick} className="FormContent" >
                       
                            

                                <Button variant="contained" color="primary" onClick={toggle}>
                                    {tog ? "Log in" : "Sign up"}
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleClick} disabled={!(validateForm())}>
                            {tog ? "Sign up" : "Log in"}
                              </Button>

                         

                   

                        <div className="form-group">
                            {tog ? <TextField id="standard-basic" label="Username" type="text" name="username" value={state.username} helperText={state.username.length > 4? state.usererror ? "Invalid username" : "valid username" : ""} autoComplete="off" onChange={handleChange} /> :
                                <TextField id="standard-basic" label="Username" type="text" name="username" value={state.username} autoComplete="off" onChange={handleChange} />}
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" type="password" name="password" value={state.password} helperText={state.passerror && "username or password is incorrect"} onChange={handleChange} />
                        </div>

                        {tog && <div className="form-group">
                            <TextField id="standard-basic" label="ConfirmPassword" type="password" name="confirmPassword" value={state.confirmPassword} onChange={handleChange}  />
                            
                        </div>}
                      


                    </form>






                </div>

                
                    
                </div>
       
       
    );
}

export default Form;