import React, { useState } from 'react'
import GameSelector from './GameSelector'
import useDialog from '../../../hooks/useDialog'
import GameCard from './GameCard'
import BASE_URL from '../../../BASE URL'

function SetRound({ index, game, choose }) {

    // const [game, setGame] = useState({ id: 1, name:'טריוויה',imageurl:BASE_URL+'/assets/covers/trivia.png' })


    const [Dialog, isOpen, openClose] = useDialog()

    return (
        <section >
            <h4 className='unmargin'> {'סבב' + index} </h4>

            {game?.id ?
                <>
                    <GameCard {...game} />
                    <button onClick={openClose} className='secondary outline'> {'החלף משחק'}</button>
                </>
                :
                <button onClick={openClose} className='secondary'> {'בחר משחק'}</button>
            }

            <Dialog title={'בחירת משחק לסבב ' + index} open={isOpen} close={openClose} >
                <GameSelector choose={choose} index={index} close={openClose} />
            </Dialog>
            
            <hr />
        </section>
    )
}

export default SetRound