import React, { useState } from 'react'
import fetcher from '../../hooks/useFetch'
import BASE_URL from '../../BASEURL';
import { Link, useParams } from 'react-router-dom';
import ScoreTable from './ScoreTable';
import userStorage from '../../hooks/userStorage';
import useReturnToHomeIfNoUser from '../../hooks/useReturnToHomeIfNoUser';
import Like from './Like';
import RoomList from '../Lobby/components/RoomList';

function ScoreBoard() {
    const user = userStorage.useGet()
    useReturnToHomeIfNoUser()

    const roomId = parseInt(useParams('roomId').roomId)

    const url = `${BASE_URL}/api/rooms/${roomId}`
    const [room, loading, setLoading, setRoom] = fetcher.useStateAndEffect(url)

    async function refresh() {
        try {
            setLoading(true)

            const res = await fetch(url)
            const data = await res.json()

            setRoom(data)
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }


    const BackToLobby = <Link to={'/lobby#join'} state={user} ><button> בחזרה ללובי </button></Link>


    return (<div >

        <h1>לוח ניקוד</h1>

        {!room ?
            <div aria-busy="true">טוען</div>


            : <>

                <div className='flex'>
                    <h2>{room.name}</h2>
                    <h4> מנהל: {room.manager.name} </h4>
                </div>

                {BackToLobby}

                <ScoreTable
                    room={room}
                    title={'תוצאות'}
                />

                <br />
                <Like
                    likes={room.likes} refresh={refresh}
                    loading={loading} setLoading={setLoading}
                    roomId={roomId}
                />
                {/* <RoomList roomList={[room]} /> */}
                {BackToLobby}
            </>
        }

    </div >)
}

export default ScoreBoard