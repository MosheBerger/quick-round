import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar'

const INITIAL_STATE = { username: '' }

function SetProfile() {

    const navigate = useNavigate()

    const [inputs, handleChange] = useInputs(INITIAL_STATE)

    const { username } = inputs
    const avatar = '-1' + username

    const user = { id: -1, avatar, username }

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate('/lobby', { state: user })
    }

    return (<>
        <h2> בחר שם </h2>

        <div className='flex'>
            <Input name={'שם'} insertTo={'username'} value={username} setInput={handleChange} />
            {<Avatar seedName={username && avatar} />}
        </div>

        <button type="submit" disabled={!username} onClick={handleSubmit}> בא נזוז! </button>
    </>)
}

export default SetProfile