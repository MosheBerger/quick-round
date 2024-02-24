
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import RoomList from '../components/RoomList'
import fetchNow from '../../../utils/fetchNow'
import BASE_URL from '../../../BASEURL'


function MyRooms({ user, ...rest }) {
    const tab = useLocation().hash

    const [roomList, setRoomsList] = useState([])
    const [loading, setLoading] = useState(true)

    // refresh data
    useEffect(() => {
        if (tab === '#mine')
            fetchNow(`${BASE_URL}/api/rooms/created-by/${user.id}`, setRoomsList, setLoading)
    }, [tab, user])


    const empty = (roomList.length === 0)

    return (<>
        <article className='unmargin' {...rest}>
            <h4 aria-busy={loading}> רשימת חדרים </h4>

            {!loading && empty && <h2>עוד לא יצרת חדר</h2>}

            <RoomList roomList={roomList} hidden={empty} />
        </article>
    </>)
}

export default MyRooms