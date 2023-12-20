import React, { useState } from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../../baseURL'

const INITIAL_STATE = { username: '', password: '' }

function LogIn() {

    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const { username, password } = inputs

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, password } = inputs
        //todo format validation
        setLoading(true)
        try {

            const res = await fetch(`${BASE_URL}/api/login/${username}`, {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            // console.log(data);

            navigate('/lobby', {
                state: data
            })

        } catch (error) {
            console.log(error);
            console.log('whyyyy!');

        } finally {
            setLoading(false)
        }
    }

    return (<>
        <h1> התחברות </h1>

        <div className='inputs'>
            <Input name={'שם משתמש'} insertTo={'username'} value={username} setInput={setInputs} />
            <Input name={'סיסמה'} insertTo={'password'} value={password} setInput={setInputs} type={'password'} />
            <br />
            <button aria-busy={loading} type="submit" onClick={handleSubmit}>{loading ? 'נכנס' : 'הכנס'}</button>
        </div>
    </>)
}

export default LogIn