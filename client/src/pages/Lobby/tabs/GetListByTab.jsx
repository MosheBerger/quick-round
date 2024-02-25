
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../BASEURL'
import fetchNow from '../../../utils/fetchNow'
import RoomList from '../components/RoomList'


function GetListByTab({ user, tab, ...rest }) {

    
    const [roomList, setRoomsList] = useState([])
    const [loading, setLoading] = useState(true)


    // refresh data
    useEffect(() => {
        if (tab === 'join')
        fetchNow(`${BASE_URL}/api/rooms`, setRoomsList, setLoading)
        
        else if (tab === 'mine')
        fetchNow(`${BASE_URL}/api/rooms/created-by/${user.id}`, setRoomsList, setLoading)
        
        else if (tab === 'liked')
        fetchNow(`${BASE_URL}/api/rooms/liked/${user.id}`, setRoomsList, setLoading)
  
    }, [tab,user])

    const empty = (roomList.length === 0)

    return (<>
        <article className='unmargin' {...rest}>
            <h4 aria-busy={loading}> רשימת חדרים </h4>
            {!loading && empty && <h2>לא נמצאו חדרים</h2>}

            <figure>
                <RoomList roomList={roomList} hidden={loading || empty} />
            </figure>
        </article>
    </>)
}

export default GetListByTab