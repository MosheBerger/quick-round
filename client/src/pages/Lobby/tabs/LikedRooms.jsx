
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RoomList from '../components/RoomList'
import BASE_URL from '../../../BASEURL'
import fetchNow from '../../../utils/fetchNow'


function LikedRooms({ user, ...rest }) {
    const tab = useLocation().hash

    const [roomList, setRoomsList] = useState([])
    const [loading, setLoading] = useState(true)

    // refresh data
    useEffect(() => {
        if (tab === '#liked')
            fetchNow(`${BASE_URL}/api/rooms/liked/${user.id}`, setRoomsList, setLoading)
        
    }, [tab, user])

    const empty = (roomList.length === 0)


    return (<>
        <article className='unmargin' {...rest}>
            <h4 aria-busy={loading}> רשימת חדרים </h4>
            <figure>
                {!loading && empty && <h2>עדיין לא נתת לייק לחדר</h2>}
                <RoomList roomList={roomList} hidden={empty} />
            </figure>
        </article>
    </>)
}

export default LikedRooms