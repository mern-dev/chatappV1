import React from 'react';


function Home() {
    if (window.localStorage.getItem('token')) {
        return (
            <div>
                <h1>U Have Logged In Successfully</h1>
                <button type="submit" onClick={(e)=>{
                    window.localStorage.clear();
                    window.location='/';
                }}>Log out</button>
            </div>
        );
    }
    else{
        window.location = '/'
    }
   
    
}

export default Home;