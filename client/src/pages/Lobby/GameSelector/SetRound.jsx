import React from 'react'
import GameSelector from './GameSelector'
import useDialog from '../../../hooks/useDialog'
import GameCard from '../../../components/GameCard'
import PicoButton from '../../../components/PicoButton.jsx'

function SetRound({ index, game, choose, add, remove, cantRemove }) {

    const [Dialog, isOpen, openClose] = useDialog()

    return (
        <div className='roundSetter'>
            <h6 className='unmargin'> {'סבב ' + (index + 1)} </h6>

            {game?.id ?
                <>
                    <GameCard {...game} />
                    <PicoButton onClick={openClose} className='outline' > החלף משחק </PicoButton>
                    <PicoButton disabled={cantRemove} onClick={remove} className='outline' > הסר </PicoButton>
                    <PicoButton onClick={add} style={{ marginTop: '30px' }} className='secondary outline' > הוסף סבב אחרי סבב זה </PicoButton>
                </>
                : <div className='flex st'>
                    <PicoButton onClick={openClose} className='secondary'> {'בחר משחק לסבב זה'}</PicoButton>
                    <PicoButton disabled={cantRemove} onClick={remove} className='outline' > הסר </PicoButton>
                </div>

            }


            {openClose &&

                <Dialog title={'בחירת משחק לסבב ' + index} open={isOpen} close={openClose} >
                    <GameSelector chosenGame={game} choose={choose} index={index} close={openClose} />
                </Dialog>
            }

            <hr />
        </div>
    )
}

export default SetRound