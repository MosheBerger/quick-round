import React, { useEffect, useState } from 'react'
import AvatarSelector from '../../components/avatar/AvatarSelector/AvatarSelector.jsx'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar.jsx'
import BASE_URL from '../../BASE URL.js'
import useDialog from '../../hooks/useDialog.jsx'

const INITIAL_STATE = { username: '', password: '', email: '' }

function SignUp() {
    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const [avatar, setAvatar] = useState({ seedName: '', color: '#ffffff' })
    // const [showAvatarChooser, setShowAvatarChooser] = useState(false)

    const { username, email, password } = inputs

    // const handleOpenCloseAvatarChooser = () => {
    //     setShowAvatarChooser(prev => !prev)
    // }

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

    const [Dialog, avatarSelectorIsOpen, openClose] = useDialog()

    return (<>
        <h1> הרשמה </h1>

        <form className='inputs'>
            <Input name={'שם משתמש'} insertTo={'username'} value={username} setInput={setInputs} />
            <Input name={'סיסמה'} insertTo={'password'} value={password} setInput={setInputs} />
            <br />

            <Input name={'אימייל'} insertTo={'email'} value={email} setInput={setInputs} />
            <br />



            <Dialog title={' בחירת דמות '} open={avatarSelectorIsOpen} close={openClose}>
                <AvatarSelector name={username.trim()} setAvatar={setAvatar} close={openClose} />
            </Dialog>

            <button disabled={username === ''} className={'secondary'} onClick={e => { e.preventDefault(); openClose() }} >
                <Avatar {...avatar}> </Avatar>
                <br />
                בחר דמות
            </button>

            <button disabled={submitDisable} type="submit" onClick={handleSubmit}>Enter</button>
        </form >
    </>)
}

export default SignUp