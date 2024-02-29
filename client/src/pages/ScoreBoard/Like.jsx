import React, { useState } from 'react'
import HeartIcon from '../../components/Icons/Heart'
import BASE_URL from '../../BASEURL'
import userStorage from '../../hooks/userStorage'
import checkError from '../../utils/checkError'

function Like({ likes, refresh, loading,setLoading, roomId }) {

    const [isLiked, setLiked] = useState(false)

    likes = loading ? likes + '...' : likes

    const handleClick = async () => {
        setLiked(!isLiked)
        setLoading(true)
        try {
            const url = `${BASE_URL}/api/rooms/${roomId}/like`
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization":  userStorage.getToken()
                },
                body: JSON.stringify({likeIt:!isLiked})
                
            })
           
            const data = await res.json()
            checkError(data)

            refresh()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <article style={{ maxWidth: '150px' }}>
            <span>שים לייק</span>
            <br />
            <HeartIcon amount={likes} color={isLiked} onClick={handleClick} />
        </article>
    )
}

export default Like