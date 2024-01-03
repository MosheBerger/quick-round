import React, { useState } from 'react'
import BASE_URL from '../../../BASE URL'
import GameSettings from './GameSettings'
import useDialog from '../../../hooks/useDialog'




function GameInfo({ id, name, description, settings, imageurl, genre, choose }) {
    const [Dialog, isOpen, openClose] = useDialog()
    const [userSettings, setUserSettings] = useState(null)

    const handleChoose = () => {
        if (userSettings) {
            choose()
            return;
        }
    }
    const handleGoToSettings = openClose

    return (
        <article >

            <img src={`${BASE_URL}/assets/${imageurl}`} alt="game" />

            <div className='flex sb'>
                <h4 className='unmargin'>{name}</h4>
                <span > קטגוריה: {genre}</span>
            </div>
            <p className='unmargin'> {description} </p>

            <br />
            {isOpen &&
                <Dialog title={'הגדרת משחק ' + name} open={isOpen} close={openClose} >
                    <GameSettings settings={settings} userSettings={userSettings} setUserSettings={setUserSettings} close={openClose} />
                </Dialog>
            }
            
            <button className='secondary' onClick={handleGoToSettings}> {!userSettings ? 'הגדרה': 'הגדר מחדש'} </button>
            {userSettings && <button onClick={handleChoose}> {'בחירה'} </button>}

        </article>
    )
}

export default GameInfo