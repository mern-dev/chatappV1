import React from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Navbar from './navbar';





const Form = (props) => {
    const { state, handleChange, handleClick, validateForm, toggle, tog } = props;
    return (
        <div className="comp">

            <Navbar />
            <div className="row">

                <div className="col-6 ">
                    <img className="app-img" src="https://i.pinimg.com/originals/7e/c1/11/7ec111864f7539dce5362ccf235b61a4.png" alt="img" />
                </div>

                <div className="col-6">
                    <form autoComplete="off" onSubmit={handleClick} className="fdiv" >
                        <div className="row">
                            <div className="col-6">

                                <Button variant="contained" color="primary" onClick={toggle}>
                                    {tog ? "Log in" : "Sign up"}
                                </Button>

                            </div>

                        </div>

                        <div className="form-group">
                            {tog ? <TextField id="standard-basic" label="Username" type="text" name="username" value={state.username} helperText={state.username.length > 3 ? state.usererror ? "Invalid username" : "valid username" : "Invalid username"} autoComplete="off" onChange={handleChange} /> :
                                <TextField id="standard-basic" label="Username" type="text" name="username" value={state.username} autoComplete="off" onChange={handleChange} />}
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" type="password" name="password" value={state.password} helperText={state.passerror && "Wrong password"} onChange={handleChange} />
                        </div>

                        {tog && <div className="form-group">
                            <TextField id="standard-basic" label="ConfirmPassword" type="password" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} />

                        </div>}
                        <Button variant="contained" color="primary" onClick={handleClick} disabled={!(validateForm())}>
                            {tog ? "Sign up" : "Log in"}
                        </Button>


                    </form>

                </div>
            </div>
        </div>
    );
}

export default Form;