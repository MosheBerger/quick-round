import React from 'react'
import GameSelector from './GameSelector'
import useDialog from '../../../hooks/useDialog'
import GameCard from './GameCard'
import PicoButton from '../../../components/PicoButton.jsx'

function SetRound({ index, game, choose }) {

    const [Dialog, isOpen, openClose] = useDialog()

    return (
        <section >
            <h4 className='unmargin'> {'סבב' + index} </h4>

            {game?.id ?
                <>
                    <GameCard {...game} />
                    <PicoButton className='outline' > הוסף סבב </PicoButton>
                    <PicoButton className='outline' > החלף משחק </PicoButton>
                    <PicoButton className='outline' > הסר </PicoButton>
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