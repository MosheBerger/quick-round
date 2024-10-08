import React, { useState } from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../../BASEURL'
import checkError from '../../utils/checkError'
import ErrorDialog from '../../components/ErrorDialog'
import v from '../../utils/validation'
import userStorage from '../../hooks/userStorage'


const INITIAL_STATE = { email: '', password: '' }

function LogIn() {

    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const { email, password } = inputs

    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (!v.isValid(email, v.type.email)) {
                throw new Error('אימייל לא תקין')
            }
            if (!v.isValid(password, v.type.password)) {
                throw new Error('הסיסמה לא תקינה')
            }

            setLoading(true)

            const res = await fetch(`${BASE_URL}/api/users/login/${email}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ password }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
            const data = await res.json()
            console.log(data);

            checkError(data)
            userStorage.set(data)

            navigate('/lobby#join', {
                state: {user: data}
            })

        } catch (error) {
            console.log('error', error);
            setErrorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const submitDisable = (Object.values(inputs).includes(''))

    return (<>
        <h1> התחברות </h1>

        <div className='inputs'>
            <Input name={'אימייל'} insertTo={'email'} value={email} setInput={setInputs} />
            <Input name={'סיסמה'} insertTo={'password'} value={password} setInput={setInputs} type={'password'} />
            <br />
    
            <button disabled={submitDisable} aria-busy={loading} type="submit" onClick={handleSubmit}>{loading ? 'נכנס' : 'הכנס'}</button>
        </div>

        <ErrorDialog message={errorMessage} setErrorMessage={setErrorMessage} />
    </>)
}

export default LogIn