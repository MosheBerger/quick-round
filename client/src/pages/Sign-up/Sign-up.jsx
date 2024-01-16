import React, { useEffect, useState } from 'react'
import AvatarSelector from '../../components/avatar/AvatarSelector/AvatarSelector.jsx'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import Avatar from '../../components/avatar/Avatar.jsx'
import BASE_URL from '../../BASE URL.js'
import useDialog from '../../hooks/useDialog.jsx'
import ErrorDialog from '../../components/ErrorDialog.jsx'
import checkError from '../../utils/checkError.js'
import { useNavigate } from 'react-router-dom'

const INITIAL_STATE = { name: '', password: '', email: '' }

function SignUp() {
    const [inputs, setInputs] = useInputs(INITIAL_STATE)
    const [avatar, setAvatar] = useState({ seedName: '', color: '#ffffff' })
    // const [showAvatarChooser, setShowAvatarChooser] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const { name, email, password } = inputs

    // const handleOpenCloseAvatarChooser = () => {
    //     setShowAvatarChooser(prev => !prev)
    // }
    const navigate = useNavigate()

    useEffect(() => {
        const seedName = name.trim() + 1
        setAvatar((prev) => ({ ...prev, seedName }))
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}/api/users/signup/${email}`,
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
            checkError(data)


            navigate('/lobby', {
                state: { user: data }
            })
        } catch (error) {
            console.log('error', error);
            setErrorMessage(error.message)

        }
    }

    const submitDisable = (Object.values(inputs).includes(''))

    const [Dialog, avatarSelectorIsOpen, openClose] = useDialog()

    return (<>
        <h1> הרשמה </h1>

        <Dialog title={'בחירת דמות וצבע'} open={avatarSelectorIsOpen} close={openClose}>
            <AvatarSelector name={name.trim()} setAvatar={setAvatar} close={openClose} />
        </Dialog>
        
        <form className='inputs'>
            <Input name={'אימייל'} insertTo={'email'} value={email} setInput={setInputs} />
            <Input name={'סיסמה'} insertTo={'password'} value={password} setInput={setInputs} />
            <small> לפחות 8 תווים </small>

            <br />
            <Input name={'שם משתמש'} insertTo={'name'} value={name} setInput={setInputs} />
            <small> לפחות 4 תווים </small>


            <button disabled={name === ''} className={'secondary'} onClick={e => { e.preventDefault(); openClose() }} >
                <Avatar {...avatar}> </Avatar>
                <br />
                בחר דמות
            </button>

            <button disabled={submitDisable} type="submit" onClick={handleSubmit}>Enter</button>
            <ErrorDialog message={errorMessage} setErrorMessage={setErrorMessage} />
        </form >
    </>)
}

export default SignUp