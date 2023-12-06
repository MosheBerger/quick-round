import React from 'react'

function LogIn() {
    return (<>
        <h1> Log In </h1>

        <div className='inputs'>
            <input type="text" placeholder='username' />
            <input type="text" placeholder='password' />
            <br />
            <button type="submit">Enter</button>
        </div>
    </>)
}

export default LogIn