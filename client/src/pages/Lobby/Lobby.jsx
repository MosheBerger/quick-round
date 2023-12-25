import React, { useState } from 'react'
import RoomList from './RoomList'
import CreateRoom from './CreateRoom'
import { useLocation } from 'react-router-dom'

function Room() {
    const [tab, setTab] = useState('join')

    const user = useLocation().state
    console.log(user);

    const handleClick = (e) => {
        e.preventDefault()
        const operation = e.target.name
        setTab(operation)
    }

    const join = (tab === 'join')
    const create = (tab === 'create')
    return (<>
        <header>

            <h1> לובי </h1>

            <div >
                <a href='#join' name='join' role='button' className={join ? '':'outline'} onClick={handleClick} >
                    הצטרף
                </a>
                <a href='#create' name='create' role='button' className={create ?  '':'outline'} onClick={handleClick}>
                    צור חדר
                </a>
            </div>

        </header>
        {join && <RoomList user={user} />}
        {create && <CreateRoom  user={user} />}

    </>)
}

export default Room