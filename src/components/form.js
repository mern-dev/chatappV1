import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dp from "./dp";
import PropTypes from "prop-types";





const styles = {
  root: {
    '& label.Mui-focused': {
      color: 'rgb(197, 157, 157)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    "& .MuiFormLabel-root": {
      color: 'rgb(197, 157, 157)' 
    },
    
    "& .MuiFormHelperText-root":{
      color: 'red'
    },
   
  },
  input: {
    color: "white"
    
  },
  helperText:{
    color:'green'
  },
  // underline: {
  //   color: 'red' ,
  //   '&::after': {
  //     border: '2px solid red'
  //   }
  // }
 
};


const Form = (props) => {

  const { classes } = props;

  
  var showupdateUser = false;


     
    const token = window.localStorage.getItem('token');
   
    if (token) {
       showupdateUser=true;
    }
   
   
    const { stateSignup, handleChange,handleClick, validateForm, toggle, tog,stopAnime,loading,rootProps } = props;
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
    
  if (mq_ht) {
    mq_ht.addListener(HeightChange);
    HeightChange(mq_ht);

  }

  if(loading)
{

   return (<div className="home">

<div className="chatBox FrontPage">
<img className="loading-main" alt="#"src="images/main-loading.gif"/>
  </div>

   </div>)

  }
else
    return (
        <div className="home" id="formApp">
       
           
          

                <div className="chatBox FrontPage">
                
                <div id="Header-text">
                          Textin'

                      </div>
        <div id="app-feature" className="app-feature-content">

          <div className="circular-section" >

            <div onClick={stopAnime} className="features" id="unlock"><img src="images/unlock.gif" alt="#" className="feature-unlock" /></div>
            <div onClick={stopAnime} className="features" id="all-devices" ><img src="images/all-devices.gif" alt="#" className="feature-rest" /></div>
            <div onClick={stopAnime} className="features" id="cloud"><img src="images/scroll.gif" alt="#" className="feature-cloud" /></div>
            <div onClick={stopAnime} className="features" id="scroll"><img src="images/cloud.gif" alt="#" className="feature-scroll" /></div>
            <div onClick={stopAnime} className="features" id="chat"><img src="images/chat.gif" alt="#" className="feature-rest" /></div>
          </div>
           <p className="text-color-first-pg">Messaging web app ,mobile + tablet + pc compatible and cloud follows you.  </p>
          <div className="form-pg"><img src="images/form.png" alt="#" className="form-img"/></div>
     
        </div>
        {!stateSignup.newUser && !showupdateUser ?
          <form autoComplete="off" onSubmit={handleClick} className="FormContent" >




            <div className="heading-form" >
              {tog ? "Sign up" : "Log in"}
            </div>



            <div className="inputFrom">



              <div className="form-group">
                {tog ? <TextField  className={classes.root } InputProps={{className: classes.input}} label="Username" type="text" name="username" value={stateSignup.username} helperText={stateSignup.username.length > 4 ? stateSignup.usererror ? "existing username" : "" : ( stateSignup.username.length > 0) ? 'invalid' :'' } autoComplete="off" onChange={handleChange} /> :
                  <TextField className={classes.root} InputProps={{className: classes.input}} label="Username" type="text" name="username" value={stateSignup.username} autoComplete="off" onChange={handleChange} />}
              </div>
              <div className="form-group ">
               {tog?<TextField    className={classes.root} InputProps={{className: classes.input}} label="Password" type="password" name="password" value={stateSignup.password}   FormHelperTextProps={{
    className: classes.helperText
  }} helperText={stateSignup.password < 6 && stateSignup.password > 0 && "minimum 6 characters"} onChange={handleChange}  />
                :<TextField    className={classes.root} InputProps={{className: classes.input}} label="Password" type="password" name="password" value={stateSignup.password}   FormHelperTextProps={{
    className: classes.helperText
  }} helperText={stateSignup.passerror && "username or password is incorrect"} onChange={handleChange}  />}
              </div>

              {tog && <div className="form-group">
                <TextField  className={classes.root} InputProps={{className: classes.input}}  label="ConfirmPassword" type="password" name="confirmPassword" value={stateSignup.confirmPassword} onChange={handleChange}  FormHelperTextProps={{
    className: classes.helperText
  }} helperText={stateSignup.password !== stateSignup.confirmPassword&&stateSignup.password > 0 && "password not matching"} />
  
              </div>}
            

            </div>
            <button type="button" id="submitButton" onClick={handleClick} disabled={!(validateForm())} className="btn btn-light">Submit</button>

            <div className="button-signup" onClick={toggle}>
              {tog ? "Existing User ?" : "New User ?"}
            </div>


          </form> : tog ? <Dp {...rootProps}/> : <span></span>}






      </div>

    </div>



  );
}
Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);