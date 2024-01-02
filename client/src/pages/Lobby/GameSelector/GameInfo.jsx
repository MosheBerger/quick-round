import React, { useState } from 'react'
import BASE_URL from '../../../BASE URL'
import GameSettings from './GameSettings'
import useDialog from '../../../hooks/useDialog'




function GameInfo({ id, name, description, settings, imageurl, genre, choose }) {
    const [Dialog, isOpen, openClose] = useDialog()
    const [userSettings, setSettings] = useState(null)

    const handleChoose = () => {
        if (userSettings) {
            choose()
            return;
        }
        openClose()
    }

    return (
        <article >

            <img src={`${BASE_URL}/assets/${imageurl}`} alt="game" />
            
            <div className='flex sb'>
                <h4 className='unmargin'>{name}</h4>
                <span > קטגוריה: {genre}</span>
            </div>
            <p className='unmargin'> {description} </p>

            <br />
            
            <Dialog title={'הגדרת משחק '+name} open={isOpen} close={openClose} >
                <GameSettings settings={settings} />
            </Dialog>

            <button onClick={handleChoose}> בחר </button>

        </article>
    )
}

export default GameInfo