import React from 'react'
import Avatar from '../../components/avatar/Avatar'
import GameCard from '../../components/GameCard'
import TimingCard from './TimingCard'

function ScoreTable({ room, tableKey, title }) {
    return (<>
        <h3 className='unmargin'> {title} </h3>
        <article className='unmargin'>
            <figure>
                <table >
                    <thead>
                        <tr>
                            <th scope='col'> מספר סבב </th>
                            <th scope='col'> משחק </th>

                            {room.players.map(p => (
                                <th key={p.id} scope='col'>
                                    <div className='flex col'>
                                        <Avatar avatarSeed={p.avatar} />
                                        {p.username}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {room[tableKey].map((row, i) => {

                            const { round_num: num, game_id, id } = room.rounds[i]

                            return <tr key={id}>
                                <th scope='row'>{num}</th>
                                <th>{<GameCard id={game_id} style={{ maxWidth: 150 }} />}</th>
                                {row.map((result, i) => <td key={i}> <TimingCard result={result} /> </td>)}
                            </tr>
                        })}
                    </tbody>
                </table>
            </figure>
        </article>

    </>)
}

export default ScoreTable