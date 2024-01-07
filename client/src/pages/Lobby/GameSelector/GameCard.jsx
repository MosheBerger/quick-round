import React from 'react'
import BASE_URL from '../../../BASE URL'

export default function GameCard({ name, imageurl }) {
    return (
        <>
            <img src={`${BASE_URL}/assets/${imageurl}`} width={'400'} alt="game" />
            <h6 className='unmargin'>{name}</h6>
        </>
    )
}
