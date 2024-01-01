import React, { useEffect, useState } from 'react'
import AvatarSelector from '../../components/avatar/AvatarSelector/AvatarSelector.jsx'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar.jsx'
import BASE_URL from '../../BASE URL.js'

const INITIAL_STATE = { username: '', password: '', email: '' }

function SignUp() {
    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const [avatar, setAvatar] = useState({ seedName: '', color: '#ffffff' })
    const [showAvatarChooser, setShowAvatarChooser] = useState(false)

    const { username, email, password } = inputs

    const handleOpenCloseAvatarChooser = () => {
        setShowAvatarChooser(prev => !prev)
    }

    useEffect(() => {
        const seedName = username.trim() + 1
        setAvatar((prev) => ({ ...prev, seedName }))
    }, [username])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}/api/users/signup/${username}`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...inputs, avatar: avatar.seedName + ':' + avatar.color }),
                }
            )
            const data = await res.json()
            console.log(data);

        } catch (error) {
            console.log('error', error);
        }
    }

    const submitDisable = (Object.values(inputs).includes(''))


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
                <div>
                    <button disabled={username === ''} className={'secondary'} onClick={handleOpenCloseAvatarChooser} >
                        <Avatar {...avatar}> </Avatar>
                        <br />
                        בחר דמות
                    </button>
                </div>
            }
            <button disabled={submitDisable} type="submit" onClick={handleSubmit}>Enter</button>
        </form>
    </>)
}

export default SignUp