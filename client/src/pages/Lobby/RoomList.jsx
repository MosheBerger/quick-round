import React, { useState } from 'react'
import BASE_URL from '../../baseURL'
import { useNavigate } from 'react-router-dom'
import fetcher from '../../hooks/useFetch'

// const rooms = [
//     { id: '8629177', name: `Minerva's room`, numofplayers: 6, numofrounds: 5, status: 'waiting' },
//     { id: '5526980', name: `Lora's room`, numofplayers: 2, numofrounds: 5, status: 'waiting' },
//     { id: '3200907', name: `Gussie's room`, numofplayers: 7, numofrounds: 13, status: 'waiting' },
//     { id: '618777', name: `Laura's room`, numofplayers: 2, numofrounds: 7, status: 'waiting' },

// ]

function RoomList({ user }) {

    const [roomList, setRoomsList] = useState([])
    fetcher.useInEffect(`${BASE_URL}/api/rooms`, setRoomsList)

    const navigate = useNavigate()


    const handleJoin = async (e, roomId) => {
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}/api/rooms/${roomId}/join/${user.id}`)
            const operation = await res.json()

            console.log(operation);
            if (operation.result) {
                navigate('/game/single-player', { state: { roomId, user } })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLeave = async (e, roomId) => {
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}/api/rooms/${roomId}/leave/${user.id}`)
            const operation = await res.json()

            console.log(operation);
            if (operation.result) {
                navigate('/game/single-player', { state: { roomId, user } })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const join = (id) => { return (e) => handleJoin(e, id) }
    const leave = (id) => { return (e) => handleLeave(e, id) }
    
    const empty = (roomList.length === 0)

    return (<>
        <article>
            <h4 aria-busy={empty}> רשימת חדרים </h4>

            <table hidden={empty}>
                <thead>
                    <tr>
                        <th> שם </th>
                        <th> 👥 </th>
                        <th> 🕹️ </th>
                        {/* <th> מצב </th> */}
                        <th> הצטרפות </th>
                    </tr>
                </thead>

                <tbody >
                    {roomList.map((room) => {
                        const { id, name, status, numofplayers, playersInRoom, numofrounds } = room;

                        return (
                            <tr key={id}>
                                <td>{name}</td>
                                <td><b>{`${numofplayers} / ${playersInRoom}`}</b></td>
                                <td><b>{numofrounds}</b></td>
                                {/* <td>{status}</td> */}
                                <td>
                                    <a href='#b' role='button' onClick={join(id)}>
                                        {status !== 'באמצע משחק' && 'הצטרף'}
                                    </a>
                                    <a href='#a' className='outline' role='button' onClick={leave(id)}>
                                        {status !== 'באמצע משחק' && 'עזוב'}
                                    </a >
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </article>
    </>)
}

export default RoomList