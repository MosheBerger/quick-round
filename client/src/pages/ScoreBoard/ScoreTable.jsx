import React from 'react'
import Avatar from '../../components/avatar/Avatar'
import GameCard from '../../components/GameCard'
import TimingCard from './TimingCard'

function ScoreTable({ room, tableKey, title }) {

    console.table('table', room[tableKey]);

    // const a = room[tableKey].reduce((p, v) => {
    //     if (!v[0]) return 0
    //     if (v[0].success) {
    //         return p[0].finish_time + v[0].finish_time
    //     } else {
    //         return p[0].finish_time + 30000
    //     }
    // }) /1000
    

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
                                        {p.name || 'null'}
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
                        {}

                    </tfoot>
                </table>
            </figure>
        </article>

    </>)
}

export default ScoreTable