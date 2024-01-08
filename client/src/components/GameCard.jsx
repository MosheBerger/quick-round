import React, { useRef } from 'react'
import BASE_URL from '../BASE URL'
import fetcher from '../hooks/useFetch'

export default function GameCard({ name, imageurl, id }) {
    const imageRef = useRef()
    const loaded = imageRef.current?.complete

    if (id) {
        const url = `${BASE_URL}/api/games/${id}`
        const [thisGame] = fetcher.useStateAndEffect(url, [])
        name = thisGame?.name
        imageurl = thisGame?.imageurl
    }
    return (
        <>
            <img aria-busy={!loaded} ref={imageRef} src={`${BASE_URL}/assets/${imageurl}`} width={'400'} alt={'תמונת משחק'} />
            <h6 className='unmargin'>{name}</h6>
        </>
    )
}
