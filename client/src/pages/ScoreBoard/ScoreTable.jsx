import React from 'react'
import Avatar from '../../components/avatar/Avatar'
import GameCard from '../../components/GameCard'
import TimingCard from './TimingCard'

function ScoreTable({ room, title }) {

    const { players, finishTimes } = room

    const scores = []
    for (const player of players) {

        const time = finishTimes.reduce((prev, time,i) => {
            if (i===0) return time
            if (
                time.user_id === player.id &&
                Number(time.finish_time) <= Number(prev.finish_time)
            ) {
                return time
            }
            return prev
        },
            finishTimes.find((t) => t.user_id = player.id)
        )
        time.player = player
        scores.push(time)
    }
    scores.sort((a, b) => a.finish_time - b.finish_time)


    console.log('🚀 -> ScoreTable -> scores:', scores)
    return (<>
        <h3 className='unmargin'> {title} </h3>
        <article className='unmargin'>
            <figure className='unmargin'>
                <table className='unmargin'>
                    <thead>
                        <tr>
                            <th scope='col'> שחקן </th>
                            <th scope='col'> שם </th>
                            <th scope='col'> זמן סיום חדר  </th>
                        </tr>
                    </thead>
                    <tbody>

                        {scores.map((score, i) => {
                            console.log(score);
                            const { player: p, id } = score

                            return <tr key={id}>
                                <td>
                                    <Avatar avatarSeed={p.avatar} />
                                </td>
                                <td> {p.name || 'null'} </td>
                                <td>{(score.finish_time / 1000).toFixed(2) + ' שניות'}</td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        { }

                    </tfoot>
                </table>
            </figure>
        </article >

    </>)
}

export default ScoreTable