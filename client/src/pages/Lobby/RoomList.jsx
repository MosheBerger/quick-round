
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../BASEURL'
import { useLocation, useNavigate } from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar'
import fetchNow from '../../utils/fetchNow'


function RoomList({ user, ...rest }) {
    const tab = useLocation().hash
    
    const [roomList, setRoomsList] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const handleEnter = async (e, roomId) => {
        e.preventDefault()
        navigate(`/room/${roomId}/play/`, { state: { user } })
        // try {
        //     const res = await fetch(`${BASE_URL}/api/rooms/${roomId}/join/${user.id}`)
        //     const operation = await res.json()


        //     console.log(operation);
        //     if (operation.result) {
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // refresh data
    useEffect(() => {
        if (tab === '#join')
        fetchNow(`${BASE_URL}/api/rooms`, setRoomsList, setLoading)
    }, [tab])

    const Enter = (id) => { return (e) => handleEnter(e, id) }

    const printLikes = (likes) => {
        if (likes < 1) { return '-' }

        if (likes < 5) {
            return new Array(Number(likes)).fill('❤️').join('')
        }
        return likes + '❤️'
    }

    const empty = (roomList.length === 0)

    return (<>
        <article className='unmargin' {...rest}>
            <h4 aria-busy={empty || loading}> רשימת חדרים </h4>
            <figure>
                <table hidden={empty}>
                    <thead>
                        <tr>
                            <th> מנהל </th>
                            <th> שם </th>
                            <th> סבבים </th>
                            <th> שיחקו </th>
                            <th> אהבו </th>
                            <th> כניסה </th>
                        </tr>
                    </thead>

                    <tbody >
                        {roomList.map((room) => {
                            const { id, name, manager: { name: mName, avatar }, likes, userLiked, playCount, numofrounds } = room;

                            return (
                                <tr key={id}>
                                    <td>
                                        <div className='flex col'>
                                            <Avatar seed={'j'} seedName={avatar.split(':')[0]} color={avatar.split(':')[1]} />
                                            <span>{mName}</span>
                                        </div>
                                    </td>
                                    <td>{name + (userLiked ? '❤️' : '')}</td>
                                    <td><b>{numofrounds}</b></td>
                                    <td><b>{playCount}</b></td>
                                    <td>{printLikes(likes)}</td>
                                    <td>
                                        <a href='#b' role='button' onClick={Enter(id)}>
                                            כניסה
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </figure>
        </article>
    </>)
}

export default RoomList