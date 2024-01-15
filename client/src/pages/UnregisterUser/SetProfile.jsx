import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar'

const INITIAL_STATE = { name: '' }

function SetProfile() {

    const navigate = useNavigate()

    const [inputs, handleChange] = useInputs(INITIAL_STATE)

    const { name } = inputs
    const avatar = '-1' + name

    const user = { id: -1, avatar, name }

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate('/lobby', { state: user })
    }

    return (<>
        <h2> בחר שם </h2>

        <div className='flex'>
            <Input name={'שם'} insertTo={'name'} value={name} setInput={handleChange} />
            {<Avatar seedName={name && avatar} />}
        </div>

        <button type="submit" disabled={!name} onClick={handleSubmit}> בא נזוז! </button>
    </>)
}

export default SetProfile