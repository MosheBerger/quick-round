import React from 'react'
import Avatar from '../../components/avatar/Avatar'
import GameCard from '../../components/GameCard'
import TimingCard from './TimingCard'

function ScoreTable({ room, tableKey, title }) {
    return (<>
        <h3 className='unmargin'> {title} </h3>
        <article className='unmargin'>
            <table>
                <thead>
                    <tr>
                        <th> מספר סבב </th>
                        <th> משחק </th>
                        {room.players.map(p => <th>
                            <div className='flex col'>
                                <Avatar avatarSeed={p.avatar} />
                                {p.username}
                            </div>
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {room[tableKey].map((row, i) => {
                        const { round_num: num, game_id } = room.rounds[i]
                        return <>
                            <tr>
                                <th>סבב {num}</th>
                                <th>{<GameCard id={game_id} style={{ maxWidth: 150 }} />}</th>
                                {row.map((result) => <td> <TimingCard result={result}/> </td>)}
                            </tr>
                        </>
                    })}
                </tbody>
            </table>
        </article>

    </>)
}

export default ScoreTable