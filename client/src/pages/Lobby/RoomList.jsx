import React, { useState } from 'react'

const rooms = [
    { id: '8629177', name: `Minerva's room`, settings: { playersNum: 6, roundsNum: 5 }, status: 'waiting' },
    { id: '5526980', name: `Lora's room`, settings: { playersNum: 2, roundsNum: 5 }, status: 'waiting' },
    { id: '3200907', name: `Gussie's room`, settings: { playersNum: 7, roundsNum: 13 }, status: 'waiting' },
    { id: '618777', name: `Laura's room`, settings: { playersNum: 2, roundsNum: 7 }, status: 'waiting' },

]

function RoomList() {

    const [roomList, setRoomsList] = useState(rooms)

    return (<>
        <article>
            <h4>RoomList</h4>

            <div>
                tabs
            </div>

            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>players</th>
                        <th>round</th>
                        <th>status</th>
                        <th>join</th>
                    </tr>
                </thead>

                <tbody>
                    {roomList.map((room) => {
                        const { id, name, status, settings: { playersNum, roundsNum } } = room;

                        return (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{playersNum}</td>
                                <td>{roundsNum}</td>
                                <td>{status}</td>
                                <td>
                                    <button onClick={() => /* todo */ console.log(`you are joined room ${id}`)}>
                                        {status !== 'playing' && 'join'}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </article>
    </>)
}

export default RoomList