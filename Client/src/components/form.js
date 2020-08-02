import React from 'react';
import { TextField } from '@material-ui/core';

import Dp from "./dp";







const Form = (props) => {
 
      var showupdateUser = false;
     
    const token = window.localStorage.getItem('token');
   
    if (token) {
       showupdateUser=true;
    }
   
   
    const { stateSignup, handleChange,handleClick, validateForm, toggle, tog,stopAnime } = props;
    const mq_ht = window.matchMedia( "(min-height:  0em) and (max-height: 45em)" );
    const HeightChange = (mq_ht)=>
    {  
       if(mq_ht.matches)
       { 
           
          if(showupdateUser)
          {
              if(document.getElementById("Header-text"))
            document.getElementById("Header-text").style.display="none"
          }
          else
          {
              if( document.getElementById("Header-text"))
              {
                document.getElementById("Header-text").style.display="block"
              }
          }
          
            
       }
       else
       {
        if( document.getElementById("Header-text"))
        {
          document.getElementById("Header-text").style.display="block"
        }
       }
     
    
     }
     if(mq_ht)
         {
         mq_ht.addListener(HeightChange);
       HeightChange(mq_ht);

         }
   
    return (
        <div className="home" id="formApp">
       
           
          

                <div className="chatBox FrontPage">
                
                <div id="Header-text">
                          Chat app
                      </div>
                   <div id="app-feature" className="app-feature-content">
               
                  <div  className="circular-section" >
                    
                <div onClick={stopAnime} className="features"  id="unlock"><img src="images/unlock.gif" alt="#" className="feature-unlock"/></div> 
                   <div onClick={stopAnime} className="features"id="all-devices" ><img src="images/all-devices.gif" alt="#" className="feature-rest"/></div> 
                   <div  onClick={stopAnime} className="features" id="cloud"><img src="images/scroll.gif" alt="#"  className="feature-cloud"/></div> 
                 <div  onClick={stopAnime}className="features" id="scroll"><img src="images/cloud.gif" alt="#"  className="feature-scroll"/></div> 
                  <div  onClick={stopAnime} className="features" id="chat"><img src="images/chat.gif" alt="#"  className="feature-rest"/></div> 
                  </div> 
                 
                 <p className="text-color-first-pg">Chat messenger, No space worry, Scalable,At ourselves direction believing do he departure. Celebrated her had sentiments understood are projection set. Possession ye no mr unaffected remarkably at. Wrote house in never fruit up. Pasture imagine my garrets an he. However distant she request behaved see nothing. Talking settled at pleased an of me brother weather. 

Of resolve to gravity thought my prepare chamber so. Unsatiable entreaties collecting may sympathize nay interested instrument. If continue building numerous of at relation in margaret. Lasted engage roused mother an am at. Other early while if by do to. Missed living excuse as be. Cause heard fat above first shall for. My smiling to he removal weather on anxious. </p>
                
                  
                  
                   </div>
                   {!stateSignup.newUser&&!showupdateUser?
                   <form  autoComplete="off" onSubmit={handleClick} className="FormContent" >
                   
                  

                            
                                <div className="heading-form" >
                            {tog ? "Sign up" : "Log in"}
                              </div>

                         

                 <div className="inputFrom">

                 

                        <div  className="form-group">
                            {tog ? <TextField id="standard-basic" label="Username" type="text" name="username" value={stateSignup.username} helperText={stateSignup.username.length > 4? stateSignup.usererror ? "Invalid username" : "valid username" : ""} autoComplete="off" onChange={handleChange} /> :
                                <TextField id="standard-basic"  label="Username" type="text" name="username" value={stateSignup.username} autoComplete="off" onChange={handleChange} />}
                        </div>
                        <div className="form-group ">
                            <TextField id="standard-basic"  label="Password" type="password" name="password" value={stateSignup.password} helperText={stateSignup.passerror && "username or password is incorrect"} onChange={handleChange} />
                        </div>

                        {tog && <div className="form-group">
                            <TextField id="standard-basic"label="ConfirmPassword" type="password" name="confirmPassword" value={stateSignup.confirmPassword} onChange={handleChange}  />
                            
                        </div>}
                      
                        </div>    
                                <button type="button" onClick={handleClick} disabled={!(validateForm())} class="btn btn-light">Submit</button>

                        <div className="button-signup" onClick={toggle}>
                                    {tog ? "Existing User ?" : "New User ?"}
                                </div>

                               
                    </form>: tog?<Dp />:<span></span> }

                   




                </div>

                </div>
                    
       
       
    );
}

export default Form;