import React, { useState } from 'react'
import BASE_URL from '../../baseURL'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

// const rooms = [
//     { id: '8629177', name: `Minerva's room`, numofplayers: 6, numofrounds: 5, status: 'waiting' },
//     { id: '5526980', name: `Lora's room`, numofplayers: 2, numofrounds: 5, status: 'waiting' },
//     { id: '3200907', name: `Gussie's room`, numofplayers: 7, numofrounds: 13, status: 'waiting' },
//     { id: '618777', name: `Laura's room`, numofplayers: 2, numofrounds: 7, status: 'waiting' },

// ]

function RoomList({user}) {

    const [roomList, setRoomsList] = useState([])
    useFetch(`${BASE_URL}/api/rooms`, setRoomsList)
    
    const navigate = useNavigate()


    const handleJoin = async (roomId) => {
        try {
            const res = await fetch(`${BASE_URL}/api/rooms/${roomId}/join/${user.id}`)
            const operation = await res.json()

            console.log(operation);
            if (operation.result) {
                navigate('/game/single-player',{state:{roomId,user}})
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                                    <button onClick={() => {handleJoin(id)}}>
                                        {status !== 'באמצע משחק' && 'הצטרף'}
                                    </button>
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