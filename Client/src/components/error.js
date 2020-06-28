import React from 'react';


function Error() {
    if (window.localStorage.getItem('token')){
    return (
        <div>
            <h1>Please Try Again</h1>
            <a href='/'>Login</a>
        </div>
    );
    }
    else{
        window.location='/';
    }
}

export default Error;