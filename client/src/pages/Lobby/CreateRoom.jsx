import React from 'react'
import useInputs from '../../hooks/useInputs'
import Input from '../../components/forms/Input'
import GameSelector from './GameSelector'

const INITIAL_STATE = { roomName: '', players: 0, rounds: 0, games: [] }

function CreateRoom() {
    const [inputs, setInput] = useInputs(INITIAL_STATE)
    const { roomName, players, rounds, games } = inputs

    const handleSubmit = (e) => {
        e.preventDefault()
        //todo
    }
    return (
        <article>
            <h4>Create Room</h4>

            <section>
                <Input insertTo={'roomName'} name={'room name'} setInput={setInput} value={roomName} />
            </section>

            <section>
                <h6>players</h6>
                <Input min={1} max={8} insertTo={'players'} type={'range'} name={'how many players?'} setInput={setInput} value={players} />
                <div>{players}</div>
            </section>

            <section>
            <h6>rounds</h6>
                <Input min={1} max={20} insertTo={'rounds'} type={'range'} name={'how many rounds?'} setInput={setInput} value={rounds} />
                <div>{rounds}</div>
            </section>

            <section>
                <GameSelector amount={rounds} games={games} setInput={setInput}/>
            </section>

            <button type='submit' onSubmit={handleSubmit}>open room</button>

        </article>
    )
}

export default CreateRoom