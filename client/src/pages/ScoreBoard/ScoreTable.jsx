import React from 'react'
import Avatar from '../../components/avatar/Avatar'
import GameCard from '../../components/GameCard'
import TimingCard from './TimingCard'

function ScoreTable({ room, tableKey, title }) {
    return (<>
        <h3 className='unmargin'> {title} </h3>
        <article className='unmargin'>
            <figure className='unmargin'>
                <table className='unmargin'>
                    <thead>
                        <tr>
                            <th scope='col'> </th>
                            <th scope='col'> משחק </th>

                            {room.players.map(p => (
                                <th key={p.id} scope='col'>
                                    <div className='flex col'>
                                        <Avatar avatarSeed={p.avatar} />
                                        {p.username || 'null'}
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
                    <tfoot>
                        {room[tableKey].reduce((p, v) => {
                            console.log(v[0]);
                            if (!v[0]) return p
                            if (v[0].success) {
                                return p + v[0].finish_time
                            } else {
                                return p + 20000
                            }
                        })
                        }

                    </tfoot>
                </table>
            </figure>
        </article>

    </>)
}

export default ScoreTable