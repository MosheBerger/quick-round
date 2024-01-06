import React, { useCallback, useMemo, useState } from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import SetRound from './GameSelector/SetRound'

const INITIAL_STATE = { roomName: '', players: 1, rounds: 1 }

function CreateRoom() {
    const [inputs, setInput] = useInputs(INITIAL_STATE)
    const [games, setGames] = useState([])
    const { roomName, rounds } = inputs

    const chooseGame = useCallback((game, index) => {
        setGames(prev => {
            const arr = [...prev]
            arr[index - 1] = game
            return arr
        })
    }, [setGames])


    const handleSubmit = (e) => {
        e.preventDefault()
        //todo
    }

    console.log('roundsarr', games);
    console.log('length', games.length);

    console.log('full =>', checkFullList(games,rounds));

    const setRounds = useMemo(() => {

        const setters = []
        for (let i = 1; i <= rounds; i++) {
            setters.push(<SetRound key={i} index={i} game={games[i - 1]} choose={chooseGame} />)
        }
        return setters
    }, [rounds, games, chooseGame])

    return (
        <article>
            <h4> יצירת חדר </h4>

            <section>
                <Input insertTo={'roomName'} name={'שם החדר'} setInput={setInput} value={roomName} />
            </section>
            <hr />

            {/* <section>
                <h6> שחקנים </h6>
                <Input min={1} max={8} insertTo={'players'} type={'range'} name={'מספר שחקנים'} setInput={setInput} value={players} />
                <div>{players}</div>
            </section>
            <hr /> */}

            {/* <section className='unmargin'>
                <h6> סבבי משחק </h6>
                <Input min={1} max={20} insertTo={'rounds'} type={'range'} name={'מספר סבבים'} setInput={setInput} value={rounds} />
                <div>{rounds}</div>
            </section>
            <hr /> */}


            <div>
                {setRounds}
            </div>

            <button type='submit' onSubmit={handleSubmit}> פתיחת חדר </button>

        </article>
    )
}

export default CreateRoom

function checkFullList(list = [], lengthRequired) {
    if (list.length < lengthRequired) return false

    for (let i = 0; i < lengthRequired; i++) {
        if (list[i] === undefined) return false
    }
    return true
}