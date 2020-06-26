import React from 'react';





const Form = (props) => {
    const { state, handleChange, handleClick, validateForm, toggle ,tog } = props;
    return (
        <div className="comp">
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Chat-App</span>
                </nav>
            </div>

            <div className="row">

                <div className="col-6 ">
                    <img className="app-img" src="https://www.sketchappsources.com/resources/source-image/awesome-ios-logo-becampanha.jpg" alt="img" />
                </div>

                <div className="col-6">


                    <form onSubmit={handleClick} className="fdiv" >
                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-primary" onClick={toggle}>Sign in</button>
                            </div>
                            {/* <div className="col-6">
                                <button type="button" className="btn btn-primary" onClick={toggle}>Log in</button>
                            </div> */}
                        </div>
                        <div className="form-group " >
                            <label htmlFor="u" >Username:</label>
                            <input id="u" className="form-control" type="text" name="username" value={state.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="p" >Password:</label>
                            <input id="p" type="password" className="form-control" name="password" value={state.password} onChange={handleChange} />
                        </div>
                        {tog &&  <div className="form-group">
                            <label htmlFor="c" >Confirm Password:</label>
                            <input id="c" type="password" className="form-control" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} />
                        </div>}
                         <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={!(validateForm())}>{tog?"Sign up":"Log in"}</button>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default Form;