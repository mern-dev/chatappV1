import React from 'react';


function Home() {
    return (
        <div>
            <h1>U Have Logged In Successfully</h1>
            <button type="submit" onClick={(e)=>{
                window.localStorage.clear();
                window.location='/signup';
            }}>Clear</button>
        </div>
    );
}

export default Home;