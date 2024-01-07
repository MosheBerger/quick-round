import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../BASE URL'
import GameSettings from './GameSettings'
import useDialog from '../../../hooks/useDialog'




function GameInfo({ game, choose, chosenGame }) {
    const { name, description, settings, imageurl, genre } = game

    const [Dialog, isOpen, openClose] = useDialog()
    const [lastSettings, setLastSettings] = useState(chosenGame?.userSettings || null)

    const handleChoose = (userSettings) => {
        game.userSettings = userSettings
        openClose()
        choose(game)
        return;
    }
    const goToSettings = openClose

    useEffect(() => {
        if (chosenGame){
            setLastSettings(prev => chosenGame?.userSettings||prev)
            
        }else{
            setLastSettings(prev => null)
        }
    },[chosenGame])

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
                    <GameSettings settings={settings} userSettings={lastSettings} setUserSettings={setLastSettings} choose={handleChoose} />
                </Dialog>
            }

            <button className='secondary' onClick={goToSettings}> {!lastSettings ? 'הגדרה' : 'הגדר מחדש'} </button>
            {lastSettings && <button onClick={choose}> {'בחירה'} </button>}
        </article>
    )
}

export default GameInfo