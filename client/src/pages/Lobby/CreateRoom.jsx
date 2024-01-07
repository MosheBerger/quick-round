import React, { useCallback, useMemo, useState } from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import SetRound from './GameSelector/SetRound'

const INITIAL_STATE = { roomName: '', players: 1, rounds: 1 } //todo remove players from rooms table

function CreateRoom() {
    const [games, setGames] = useState([{}])

    const [inputs, setInput] = useInputs(INITIAL_STATE)
    const { roomName } = inputs

    const chooseGame = (game, index) => {
        setGames(prev => {
            const arr = [...prev]
            arr[index] = game
            return arr
        })
    }

    const addRounds = (index) => {
        setGames(prev => {
            const arr = [...prev]
            arr.splice(index + 1, 0, {})
            return arr
        })
    }
    const removeRounds = (index) => {
        if (games.length <= 1) {
            alert('אם תמחק אותי מה ישאר?')
            return
        }

        setGames(prev => {
            const arr = [...prev]
            arr.splice(index, 1)
            return arr
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        //todo
    }

    // console.log('full =>', checkFullList(games,rounds));

    return (
        <article>
            <h4> יצירת חדר </h4>

            <section>
                <Input insertTo={'roomName'} name={'שם החדר'} setInput={setInput} value={roomName} />
            </section>
            <hr />

            {games.map((game, i) => {
                return < SetRound
                    key={i} index={i}
                    game={game}
                    choose={chooseGame}
                    cantRemove={games.length <= 1}
                    add={() => addRounds(i)} remove={() => removeRounds(i)}
                />
            })}

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