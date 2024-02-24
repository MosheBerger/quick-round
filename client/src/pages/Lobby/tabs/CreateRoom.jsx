import React, { useState } from 'react'
import useInputs from '../../../hooks/useInputs'
import Input from '../../../components/forms/Input'
import SetRound from '../GameSelector/SetRound'
import BASE_URL from '../../../BASEURL'
import { useNavigate } from 'react-router-dom'
import checkError from '../../../utils/checkError'
import userStorage from '../../../hooks/userStorage'

const INITIAL_STATE = { roomName: '', rounds: 1 }

function CreateRoom({ user, ...rest }) {
    const [rounds, setGameInRound] = useState([{}])
    const [loading, setLoading] = useState(false)
    console.log('create',user);
    
    const navigate = useNavigate()

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

        console.log('send', room);
        try {
            setLoading(true)
            const res = await fetch(`${BASE_URL}/api/rooms`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "authorization":userStorage.getToken()
                    },
                    body: JSON.stringify(room),
                }
            )
            const data = await res.json()
            console.log('get', data);
            checkError(data)

            setGameInRound([{}])
            setInput(INITIAL_STATE)
            alert('החדר נוצר בהצלחה')
            setTimeout(() => navigate('#join'),1500)
            


        } catch (error) {
            console.log('error', error);

        } finally {
            setLoading(false)
        }
    }

    const canCreate = (rounds.every(g => g.id) && roomName)

    return (
        <article className='unmargin' {...rest}>
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
            <button type='submit' aria-busy={loading} disabled={!canCreate || loading} onClick={handleSubmit}>
                {loading ? 'פותח' : 'פתיחת חדר'}
            </button>

        </article>
    )
}

export default CreateRoom
