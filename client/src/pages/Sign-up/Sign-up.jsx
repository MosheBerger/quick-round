import React, { useEffect, useState } from 'react'
import AvatarSelector from '../../components/avatar/AvatarSelector.jsx'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar.jsx'

const INITIAL_STATE = { username: '', password: '', email: '' }

function SignUp() {
    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const [avatar, setAvatar] = useState({ seedName: '', color: '' })
    const [showAvatarChooser, setShowAvatarChooser] = useState(false)

    const { username, email, password } = inputs

    const handleOpenCloseAvatarChooser = () => {
        setShowAvatarChooser(prev => !prev)
    }

    useEffect(() => {
        const seedName = username+1
        setAvatar((prev) => ({ ...prev, seedName }))
    }, [username])

    return (<>
        <h1> Sign Up </h1>

        <form className='inputs'>
            <Input name={'username'} value={username} setInput={setInputs} />
            <Input name={'password'} value={password} setInput={setInputs} />
            <br />

            <Input name={'email'} value={email} setInput={setInputs} />
            <br />



            {showAvatarChooser ?
                <AvatarSelector name={username.trim()} setAvatar={setAvatar} close={handleOpenCloseAvatarChooser} />
                :
                <Avatar {...avatar} onClick={handleOpenCloseAvatarChooser} />
            }

            <button type="submit">Enter</button>
        </form>
    </>)
}

export default SignUp