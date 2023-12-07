import React from 'react'
import AvatarSelector from '../../components/avatarSelector/AvatarSelector'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'

const defaultInputsValue = { username: '', password: '', country: '', email: '' }

function SignUp() {
    const [inputs, setInputs] = useInputs(defaultInputsValue)
    const { username, country, email, password } = inputs

    return (<>
        <h1> Sign Up </h1>

        <form className='inputs'>
            <Input name={'username'} value={username} setInput={setInputs} />
            <Input name={'password'} value={password} setInput={setInputs} />
            <br />

            <Input name={'country'} value={country} setInput={setInputs} />
            <Input name={'email'} value={email} setInput={setInputs} />
            <br />

            <button type="submit">Enter</button>

            <AvatarSelector  name={username} />
        </form>
    </>)
}

export default SignUp