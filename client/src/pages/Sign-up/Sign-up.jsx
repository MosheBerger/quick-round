import React, { useState } from 'react'
import AvatarSelector from '../../components/avatar/AvatarSelector.jsx'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar.jsx'

const INITIAL_STATE = { username: '', password: '', email: '' }

function SignUp() {
    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const [avatar, setAvatar] = useState({seedName:'',color:''})
    const { username, email, password } = inputs

    return (<>
        <h1> Sign Up </h1>

        <form className='inputs'>
            <Input name={'username'} value={username} setInput={setInputs} />
            <Input name={'password'} value={password} setInput={setInputs} />
            <br />

            <Input name={'email'} value={email} setInput={setInputs} />
            <br />

            <button type="submit">Enter</button>
            
            <Avatar {...avatar}/>
            <AvatarSelector name={username.trim()} setAvatar={setAvatar} />
        </form>
    </>)
}

export default SignUp