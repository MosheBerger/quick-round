import React, { useState } from 'react'
import BASE_URL from '../../../BASE URL'
import GameSettings from './GameSettings'
import useDialog from '../../../hooks/useDialog'




function GameInfo({ id, name, description, settings, imageurl, genre, choose, userSettings: us }) {
    const [Dialog, isOpen, openClose] = useDialog()
    const [userSettings, setUserSettings] = useState(us || null)

    const handleChoose = () => {
        openClose()
        choose()
        return;
    }
    const goToSettings = openClose


    return (
        <article className='unmargin' >

            <img src={`${BASE_URL}/assets/${imageurl}`} alt="game" />

            <div className='flex sb'>
                <h4 className='unmargin'>{name}</h4>
                <span > קטגוריה: {genre}</span>
            </div>
            <p className='unmargin'> {description} </p>

            <br />
            {isOpen &&
                <Dialog title={'הגדרת משחק ' + name} open={isOpen} close={openClose}  >
                    <GameSettings settings={settings} userSettings={userSettings} setUserSettings={setUserSettings} choose={handleChoose} />
                </Dialog>
            }

            <button className='secondary' onClick={goToSettings}> {!userSettings ? 'הגדרה' : 'הגדר מחדש'} </button>
            {userSettings && <button onClick={choose}> {'בחירה'} </button>}
        </article>
    )
}

export default GameInfo