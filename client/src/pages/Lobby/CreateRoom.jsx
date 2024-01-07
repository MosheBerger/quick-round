import React, { useState } from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import SetRound from './GameSelector/SetRound'
import BASE_URL from '../../BASE URL'

const INITIAL_STATE = { roomName: '', rounds: 1 }

function CreateRoom({ user }) {
    const [rounds, setGameInRound] = useState([{}])



    const [inputs, setInput] = useInputs(INITIAL_STATE)
    const { roomName } = inputs

    const chooseGame = (game, index) => {

        setGameInRound(prev => {
            const arr = [...prev]
            arr[index] = game
            return arr
        })
    }

    const addRounds = (index) => {

        setGameInRound(prev => {
            const arr = [...prev]
            arr.splice(index + 1, 0, {})
            return arr
        })
    }

    const removeRounds = (index) => {

        if (rounds.length <= 1) {
            alert('אם תמחק אותי מה יישאר?')
            return
        }

        setGameInRound(prev => {
            const arr = [...prev]
            arr.splice(index, 1)
            return arr
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        const roundsData = rounds.map((r, i) => {
            return {
                roundNum: (i + 1),
                gameId: r.id,
                settings: r.userSettings
            }
        })

        const room = {
            name: roomName,
            numOfRounds: rounds.length,
            manager: user.id,
            rounds: roundsData
        }

        console.log(room);
        try {
            const res = await fetch(`${BASE_URL}/api/rooms`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(room),
                }
            )
            const data = await res.json()
            console.log(data);

        } catch (error) {
            console.log('error', error);
        }
    }

    const canCreate = (rounds.every(g => g.id) && roomName)

    return (
        <article>
            <h4> יצירת חדר </h4>

            <section>
                <Input insertTo={'roomName'} name={'שם החדר'} setInput={setInput} value={roomName} />
            </section>
            <hr />

            <h5> הגדרת סבבים ומשחקים </h5>

            {rounds.map((game, i) => {
                return < SetRound
                    key={i} index={i}
                    game={game}
                    choose={chooseGame}
                    cantRemove={rounds.length <= 1}
                    add={() => addRounds(i)} remove={() => removeRounds(i)}
                />
            })}

            <br />
            <button type='submit' disabled={!canCreate} onClick={handleSubmit}> פתיחת חדר </button>

        </article>
    )
}

export default CreateRoom
