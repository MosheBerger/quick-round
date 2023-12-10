import React, { useState } from 'react'
import RoomList from './RoomList'
import CreateRoom from './CreateRoom'

function Room() {
    const [tab, setTab] = useState('join')

    return (<>
        <h1>Lobby</h1>

        <div >
            <a href='lobby' role='button' className='outline' onClick={(e) => {e.preventDefault(); setTab('join')} } >join room</a>
            <a href='lobby' role='button' className='outline contrast' onClick={(e) => {e.preventDefault(); setTab('create')}}>create room</a>
        </div>

        {tab === 'join' && <RoomList />}
        {tab === 'create' && <CreateRoom/>}

    </>)
}

export default Room