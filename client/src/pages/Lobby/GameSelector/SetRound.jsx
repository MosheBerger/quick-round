import React from 'react'
import GameSelector from './GameSelector'
import useDialog from '../../../hooks/useDialog'
import GameCard from './GameCard'
import PicoButton from '../../../components/PicoButton.jsx'

function SetRound({ index, game, choose, add, remove, cantRemove }) {

    const [Dialog, isOpen, openClose] = useDialog()

    return (
        <section >
            <h4 className='unmargin'> {'סבב ' + (index + 1)} </h4>

            {game?.id ?
                <>
                    <GameCard {...game} />
                    <PicoButton onClick={add} > הוסף סבב </PicoButton>
                    <PicoButton onClick={openClose} className='outline' > החלף משחק </PicoButton>
                    <PicoButton disabled={cantRemove} onClick={remove} className='outline' > הסר </PicoButton>
                </>
                :
                <button onClick={openClose} className='secondary'> {'בחר משחק לסבב זה'}</button>
            }
            {openClose &&

                <Dialog title={'בחירת משחק לסבב ' + index} open={isOpen} close={openClose} >
                    <GameSelector choose={choose} index={index} userSettings={game?.settings} close={openClose} />
                </Dialog>
            }

            <hr />
        </section>
    )
}

export default SetRound