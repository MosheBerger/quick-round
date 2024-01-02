import React from 'react'
import BASE_URL from '../../../BASE URL'
import GameSettings from './GameSettings'
// import useDialog from '../../../hooks/useDialog'




function GameInfo({ id, name, description, settings, imageurl, genre, choose}) {
    // const [Dialog, isOpen, openClose] = useDialog()

    return (
        <article onClick={choose}>
            <h4 className='unmargin'>{name}</h4>
            {/* <span > קטגוריה: {genre}</span> */}
            <h6 className='unmargin'> {description} </h6>

            <img src={`${BASE_URL}/assets/${imageurl}`} alt="game" />

            {/* <Dialog title={'בחירת סבבים'} open={isOpen} close={openClose} > */}
                <GameSettings settings={settings} />
            {/* </Dialog> */}
        </article>
    )
}

export default GameInfo