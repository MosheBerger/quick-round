
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../BASEURL'
import { useLocation } from 'react-router-dom'
import fetchNow from '../../../utils/fetchNow'
import RoomList from '../components/RoomList'


function AllRooms({ user, ...rest }) {
    const tab = useLocation().hash
    
    const [roomList, setRoomsList] = useState([])
    const [loading, setLoading] = useState(true)


    // refresh data
    useEffect(() => {
        if (tab === '#join')
        fetchNow(`${BASE_URL}/api/rooms`, setRoomsList, setLoading)
    }, [tab])


    return (<>
        <article className='unmargin' {...rest}>
            <h4 aria-busy={loading}> רשימת חדרים </h4>
            <figure>
                <RoomList roomList={roomList} hidden={loading} />
            </figure>
        </article>
    </>)
}

export default AllRooms