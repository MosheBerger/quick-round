import React, { useEffect, useState } from 'react'
import HeartIcon from '../../components/Icons/Heart'
import BASE_URL from '../../BASEURL'
import userStorage from '../../hooks/userStorage'
import checkError from '../../utils/checkError'

function Like({ likes, refresh, loading, setLoading, roomId }) {

    const [isLiked, setLiked] = useState(false)
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const url = `${BASE_URL}/api/rooms/${roomId}/like`
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        // "Content-Type": "application/json",
                        "authorization": userStorage.getToken()
                    },
                })

                const data = await res.json()
                checkError(data)
                console.log(data)
                setLiked(data.isLiked)
                setFetched(true)

            } catch (error) {
                console.log(error)
            }
        }
        if (!fetched) {
            getData()
        }
    }, [fetched, setFetched, roomId])

    likes = loading ? likes + '...' : likes

    const handleClick = async () => {
        setLiked(!isLiked)
        setLoading(true)
        console.log(isLiked)
        try {
            const url = `${BASE_URL}/api/rooms/${roomId}/like`
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": userStorage.getToken()
                },
                body: JSON.stringify({ likeIt: !isLiked })

            })

            const data = await res.json()
            checkError(data)

            refresh()

        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <article className='unmargin' style={{ maxWidth: '160px' }}>
            <span>{!fetched ? 'טוען' : isLiked? 'אהבת!' : 'שים לייק'}</span>
            <br />
            {fetched ?
                <HeartIcon amount={likes} color={isLiked} onClick={handleClick} />
            :
            <div aria-busy={true} />
            }
        </article>
    </>)
}

export default Like