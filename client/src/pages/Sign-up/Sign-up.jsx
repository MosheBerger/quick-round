import React, { useState } from 'react'
import AvatarSelector from '../../components/avatarSelector/AvatarSelector'

const defaultInputsValue = { username: '', password: '', country: '', email: '' }
function SignUp() {
    const [inputs, setInputs] = useState(defaultInputsValue)
    return (<>
        <h1> Sign Up </h1>

        <form className='inputs'>
            <input type="text" placeholder='username' />
            <input type="text" placeholder='password' />
            <br />

            <input type="text" placeholder='country' />
            <input type="text" placeholder='email' />
            <br />

            <button type="submit">Enter</button>

            <AvatarSelector name={username} />
        </form>
    </>)
}

export default SignUp