import React from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import { useNavigate } from 'react-router-dom'

const INITIAL_STATE = { username: '', password: '' }

function LogIn() {

    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const { username, password } = inputs

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {username, password} = inputs
        try {
            
            const res = await fetch(`http://localhost:8080/api/login/${username}`,{
                method:'POST',
                body:JSON.stringify({password}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json()
            // console.log(data);
            
            navigate('/lobby',{
                state:data
            })

        } catch (error) {
            console.log(error);
            console.log('whyyyy!');
        }
    }

    return (<>
        <h1> Log In </h1>

        <div className='inputs'>
            <Input name={'username'} value={username} setInput={setInputs} />
            <Input name={'password'} value={password} setInput={setInputs} type={'password'} />
            <br />
            <button type="submit" onClick={handleSubmit}>Enter</button>
        </div>
    </>)
}

export default LogIn