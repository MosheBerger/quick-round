import React from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'

const INITIAL_STATE = { username: '', password: '' }

function LogIn() {

    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const { username, password } = inputs

    // const handleSubmit

    return (<>
        <h1> Log In </h1>

        <div className='inputs'>
            <Input name={'username'} value={username} setInput={setInputs} />
            <Input name={'password'} value={password} setInput={setInputs} type={'password'}/>
            <br />
            <button type="submit">Enter</button>
        </div>
    </>)
}

export default LogIn