
import React, { useState } from 'react'
import BASE_URL from '../../BASE URL'
import { useNavigate } from 'react-router-dom'
import fetcher from '../../hooks/useFetch'
import Avatar from '../../components/avatar/Avatar'


function RoomList({ user }) {

    const [roomList, setRoomsList] = useState([])
    fetcher.useInEffect(`${BASE_URL}/api/rooms`, setRoomsList)

    const navigate = useNavigate()


    const handleJoin = async (e, roomId) => {
        e.preventDefault()
        // console.log('join');
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

    // const handleLeave = async (e, roomId) => {
    //     e.preventDefault()
    //     try {
    //         const res = await fetch(`${BASE_URL}/api/rooms/${roomId}/leave/${user.id}`)
    //         const operation = await res.json()

    //         console.log(operation);

    //         fetcher.useNow(`${BASE_URL}/api/rooms`, setRoomsList)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const join = (id) => { return (e) => handleJoin(e, id) }
    // const leave = (id) => { return (e) => handleLeave(e, id) }

    const empty = (roomList.length === 0)

    return (<>
        <article>
            <h4 aria-busy={empty}> רשימת חדרים </h4>

            <table hidden={empty}>
                <thead>
                    <tr>
                        <th> מנהל </th>
                        <th> שם </th>
                        <th> סבבים </th>
                        <th> שיחקו </th>
                        {/* <th> מצב </th> */}
                        <th> כניסה </th>
                    </tr>
                </thead>

                <tbody >
                    {roomList.map((room) => {
                        const { id, name, manager_name, manager_avatar, /* numofplayers, */ playersInRoom, numofrounds } = room;

                        return (
                            <tr key={id}>
                                <td>
                                    <div className='flex col'>
                                        <Avatar seed={'j'} seedName={manager_avatar.split(':')[0]} color={manager_avatar.split(':')[1]} />
                                        <span>{manager_name}</span>
                                    </div>
                                </td>
                                <td>{name}</td>
                                <td><b>{numofrounds}</b></td>
                                <td><b>{/* '${numofplayers} */ `${playersInRoom}`}</b></td>
                                {/* <td>{status}</td> */}
                                <td>
                                    <a href='#b' role='button' onClick={join(id)}>
                                        כניסה
                                    </a>
                                    {/* <a href='#a' className='outline' role='button' onClick={leave(id)}>
                                        עזוב
                                    </a > */}
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